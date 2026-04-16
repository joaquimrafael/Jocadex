import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-gray-800 hover:text-red-500 transition-colors"
          aria-label="Jocadex home"
        >
          <span className="text-2xl" role="img" aria-label="Pokeball">
            🔴
          </span>
          <span>Jocadex</span>
        </Link>
      </div>
    </header>
  );
}
