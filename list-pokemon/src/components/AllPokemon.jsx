import React, { useState } from "react";
import PokemonCard from "./PokemonCard";
import useFetchAllPokemon from "../hooks/useFetchListPokemon";

function AllPokemon() {
  const [page, setPage] = useState(0);
  const { status, data } = useFetchAllPokemon(page, 10);

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
    <div>
      <div className="flex flex-row justify-around flex-wrap w-full mt-3 mb-3">
        {data?.results.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemonName={pokemon.name} />
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

export default AllPokemon;
