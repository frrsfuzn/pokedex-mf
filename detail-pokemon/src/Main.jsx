import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CatchBall from "./components/CatchBall";
import PopupName from "./components/Popup/PopupName";
import StatItem from "./components/StatItem";
import useFetchPokemon from "./hooks/useFetchPokemon";
import { mapTypeToColor, mapStatToColor } from "./utils/colors";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";

export default function Main({ mode }) {
  const isListPokemon = mode === "listPokemon";

  const { pokemonId } = useParams();
  const navigate = useNavigate();

  const [isPopupNameOpen, setIsPopupNameOpen] = useState(false);
  const [name, setName] = useState(isListPokemon ? "" : pokemonId);
  const [pokemonName, setPokemonName] = useState(
    isListPokemon ? pokemonId : null
  );

  const { data, isLoading, refetch } = useFetchPokemon(
    pokemonName,
    isListPokemon
  );

  useEffect(() => {
    if (!isListPokemon) {
      const user = localStorage.getItem("credential");
      if (user) {
        const parsedUser = JSON.parse(user);
        const catchedPokemon = parsedUser?.catchedPokemon;
        if (catchedPokemon) {
          setPokemonName(catchedPokemon[pokemonId]);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!isListPokemon && pokemonName !== null) {
      refetch();
    }
  }, [pokemonName]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No Data!</div>;

  const colorGradient =
    data?.types.length > 1
      ? data.types.map((type) => mapTypeToColor(type.type.name)).join(",")
      : [
          mapTypeToColor(data?.types[0].type.name),
          mapTypeToColor(data?.types[0].type.name),
        ].join(",");

  const onClicked = () => {
    setIsPopupNameOpen(true);
  };

  const onSave = () => {
    const user = localStorage.getItem("credential");
    if (user) {
      let parsedUser = JSON.parse(user);
      if (parsedUser?.catchedPokemon) {
        if (!parsedUser.catchedPokemon[name]) {
          parsedUser.catchedPokemon[name] = data?.name;
          if (!isListPokemon) {
            delete parsedUser.catchedPokemon[pokemonId];
            localStorage.setItem("credential", JSON.stringify(parsedUser));
            navigate(`/my-pokemon/${name}`, { replace: true });
          } else {
            localStorage.setItem("credential", JSON.stringify(parsedUser));
          }
          setIsPopupNameOpen(false);
        } else {
          toast.error("Name already in use!", {
            position: "top-center",
          });
        }
      } else {
        parsedUser = {
          ...parsedUser,
          catchedPokemon: {
            [name]: data?.name,
          },
        };
        localStorage.setItem("credential", JSON.stringify(parsedUser));
        setIsPopupNameOpen(false);
      }
    }
  };

  const onNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  return (
    <div className="w-full flex flex-col relative">
      <div className="w-full overflow-auto flex-1">
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
                    onClick={() => setIsPopupNameOpen(true)}
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
                {data?.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
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
      </div>
      {mode === "listPokemon" && (
        <CatchBall onClicked={onClicked} mode={mode} />
      )}
      <PopupName
        isOpen={isPopupNameOpen}
        pokemonName={data?.name}
        nameValue={name}
        onNameChange={onNameChange}
        onSave={onSave}
      />
    </div>
  );
}
