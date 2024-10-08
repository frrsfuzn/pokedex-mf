import React, { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useFetchAllPokemon from "./hooks/useFetchListPokemon";

const queryClient = new QueryClient();

function Main() {
  const [page, setPage] = useState(0);
  const { status, data } = useFetchAllPokemon(page, 6);

  const onPrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    } else {
      setPage(0);
    }
  };

  const onNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="flex items-center flex-col w-full py-3">
      This is the page of list of pokemon
      <div className="flex flex-row justify-around flex-wrap w-full mt-5 mb-5">
        {data?.results.map((pokemon) => (
          <PokemonCard pokemonName={pokemon.name} />
        ))}
      </div>
      <div className="flex w-full gap-5 justify-end px-2">
        <button
          className="p-2 rounded-md bg-orange-300 disabled:bg-slate-300 flex-1"
          disabled={data?.previous === null}
          onClick={onPrev}
        >
          Prev
        </button>
        <button
          className="p-2 rounded-md bg-orange-300 flex-1"
          disabled={data?.next === null}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Main;
