import React from "react";
import StatItem from "./StatItem";
import { mapStatToColor } from "@/utils/colors";

function DetailPokemon({ data }) {
  return (
    <div className="bg-white w-full rounded-t-xl -mt-16 pt-20 px-5 pb-10">
      <h2>Details</h2>
      <div className="flex justify-start">
        <div className="flex flex-col w-20">
          <label className="text-xl">Height</label>
          <label className="text-xl">Weight</label>
          <label className="text-xl">Abilites</label>
          <label className="text-xl">Types</label>
        </div>
        <div className="flex flex-col">
          <label className="text-xl">{data?.height}"</label>
          <label className="text-xl">{data?.weight} lbs</label>
          <label className="text-xl">
            {data?.abilities.map((ability) => ability.ability.name).join(", ")}
          </label>
          <label className="text-xl">
            {data?.types?.map(({ type }) => type.name).join(", ")}
          </label>
        </div>
      </div>
      <h2 className="mt-10">Stats</h2>
      {data?.stats?.map(({ stat, base_stat }) => {
        const { baseColor, barColor } = mapStatToColor(stat.name);
        return (
          <StatItem
            key={stat.name}
            baseColor={baseColor}
            barColor={barColor}
            label={stat.name}
            value={base_stat}
          />
        );
      })}
      <h2 className="mt-10">Moves</h2>
      <div className="flex flex-wrap gap-2">
        {data?.moves?.map(({ move }) => (
          <div
            key={move.name}
            className="text-xl px-2 rounded-full bg-sky-900 text-white text-nowrap"
          >
            {move.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailPokemon;
