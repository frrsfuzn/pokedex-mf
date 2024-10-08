import React from "react";
import { FaPencilAlt, FaCheck } from "react-icons/fa";

function FormInput({ value, onChange, isEdit, onEditToggle }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <label
          htmlFor="first_name"
          className="block mb-2 text-2xl font-medium text-gray-900 "
        >
          Name
        </label>
        <button onClick={onEditToggle}>
          {isEdit ? <FaCheck className="w-4" /> : <FaPencilAlt className="w-4" />}
        </button>
      </div>
      <input
        type="text"
        id="first_name"
        className="bg-gray-50 disabled:bg-gray-300 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Farras"
        onChange={onChange}
        value={value}
        disabled={!isEdit}
      />
    </div>
  );
}

export default FormInput;
