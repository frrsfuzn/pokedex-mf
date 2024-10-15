import React, { Suspense, useEffect, useState } from "react";
import PopupName from "./components/Popup/PopupName";
import SafeComponent from "./components/SafeComponent";
import { isFibb } from './utils/number';


const PokemonCard = React.lazy(() => import("listPokemon/PokemonCard"));

function Main() {

  const [count, setCount] = useState(0);

  const forceUpdate = () => setCount((prev) => prev + 1);

  const [myPokemon, setMyPokemon] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [name, setName] = useState('');
  const [isPopupNameOpen, setIsPopupNameOpen] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("credential");
    if (user) {
      const parsedUser = JSON.parse(user);
      setMyPokemon(parsedUser?.catchedPokemon || {});
    }
  }, [isPopupNameOpen, count]);

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
    const user = localStorage.getItem("credential");
      if (user) {
        const parsedUser = JSON.parse(user);
        const catchedPokemon = parsedUser?.catchedPokemon;
        if (catchedPokemon) {
          if (!catchedPokemon[name]) {
            parsedUser.catchedPokemon[name] = catchedPokemon[selectedPokemon];
            delete parsedUser.catchedPokemon[selectedPokemon]
            localStorage.setItem("credential", JSON.stringify(parsedUser));
          }
        }
      }
    setIsPopupNameOpen(false);
  }

  const onReleaseClick = (name) => {
    const randomNum = Math.floor(Math.random() * 10);
    if (isFibb(randomNum)) {
      const user = localStorage.getItem("credential");
      if (user) {
        let parsedUser = JSON.parse(user);
        if (parsedUser?.catchedPokemon) {
          delete parsedUser.catchedPokemon[name];
          localStorage.setItem("credential", JSON.stringify(parsedUser));
          forceUpdate();
          console.log('success');
        }
      }
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
          {Object.keys(myPokemon).map((data) => (
            <PokemonCard
              key={data}
              pokemonName={myPokemon[data]}
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
