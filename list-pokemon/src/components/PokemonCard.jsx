import React from "react";
import useFetchPokemon from "../hooks/useFetchPokemon";
import { mapTypeToColor } from "../utils/colors";

function PokemonCard({ pokemonName }) {
  const { data, isLoading } = useFetchPokemon(pokemonName);
  const colorGradient =
    data?.types.length > 1
      ? data.types.map((type) => mapTypeToColor(type.type.name)).join(",")
      : [
          mapTypeToColor(data?.types[0].type.name),
          mapTypeToColor(data?.types[0].type.name),
        ].join(",");
  return (
    <div
      style={{ backgroundImage: `linear-gradient(to right, ${colorGradient})` }}
      className="w-48 p-2 rounded-sm relative mt-7 h-20"
    >
      <div>
        <h3 className="text-2xl">{data?.name}</h3>
        <div className="flex gap-1">
          {data?.types.map((type) => (
            <div
              key={type.type.name}
              className="bg-slate-200 rounded-xl text-sm px-1"
            >
              {type.type.name}
            </div>
          ))}
        </div>
      </div>
      <img
        className="absolute -top-10 right-0 drop-shadow-lg"
        src={data?.sprites?.other?.home?.front_default}
        width={80}
      />
    </div>
  );
}

export default PokemonCard;
