import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CatchBall from "./components/CatchBall";
import PopupName from "./components/Popup/PopupName";
import useFetchPokemon from "./hooks/useFetchPokemon";
import toast from "host/toast";
import { useNavigate } from "react-router-dom";
import BannerPokemon from "./components/BannerPokemon";
import DetailPokemon from "./components/DetailPokemon";
import { isFibb } from "./utils/number";
import useStore from "host/store";

export default function Main({ mode }) {
  const isListPokemon = mode === "listPokemon";

  const catchedPokemon = useStore((state) => state.catchedPokemon);
  const addPokemon = useStore((state) => state.addPokemon);
  const renamePokemon = useStore((state) => state.renamePokemon);
  const deletePokemon = useStore((state) => state.deletePokemon);

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
      setPokemonName(catchedPokemon[pokemonId]);
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
    if (isListPokemon) {
      if (Math.random() < 0.2) {
        setIsPopupNameOpen(true);
      } else {
        toast.error("Sorry... the Pokémon ran away :(", {
          position: "top-center",
        });
      }
    } else {
      onReleasePokemon();
    }
  };

  const onSave = () => {
    if (!catchedPokemon[name]) {
      if (!isListPokemon) {
        renamePokemon(name, pokemonId);
        navigate(`/my-pokemon/${name}`, { replace: true });
      } else {
        addPokemon(name, pokemonId);
      }
      setIsPopupNameOpen(false);
    } else {
      toast.error("Name already in use!", {
        position: "top-center",
      });
    }
  };

  const onNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const onReleasePokemon = () => {
    const randomNum = Math.floor(Math.random() * 10);
    if (isFibb(randomNum)) {
      deletePokemon(pokemonId);
      toast.success(
        `Success releasing pokemon! Going back now... Code ${randomNum}`,
        {
          closeButton: false,
          onClose: () => {
            navigate("/my-pokemon", { replace: true });
          },
        }
      );
    } else {
      toast.error(
        `Sorry... Your pokemon in a bad mood, try again later. Code #${randomNum}`
      );
    }
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
      <CatchBall onClicked={onClicked} isListPokemon={isListPokemon} />
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
