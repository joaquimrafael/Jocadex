# Plano de Execução — Review Opus 4.7

Cinco melhorias identificadas em review do projeto. Ordem sugerida: bugs fáceis (1, 2), performance (3), paginação (4), ramificação de evoluções (5 — maior).

Executar uma task por vez, rodando `npm run lint && npm run test:run` ao final de cada.

---

## Task 1 — Limpar condição redundante em `PokemonDetailPage`

**Arquivo:** `src/presentation/pages/PokemonDetailPage.tsx:48-51`

Substituir:

```ts
const is404 = isError && error instanceof ApiError && error.status === 404;
if (is404 || (isError && !pokemon)) {
```

Por:

```ts
if (isError && !pokemon) {
```

Remover a variável `is404` (não é usada em nenhum outro lugar). Remover o import de `ApiError` se ficar sem uso. O texto "Pokémon not found" é genérico o bastante pra cobrir qualquer erro terminal.

**Validação:** `src/presentation/pages/__tests__/PokemonDetailPage.test.tsx` deve continuar passando.

---

## Task 2 — Retry sem reload da página

**Arquivo:** `src/presentation/hooks/usePokemonList.ts`

Adicionar `refetch: query.refetch` ao objeto retornado.

**Arquivo:** `src/presentation/pages/HomePage.tsx`

1. Destructurar `refetch` de `usePokemonList()`.
2. Trocar `onRetry={() => window.location.reload()}` por `onRetry={() => refetch()}`.

**Validação manual:** forçar erro (desligar rede no devtools), clicar Retry, confirmar que a URL (`?search=` ou `?type=`) não é perdida.

---

## Task 3 — Paralelizar `usePokemonDetail`

**Arquivo:** `src/presentation/hooks/usePokemonDetail.ts:17-21`

Trocar:

```ts
enabled: detailQuery.isSuccess,
```

Por:

```ts
enabled: Boolean(nameOrId),
```

Isso dispara detail e species em paralelo. Em caso de 404 no detail, species também 404 — tudo bem, `isError` já lida com isso e o `mapToPokemonDetail` não é chamado porque `detailQuery.data` fica `undefined`.

**Validação:** rodar a suite. Verificar na aba Network que as duas requests saem juntas.

---

## Task 4 — Paginação client-side no filtro de tipo

**Arquivo:** `src/presentation/pages/HomePage.tsx`

1. Importar `useState` e `useEffect`.
2. Adicionar no topo do componente:

   ```ts
   const TYPE_PAGE_SIZE = 20;
   const [typeVisibleCount, setTypeVisibleCount] = useState(TYPE_PAGE_SIZE);

   useEffect(() => {
     setTypeVisibleCount(TYPE_PAGE_SIZE);
   }, [selectedTypes.join(',')]);
   ```

3. Quando `selectedTypes.length > 0`:
   - `const fullTypeList = typePokemonList ?? [];`
   - `displayList = fullTypeList.slice(0, typeVisibleCount);`
   - Guardar `totalTypeCount = fullTypeList.length` pro countLabel.

4. Ajustar `countLabel` no modo tipo: `` `${displayList.length} of ${totalTypeCount} Pokémon` ``.

5. Unificar o `LoadMoreButton`: renderizar em ambos os modos, removendo a condição `selectedTypes.length === 0 &&`. No modo tipo, passar:

   ```tsx
   <LoadMoreButton
     onClick={() => setTypeVisibleCount((c) => c + TYPE_PAGE_SIZE)}
     isLoading={false}
     hasMore={typeVisibleCount < totalTypeCount}
   />
   ```

**Validação:** adicionar 1-2 casos em `HomePage.test.tsx` cobrindo "filtra por water, mostra 20 iniciais, clica load more, mostra 40".

---

## Task 5 — Cadeia de evolução com ramificações

Maior refactor. Muda tipo, mapper, hook e componente.

### 5.1 — Domain

**Arquivo:** `src/domain/types/pokemon.types.ts`

Substituir `EvolutionStage` por:

```ts
export interface EvolutionNode {
  id: number;
  name: string;
  imageUrl: string;
  minLevel: number | null;
  trigger: string;
  evolvesTo: EvolutionNode[];
}
```

### 5.2 — Mapper

**Arquivo:** `src/data/mappers/pokemonMapper.ts`

Substituir `mapToEvolutionStages` por:

```ts
export function mapToEvolutionTree(
  link: EvolutionLink,
  isFirst = true,
): EvolutionNode {
  const id = extractIdFromUrl(link.species.url);
  const detail = link.evolution_details[0];
  return {
    id,
    name: link.species.name,
    imageUrl: getPokemonImageUrl(id),
    minLevel: detail?.min_level ?? null,
    trigger: detail?.trigger.name ?? (isFirst ? 'none' : 'level-up'),
    evolvesTo: link.evolves_to.map((next) => mapToEvolutionTree(next, false)),
  };
}
```

Remover `mapToEvolutionStages` e os imports que ficarem órfãos.

### 5.3 — Hook

**Arquivo:** `src/presentation/hooks/useEvolutionChain.ts`

Retornar `tree: EvolutionNode | null` em vez de `stages`:

```ts
const tree: EvolutionNode | null = query.data
  ? mapToEvolutionTree(query.data.chain)
  : null;

return { tree, isLoading: query.isLoading, isError: query.isError };
```

### 5.4 — Componente

**Arquivo:** `src/presentation/components/pokemon/PokemonEvolutionChain.tsx`

Renderizar recursivamente. Quando um nó tem múltiplos `evolvesTo`, empilhar os filhos em coluna com suas próprias setas.

```tsx
function EvolutionNodeView({
  node,
  showArrow,
}: {
  node: EvolutionNode;
  showArrow: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {showArrow && (
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-lg">→</span>
          {node.minLevel && (
            <span className="text-xs">Lv. {node.minLevel}</span>
          )}
        </div>
      )}
      <Link
        to={`/pokemon/${node.name}`}
        className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity"
        aria-label={`View ${capitalize(node.name)}`}
      >
        <img
          src={node.imageUrl}
          alt={capitalize(node.name)}
          loading="lazy"
          className="w-16 h-16 object-contain"
        />
        <span className="text-xs font-medium text-gray-700 capitalize">
          {node.name}
        </span>
      </Link>
      {node.evolvesTo.length > 0 && (
        <div className="flex flex-col gap-3">
          {node.evolvesTo.map((child) => (
            <EvolutionNodeView key={child.id} node={child} showArrow />
          ))}
        </div>
      )}
    </div>
  );
}
```

Componente raiz: `<EvolutionNodeView node={tree} showArrow={false} />`.

### 5.5 — Testes

- Atualizar `src/data/mappers/__tests__/pokemonMapper.test.ts` pra validar a árvore em vez do array flat.
- Adicionar um mock de cadeia ramificada (Eevee ou similar com pelo menos 2 entradas em `evolves_to`) em `src/test/mocks/data/evolutionChain.mock.ts`, e um caso de teste cobrindo.

**Validação manual:** abrir `/pokemon/eevee` no browser e conferir que os 3+ evolutions aparecem empilhados, não numa linha só.

---

## Checklist final

Depois de cada task:

- `npm run lint`
- `npm run test:run`
- `npm run build`

Depois de tudo, teste manual no browser (`npm run dev`):

- Home: busca, filtro por tipo, paginação.
- Filtro "water": confirmar que mostra 20 inicialmente e load more funciona.
- Detalhe de Bulbasaur (evolução linear): funciona como antes.
- Detalhe de Eevee (evolução ramificada): mostra todas as eeveelutions empilhadas.
- Simular erro: retry preserva search params.
