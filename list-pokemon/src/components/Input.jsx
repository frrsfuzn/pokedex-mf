import React from "react";

function Input({ value, onChange }) {
  return (
    <input
      type="text"
      id="first_name"
      className="bg-gray-50 disabled:bg-gray-300 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
      onChange={onChange}
      value={value}
    />
  );
}

export default Input;
