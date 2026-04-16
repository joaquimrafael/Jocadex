import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/config/queryClient';
import { Layout } from '@/presentation/components/layout/Layout';
import { HomePage } from '@/presentation/pages/HomePage';
import { PokemonDetailPage } from '@/presentation/pages/PokemonDetailPage';
import { NotFoundPage } from '@/presentation/pages/NotFoundPage';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/:nameOrId" element={<PokemonDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
