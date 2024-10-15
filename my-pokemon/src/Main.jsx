import React, { Suspense, useEffect, useState } from "react";
import PopupName from "./components/Popup/PopupName";
import SafeComponent from "./components/SafeComponent";
import { isFibb } from './utils/number';
import useStore from 'host/store';

const PokemonCard = React.lazy(() => import("listPokemon/PokemonCard"));

function Main() {
  const user = useStore((state) => state.user);
  const catchedPokemon = useStore((state) => state.catchedPokemon);
  const renamePokemon = useStore((state) => state.renamePokemon);
  const deletePokemon = useStore((state) => state.deletePokemon);
  // const [count, setCount] = useState(0);

  // const forceUpdate = () => setCount((prev) => prev + 1);

  // const [myPokemon, setMyPokemon] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [name, setName] = useState('');
  const [isPopupNameOpen, setIsPopupNameOpen] = useState(false);

  const onEditClick = (name) => {
    setIsPopupNameOpen(true);
    setSelectedPokemon(name);
    setName(name);
  }

  const onNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  }

  const onSave = () => {
    if (!catchedPokemon[name]) {
      renamePokemon(name, selectedPokemon);
    }
    setIsPopupNameOpen(false);
  }

  const onReleaseClick = (name) => {
    const randomNum = Math.floor(Math.random() * 10);
    if (isFibb(randomNum)) {
      deletePokemon(name)
    } else {
      console.log('sorry')
    }
  }

  return (
    <div className="flex flex-col items-center w-full p-5">
      <h1>My Pokemon</h1>
      <div className="flex flex-row justify-around flex-wrap w-full mt-5 mb-5">
      <Suspense>
        <SafeComponent>
          {Object.keys(catchedPokemon).map((data) => (
            <PokemonCard
              key={data}
              pokemonName={catchedPokemon[data]}
              name={data}
              isFromMyPokemon
              onEdit={() => onEditClick(data)}
              onRelease={() => onReleaseClick(data)}
            />
          ))}
        </SafeComponent>
      </Suspense>
      </div>
      <PopupName
        isOpen={isPopupNameOpen}
        nameValue={name}
        onNameChange={onNameChange}
        onSave={onSave}
        onCancel={() => setIsPopupNameOpen(false)}
      />
    </div>
  );
}

export default Main;
