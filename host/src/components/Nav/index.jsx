import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { Outlet, useLocation } from "react-router-dom";

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
  const location = useLocation();
  const { pathname } = location;
  const [tab, setTab] = useState(0);
  useEffect(() => {
    const currentPath = `/${pathname.split('/')[1]}`;
    const currentPathIndex = MENUS.map((menu) => menu.path).indexOf(currentPath)
    if (currentPathIndex !== -1) setTab(currentPathIndex);
  }, [])
  return (
    <div className="text-3xl mx-auto max-w-md overflow-auto h-screen bg-slate-200 flex flex-col justify-between">
      <main className="flex-1 flex overflow-auto">
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
