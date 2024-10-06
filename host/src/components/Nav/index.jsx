import React, { useState } from "react";
import NavItem from "./NavItem";

const MENUS = [
  {
    title: "My Pokemon",
    path: "/"
  },
  {
    title: "Find Pokemon",
    path: "/find-pokemon"
  },
  {
    title: "My Profile",
    path: "/my-profile"
  }
];

function Nav() {
  const [tab, setTab] = useState(0);
  return (
    <div className="rounded-t-md text-white flex justify-evenly items-end">
      {MENUS.map((menu, idx) => (
        <NavItem onClick={() => setTab(idx)} isActive={idx === tab} key={menu.title} path={menu.path}>
          {menu.title}
        </NavItem>
      ))}
    </div>
  );
}

export default Nav;
