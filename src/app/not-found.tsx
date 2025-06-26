'use client';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Página no encontrada
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>

      <a
        href="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Volver al inicio
      </a>
    </div>
  );
}
