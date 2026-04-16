import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <p className="text-7xl">404</p>
      <h1 className="text-2xl font-bold text-gray-700">Page not found</h1>
      <p className="text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
      >
        Go Home
      </Link>
    </div>
  );
}
