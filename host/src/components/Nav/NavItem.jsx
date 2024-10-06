import React from "react";

function NavItem({ isActive, onClick, children }) {
  const baseClass =
    "flex-1 text-xl text-center p-3 rounded-t-md cursor-pointer transition-all";
  return (
    <nav
      onClick={onClick}
      className={`${baseClass} ${isActive ? "bg-sky-600 h-16" : "bg-sky-800"}`}
    >
      {children}
    </nav>
  );
}

export default NavItem;
