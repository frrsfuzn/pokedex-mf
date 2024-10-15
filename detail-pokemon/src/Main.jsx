import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CatchBall from "./components/CatchBall";
import PopupName from "./components/Popup/PopupName";
import useFetchPokemon from "./hooks/useFetchPokemon";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BannerPokemon from "./components/BannerPokemon";
import DetailPokemon from "./components/DetailPokemon";

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

  const onClicked = () => {
    if (Math.random() < 0.2) {
      setIsPopupNameOpen(true);
    } else {
      toast.error("Sorry... the Pokémon ran away :(", {
        position: "top-center",
      });
    }
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
        <BannerPokemon
          data={data}
          isListPokemon={isListPokemon}
          onEditClick={() => setIsPopupNameOpen(true)}
          pokemonName={pokemonName}
          pokemonId={pokemonId}
        />
        <DetailPokemon data={data} />
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
        onCancel={() => setIsPopupNameOpen(false)}
        isListPokemon={isListPokemon}
      />
    </div>
  );
}
