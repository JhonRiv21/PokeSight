# PokeSight  
**Page →** [https://poke-sight.vercel.app/](https://poke-sight.vercel.app/)

This project is a web application built with **Next.js**, **React**, and **TypeScript**, designed to explore the 151 first-generation Pokémon. It includes:

* 📋 **Overview**
* ✅ **Technical requirements** fulfilled
* 🚀 **Additional features** implemented
* 🗂️ **File structure**
* 🧪 **Unit tests**
* ⚙️ **How to run the project**

---

## 📋 Overview

* Fetches data from the **PokéAPI** to list and display Pokémon details.
* Supports switching between two views:

  1. A **responsive grid** view with cards.
  2. An **interactive table** using **MUI DataGrid**.
* Clicking a Pokémon opens a **modal** with detailed information.

## ✅ Technical requirements fulfilled

1. **Framework**: React with Next.js (SSR/CSR) and TypeScript.
2. **Views**:
   * **Grid**: CSS Grid + card components.
   * **Table**: MUI `DataGrid` with:
     * Columns: image, name, type(s), weight, height, base exp, stats, "Details" button.
     * Filtering by type using MUI table component.
     * Sorting via MUI table features.
     * Local pagination (10–50 rows per page).
3. **Detail modal** with ID, name, image, types, height, weight, and all stats.
4. **Client-side state** managed with **Zustand**.
5. **Persistence**: favorites stored in **localStorage**.
6. **Infinite scroll** on Grid view.
7. **Caching** with `useMemo` in filtering hooks.

## 🚀 Additional features

* 🌗 **Dark mode** toggle using `data-theme` and CSS variables.
* 🚀 **Infinite scroll** on the Grid view.
* ❤️ **Favorites system**:
  * Heart icon in cards and modal.
  * "View Favorites" filter toggle.
* 📚 **Custom hooks**:
  * `useFilteredPokemons` (filtering + favorites).
  * `useInfiniteScroll` (IntersectionObserver).
* 📦 **Global state** with **Zustand**.
* 🧪 **Unit tests** with **Jest** and BDD-style specs:
  * `fetchPokemonList`
  * `useFavoritesStore`
  * `useFilteredPokemons`

## 🛠️ Tech Stack

- **Framework:** Next.js 15.3.4 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS variables
- **UI Components:** MUI (DataGrid)
- **State Management:** Zustand
- **Testing:** Jest
- **API:** PokéAPI (REST)

## 🖼️ Screenshots

| Grid View | Table View |
|-----------|------------|
| ![Grid](https://github.com/user-attachments/assets/bbe8d30c-a27d-479a-b0de-e9941810e504) | ![Table](https://github.com/user-attachments/assets/312601bf-2b18-4dbc-a0fc-3911597bb2f1) |

| Detail Modal |
|--------------|
| ![Modal](https://github.com/user-attachments/assets/16f2ebc9-4136-4815-929e-d7061cbe6193) |

## 🚀 Performance & Accessibility

This project achieves **100%** scores across all key Lighthouse categories:

- ✅ **Performance**: 99%
- ✅ **Accessibility**: 100%
- ✅ **Best Practices**: 100%
- ✅ **SEO**: 100%

![Unlighthouse Report showing 100% in all categories](https://github.com/user-attachments/assets/54b80fd2-d8a7-4b6e-a50b-a574f81d4b7f)

The app is optimized for fast load times, accessibility compliance, modern web standards, and strong SEO practices.

## 🗂️ **File structure**

```
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ stores/
│  │  ├─ viewMode.ts
│  │  └─ favorites.ts
│  ├─ lib/
│  │  ├─ components/
│  │  │  ├─ layout/
│  │  │  │  ├─ Header.tsx
│  │  │  │  └─ HeaderControls.tsx
│  │  │  ├─ pokemon/
│  │  │  │  ├─ cards/
│  │  │  │  │  └─ PokeCard.tsx
│  │  │  │  ├─ grid/
│  │  │  │  │  └─ PokeGrid.tsx
│  │  │  │  ├─ modal/
│  │  │  │  │  └─ PokeDetailModal.tsx
│  │  │  │  ├─ table/
│  │  │  │  │  ├─ columns.tsx
│  │  │  │  │  └─ PokeTable.tsx
│  │  │  │  └─ views/
│  │  │  │     └─ PokeClientView.tsx
│  │  ├─ services/
│  │  │  └─ fetchPokemonList.ts
│  │  ├─ hooks/
│  │  │  ├─ useFilteredPokemons.ts
│  │  │  └─ useHasHydrated.ts
│  │  │  └─ useInfiniteScroll.ts
│  │  │  └─ useStickyHeader.ts
│  │  │  └─ useThemeToggle.ts
│  │  └─ types/
│  │     └─ typesPokemonDetails.ts
│  └─ globals.css
└─ jest.config.cjs

__tests__/
├─ fetchPokemonList.test.ts
├─ favoritesStore.test.ts
├─ useFilteredPokemons.test.ts
```

## 🧪 Unit Tests

To run tests:

```bash
npm test
```

Includes:

* **fetchPokemonList**: correctly transforms the response returned by the PokéAPI, ensuring that the data structure is adapted to the application's expected format.
* **useFavoritesStore**: contains BDD-style unit tests that verify toggling functionality, accurate querying of favorite Pokémon, and reliable persistence using the browser's localStorage.
* **useFilteredPokemons**: ensures correct filtering behavior based on user input for name search, as well as properly applying the favorites filter logic.

## ⚙️ How to Run

1. Install all required project dependencies using the following command:

   ```bash
   npm install
   ```

2. Start the development server:
```bash
npm run dev
````

3. Open `http://localhost:3000`

Developed by Jhon Rivero.
