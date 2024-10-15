import React, { Suspense, useEffect, useState } from "react";
import PopupName from "./components/Popup/PopupName";
import SafeComponent from "./components/SafeComponent";
import { useNavigate } from "react-router-dom";


const PokemonCard = React.lazy(() => import("listPokemon/PokemonCard"));

function Main() {
  const navigate = useNavigate();

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
  }, [isPopupNameOpen]);

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
    console.log('release', name)
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
