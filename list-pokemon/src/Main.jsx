import React, { useEffect, useState } from "react";
import AllPokemon from "./components/AllPokemon";
import Tabs from "./components/Tabs";

const TABS = [
  'All Pokemon',
  'Search by Name',
  'Filter by Type'
]

function Main() {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <div className="flex items-center flex-col w-full py-3">
      This is the page of list of pokemon
      <Tabs tabs={TABS} currentTab={tab} onChange={(curr) => setTab(curr)} />
      {tab === TABS[0] && <AllPokemon />}
    </div>
  );
}

export default Main;
