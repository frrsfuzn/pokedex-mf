import React, { useState } from "react";
import NavItem from "./NavItem";

const MENUS = ["My Pokemon", "Find Pokemon", "My Profile"];

function Nav() {
  const [tab, setTab] = useState(0);
  return (
    <div className="rounded-t-md text-white flex justify-evenly items-end">
      {MENUS.map((menu, idx) => (
        <NavItem onClick={() => setTab(idx)} isActive={idx === tab} key={menu}>
          {menu}
        </NavItem>
      ))}
    </div>
  );
}

export default Nav;
