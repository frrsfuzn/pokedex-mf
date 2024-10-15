import React from "react";

function Dropdown({ options, value, onChange }) {
  return (
    <select className="w-full bg-white rounded-md" value={value} onChange={onChange}>
      {options.map((opt) => (
        <option value={opt}>{opt}</option>
      ))}
    </select>
  );
}

export default Dropdown;
