import { PokeClientView } from "./lib/components/PokeClientView";
import { fetchPokemonList } from "./lib/services/pokemonList";

export default async function App() {
  const pokedata = await fetchPokemonList();

  console.log(pokedata)
  return (
    <main className="p-5 max-w-screen-2xl mx-auto">
      <PokeClientView pokemonList={pokedata} />
    </main>
  );
}
