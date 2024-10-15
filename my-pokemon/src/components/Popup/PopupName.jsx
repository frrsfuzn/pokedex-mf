import React from "react";
import Popup from "./Popup";

function PopupName({ isOpen, nameValue, onNameChange, onSave, onCancel }) {
  return isOpen ? (
    <Popup>
      <div className="max-w-md p-3 bg-white rounded-lg drop-shadow-lg flex flex-col gap-2">
        <h1 className="text-3xl text-center">Rename it!</h1>
        <input
          value={nameValue}
          onChange={onNameChange}
          className="text-2xl focus:border-b-2 border-b-2 rounded-lg p-1"
        />
        <div className="flex gap-2 w-full">
          <button
            disabled={nameValue === ""}
            onClick={onSave}
            className="px-1 flex-1 bg-emerald-300 text-2xl rounded-lg disabled:bg-slate-300"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="px-1 flex-1 bg-red-400 text-2xl rounded-lg disabled:bg-slate-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </Popup>
  ) : null;
}

export default PopupName;
