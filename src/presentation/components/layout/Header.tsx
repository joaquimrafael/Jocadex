import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-red-600 shadow-md">
      <div className="container mx-auto px-4 h-14 flex items-center justify-center">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-white hover:text-red-100 transition-colors"
          aria-label="Jocadex home"
        >
          <img src="/pokeball.svg" alt="Pokeball" className="w-7 h-7" />
          <span>Jocadex</span>
        </Link>
      </div>
    </header>
  );
}
