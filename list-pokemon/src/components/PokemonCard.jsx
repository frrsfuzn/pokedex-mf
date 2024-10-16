import React from "react";
import useFetchPokemon from "../hooks/useFetchPokemon";
import { mapTypeToColor } from "../utils/colors";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { CgPokemon } from "react-icons/cg";

function PokemonCard({
  pokemonName,
  name,
  isFromMyPokemon = false,
  onEdit,
  onRelease,
}) {
  const { data, isLoading } = useFetchPokemon(pokemonName);
  const navigate = useNavigate();
  const colorGradient =
    data?.types.length > 1
      ? data.types.map((type) => mapTypeToColor(type.type.name)).join(",")
      : [
          mapTypeToColor(data?.types[0].type.name),
          mapTypeToColor(data?.types[0].type.name),
        ].join(",");
  const loadingGradient = '#787878,#c4c4c4'
  const redirectToDetail = () => {
    isFromMyPokemon
      ? navigate(`/my-pokemon/${name}`)
      : navigate(`/find-pokemon/${pokemonName}`);
  };
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, ${isLoading ? loadingGradient : colorGradient})`
      }}
      className="flex justify-between w-48 p-2 rounded-md relative mt-7 h-20"
    >
      <div>
        <h3 onClick={redirectToDetail} className="text-2xl cursor-pointer">
          {isFromMyPokemon ? name : data?.name}
        </h3>
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
      {isFromMyPokemon && (
        <div className="flex items-end">
          <div className="flex text-sm gap-2">
            <button onClick={onEdit} className="bg-white p-1.5 rounded-full">
              <FaPencilAlt />
            </button>
            <button onClick={onRelease} className="bg-white p-1.5 rounded-full">
              <CgPokemon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonCard;
