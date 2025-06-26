'use client';

import { Header } from './lib/components/layout/Header';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>PokeSight</title>
        <meta name="description" content="Explora todos los Pokémon de la primera generación" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
