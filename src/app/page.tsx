import { PokeClientView } from './lib/components/pokemon/views/PokeClientView';
import { fetchPokemonList } from './lib/services/pokemonList';

export default async function App() {
  const pokedata = await fetchPokemonList();

  return (
    <main className="p-5 max-w-screen-2xl mx-auto bg-background">
      <PokeClientView pokemonList={pokedata} />
    </main>
  );
}
