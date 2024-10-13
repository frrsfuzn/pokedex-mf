import React from "react";
import useFetchPokemon from "../hooks/useFetchPokemon";
import { mapTypeToColor } from "../utils/colors";
import { useNavigate } from "react-router-dom";

function PokemonCard({ pokemonName, name, isFromMyPokemon = false }) {
  const { data, isLoading } = useFetchPokemon(pokemonName);
  const navigate = useNavigate();
  const colorGradient =
    data?.types.length > 1
      ? data.types.map((type) => mapTypeToColor(type.type.name)).join(",")
      : [
          mapTypeToColor(data?.types[0].type.name),
          mapTypeToColor(data?.types[0].type.name),
        ].join(",");
  const redirectToDetail = () => {
    isFromMyPokemon
      ? navigate(`/my-pokemon/${pokemonName}`)
      : navigate(`/find-pokemon/${pokemonName}`);
  };
  return (
    <div
      style={{ backgroundImage: `linear-gradient(to right, ${colorGradient})` }}
      className="w-48 p-2 rounded-md relative mt-7 h-20 cursor-pointer"
      onClick={redirectToDetail}
    >
      <div>
        <h3 className="text-2xl">{isFromMyPokemon ? name : data?.name}</h3>
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
