import React from "react";
import Popup from "./Popup";

function PopupName({ isOpen, pokemonName, nameValue, onNameChange, onSave }) {
  return isOpen ? (
    <Popup>
      <div className="max-w-md p-3 bg-white rounded-lg drop-shadow-lg flex flex-col gap-2">
        <h1 className="text-3xl text-center">Yeay! You catch {pokemonName}!</h1>
        <h2 className="text-2xl text-center">Give name to it!</h2>
        <input
          value={nameValue}
          onChange={onNameChange}
          className="text-2xl focus:border-b-2 border-b-2 rounded-lg p-1"
        />
        <button
          disabled={nameValue === ""}
          onClick={onSave}
          className="px-1 bg-emerald-300 text-2xl rounded-lg disabled:bg-slate-300"
        >
          Save
        </button>
      </div>
    </Popup>
  ) : null;
}

export default PopupName;
