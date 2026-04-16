export function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-400">
        Data provided by{' '}
        <a
          href="https://pokeapi.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-400 hover:text-red-500 transition-colors"
        >
          PokéAPI
        </a>
        . Jocadex is not affiliated with Nintendo or The Pokémon Company.
      </div>
    </footer>
  );
}
