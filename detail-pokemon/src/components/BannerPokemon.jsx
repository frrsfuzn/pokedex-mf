import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { mapTypeToColor } from "../utils/colors";

function BannerPokemon({ data, isListPokemon, onEditClick, pokemonName, pokemonId }) {
  const colorGradient =
  data?.types.length > 1
    ? data.types.map((type) => mapTypeToColor(type.type.name)).join(",")
    : [
        mapTypeToColor(data?.types[0].type.name),
        mapTypeToColor(data?.types[0].type.name),
      ].join(",");
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, ${colorGradient})`,
      }}
      className="flex flex-col items-center"
    >
      <div className="flex justify-between items-center p-5 w-full">
        {isListPokemon ? (
          <h2>{data.name}</h2>
        ) : (
          <div>
            <div className="flex items-center gap-2">
              <h2>{pokemonId}</h2>
              <button
                onClick={onEditClick}
                className="text-sm"
              >
                <FaPencilAlt />
              </button>
            </div>
            <h3 className="text-xl text-slate-50">{pokemonName}</h3>
          </div>
        )}
        <h2>#{data.id}</h2>
      </div>
      <div className="flex">
        <img
          className="drop-shadow-lg"
          src={data?.sprites?.other?.showdown?.back_default}
          width={150}
        />
        <img
          className="drop-shadow-lg"
          src={data?.sprites?.other?.showdown?.front_default}
          width={150}
        />
      </div>
    </div>
  );
}

export default BannerPokemon;
