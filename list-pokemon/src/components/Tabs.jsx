import React from "react";

function Tab({ name, onClick, isActive }) {
  const active = 'inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 active focus:outline-none';
  const nonActive = 'inline-block w-full p-4 bg-white border-r border-gray-200  hover:text-gray-700 hover:bg-gray-50 focus:outline-none';
  return (
    <li className="w-full focus-within:z-10">
      <button
        className={isActive ? active : nonActive}
        onClick={onClick}
      >
        {name}
      </button>
    </li>
  );
}

function Tabs({ tabs, currentTab, onChange }) {
  return (
    <div className="flex flex-col w-full px-3 gap-3">
      <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg overflow-hidden shadow sm:flex dark:divide-gray-700 ">
        {tabs.map((tab) => {
          return <Tab name={tab} onClick={() => onChange(tab)} isActive={tab === currentTab} />
        })} 
      </ul>
    </div>
  );
}

export default Tabs;
