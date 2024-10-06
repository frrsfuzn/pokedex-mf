import React from "react";
import { Link } from 'react-router-dom';

function NavItem({ isActive, onClick, children, path }) {
  const baseClass =
    "flex-1 text-xl text-center p-3 rounded-t-md cursor-pointer transition-all";
  return (
    <Link
      onClick={onClick}
      className={`${baseClass} ${isActive ? "bg-sky-600 h-16" : "bg-sky-800"}`}
      to={path}
    >
      {children}
    </Link>
  );
}

export default NavItem;
