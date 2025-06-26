# Pokémon Explorer

Este proyecto es una aplicación web construida con **Next.js**, **React** y **TypeScript**, diseñada para explorar los 151 Pokémon de la primera generación. A continuación encontrarás:

* 📋 **Descripción general**
* ✅ **Requisitos técnicos** cumplidos
* 🚀 **Características adicionales** implementadas
* 🗂️ **Estructura de archivos**
* 🧪 **Pruebas unitarias**
* ⚙️ **Cómo ejecutar el proyecto**

---

## 📋 Descripción general

* Consume la **PokéAPI** para obtener la lista de Pokémon y sus detalles.
* Permite alternar entre dos vistas:

  1. **Cuadrícula (Grid)** responsive con tarjetas.
  2. **Tabla** interactiva usando **MUI DataGrid**.
* Al hacer clic en un Pokémon, muestra un **modal** con información detallada.

## ✅ Requisitos técnicos cumplidos

1. **Framework**: React con Next.js (SSR/CSR) y TypeScript.
2. **Vistas**:

   * **Grid**: CSS Grid + tarjetas.
   * **Table**: MUI `DataGrid` con:

     * Columnas: imagen, nombre, tipo(s), peso, altura, exp. base, estadísticas, botón "Details".
     * Filtrado local por tipo.
     * Ordenamiento local.
     * Paginación local (10–50 filas por página).
3. **Modal** de detalle con ID, nombre, imagen, tipos, altura, peso y todas las estadísticas.
4. **Cliente**: manejo de estado con **Zustand**.
5. **Persistencia**: favoritos guardados en **localStorage**.
6. **Infinite scroll** en la vista Grid.
7. **Cache**: uso de `useMemo` en hooks de filtrado.

## 🚀 Características adicionales

* 🌗 **Dark mode** con toggle y `data-theme` CSS.
* 🚀 **Infinite scroll** en la sección Grid.
* ❤️ **Marcar favoritos**:

  * Corazón en tarjetas y modal.
  * Filtro "View Favorites".

* 📚 **Hooks personalizados**:

  * `useFilteredPokemons` (filtrado + favoritos).
  * `useInfiniteScroll` (IntersectionObserver).
* 📦 **Estados globales** con **Zustand**.
* 🧪 **Pruebas unitarias** con **Jest** y documentación con BDD:

  * `fetchPokemonList`.
  * `useFavoritesStore` .
  * `useFilteredPokemons`.

## 🗂️ Estructura de archivos

```
src/
├─ app/
│  ├─ layout.tsx           # RootLayout con Header
│  ├─ page.tsx             # SSR fetch + PokeClientView
│  ├─ stores/
│  │  ├─ viewMode.ts       # Vista global (grid/table)
│  │  └─ favorites.ts      # Zustand store + persist
│  ├─ lib/
│  │  ├─ components/
│  │  │  ├─ Header.tsx
│  │  │  ├─ PokeGrid.tsx
│  │  │  ├─ PokeTable.tsx
│  │  │  ├─ PokeCard.tsx
│  │  │  └─ PokemonDetailModal.tsx
│  │  ├─ services/
│  │  │  └─ fetchPokemonList.ts
│  │  ├─ hooks/
│  │  │  ├─ useFilteredPokemons.ts
│  │  │  └─ useInfiniteScroll.ts
│  │  └─ types/
│  │     └─ typesPokemonDetails.ts
│  └─ globals.css
└─ jest.config.cjs

__tests__/
├─ fetchPokemonList.test.ts
├─ favoritesStore.test.ts
├─ useFilteredPokemons.test.ts
```

## 🧪 Pruebas unitarias

Ejecuta:

```bash
npm test
```

Incluyen:

* **fetchPokemonList**: transforma correctamente la respuesta de la API.
* **useFavoritesStore**: BDD-style para toggle, consulta y persistencia en localStorage.
* **useFilteredPokemons**: filtra por nombre y favoritos.

## ⚙️ Cómo ejecutar

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Levanta en modo desarrollo:
```bash
npm run dev
````

3. Abre `http://localhost:3000`

Desarrollado por Jhon Rivero.
