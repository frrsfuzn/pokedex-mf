import React, { useState, useEffect } from "react";
import PokemonBall from "@/assets/PokemonBall.png";

function CatchBall({ onClicked, isListPokemon }) {
  const [isClick, setIsClick] = useState(false);

  const catchText = isClick ? "Catching..." : "Catch!";
  const releaseText = isClick ? "Releasing..." : "Release!";

  useEffect(() => {
    let timer;
    if (isClick) {
      timer = setTimeout(() => {
        onClicked?.();
        setIsClick(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isClick]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsClick(true)}
        className={`flex items-center absolute bottom-2 right-0 ${
          isListPokemon ? "bg-teal-300" : "bg-red-300"
        } p-2 rounded-l-full gap-2`}
      >
        <img
          className={isClick ? "animate-spin" : ""}
          src={PokemonBall}
          width={30}
        />
        <h1 className="text-xl">{isListPokemon ? catchText : releaseText}</h1>
      </button>
    </div>
  );
}

export default CatchBall;
