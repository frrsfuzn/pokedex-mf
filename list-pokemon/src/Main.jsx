import React, { useEffect, useState } from "react";
import AllPokemon from "./components/AllPokemon";
import FilterByType from "./components/FilterByType";
import SearchByName from "./components/SearchByName";
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
      <Tabs tabs={TABS} currentTab={tab} onChange={(curr) => setTab(curr)} />
      {tab === TABS[0] && <AllPokemon />}
      {tab === TABS[1] && <SearchByName />}
      {tab === TABS[2] && <FilterByType />}
    </div>
  );
}

export default Main;
