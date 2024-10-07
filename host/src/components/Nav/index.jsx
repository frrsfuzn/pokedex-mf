import React, { useState } from "react";
import NavItem from "./NavItem";
import { Outlet } from "react-router-dom";

const MENUS = [
  {
    title: "My Pokemon",
    path: "/",
  },
  {
    title: "Find Pokemon",
    path: "/find-pokemon",
  },
  {
    title: "My Profile",
    path: "/my-profile",
  },
];

function Nav() {
  const [tab, setTab] = useState(0);
  return (
    <div className="text-3xl mx-auto max-w-md h-screen bg-slate-200 flex flex-col justify-between">
      <main>
        <Outlet />
      </main>
      <div className="rounded-t-md text-white flex justify-evenly items-end">
        {MENUS.map((menu, idx) => (
          <NavItem
            onClick={() => setTab(idx)}
            isActive={idx === tab}
            key={menu.title}
            path={menu.path}
          >
            {menu.title}
          </NavItem>
        ))}
      </div>
    </div>
  );
}

export default Nav;
