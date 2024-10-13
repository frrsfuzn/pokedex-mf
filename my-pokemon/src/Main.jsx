import React, { Suspense, useEffect, useState } from "react";
import SafeComponent from "./components/SafeComponent";

const PokemonCard = React.lazy(() => import("listPokemon/PokemonCard"));

function Main() {
  const [myPokemon, setMyPokemon] = useState({});
  useEffect(() => {
    const user = localStorage.getItem("credential");
    if (user) {
      const parsedUser = JSON.parse(user);
      setMyPokemon(parsedUser?.catchedPokemon || {});
    }
  }, []);
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
            />
          ))}
        </SafeComponent>
      </Suspense>
      </div>
    </div>
  );
}

export default Main;
