import React from "react";
import { useParams } from "react-router-dom";
import useFetchPokemon from "./hooks/useFetchPokemon";
import { mapTypeToColor } from "./utils/colors";

export default function Main() {
  const { pokemonId } = useParams();
  const { data, isLoading } = useFetchPokemon(pokemonId);
  if (!data) return <div>Loading...</div>;
  const colorGradient =
    data?.types.length > 1
      ? data.types.map((type) => mapTypeToColor(type.type.name)).join(",")
      : [
          mapTypeToColor(data?.types[0].type.name),
          mapTypeToColor(data?.types[0].type.name),
        ].join(",");
  return (
    <div className="w-full">
      <div
        style={{
          backgroundImage: `linear-gradient(to right, ${colorGradient})`,
        }}
        className="flex flex-col items-center"
      >
        <div className="flex justify-between items-center p-5 w-full">
          <h2>{data.name}</h2>
          <h2>#{data.id}</h2>
        </div>
        <img
          className="drop-shadow-lg"
          src={data?.sprites?.other?.home?.front_default}
          width={200}
        />
      </div>
      <div className="bg-white w-full rounded-t-xl -mt-16 pt-20 px-5">
        <h2>Details</h2>
        <div>
          <div>
            <label>height</label>
            <label>weight</label>
          </div>
        </div>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
        <h2>Stats</h2>
      </div>
    </div>
  );
}
