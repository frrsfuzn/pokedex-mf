import React, { useEffect, useState } from "react";
import useFetchType from "../hooks/useFetchType";
import Dropdown from "./Dropdown";
import PokemonCard from "./PokemonCard";

const MAX_PER_PAGE = 8;

function FilterByType() {
  const [selectedType, setSelectedType] = useState(null);
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(0);
  const { data: dataAllType } = useFetchType("");
  const {
    data: dataType,
    isLoading,
    refetch,
  } = useFetchType(selectedType, false);
  let options = dataAllType?.results.map((type) => type.name) || [];
  options = ["", ...options];

  const onChangeType = (e) => {
    const value = e.target.value;
    setPage(0);
    setSelectedType(value);
  };

  useEffect(() => {
    if (selectedType) {
      console.log("selectedType", selectedType);
      refetch();
    }
  }, [selectedType]);

  useEffect(() => {
    if (dataType) {
      const pokemon = dataType?.pokemon?.map((poke) => poke.pokemon.name);
      setPokemon(pokemon);
    }
  }, [dataType]);

  return (
    <div className="w-full p-3">
      <div className="flex gap-2">
        <label>Type</label>
        <div className="flex-1">
          <Dropdown
            options={options}
            onChange={onChangeType}
            value={selectedType}
          />
        </div>
      </div>
      {isLoading && <h1>Loading...</h1>}
      <div className="flex flex-wrap justify-between my-5">
        {pokemon.slice(page * MAX_PER_PAGE, (page + 1) * MAX_PER_PAGE).map((poke) => (
          <PokemonCard key={poke} pokemonName={poke} />
        ))}
      </div>
      <div className="flex w-full gap-5 justify-end px-2">
        <button
          className="p-2 rounded-md bg-orange-300 disabled:bg-slate-300 flex-1"
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <button
          className="p-2 rounded-md bg-orange-300 disabled:bg-slate-300 flex-1"
          disabled={page === Math.floor(pokemon.length / MAX_PER_PAGE)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FilterByType;
