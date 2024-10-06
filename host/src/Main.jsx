import React from "react";
import Nav from "./components/Nav";
import {Routes, Route} from 'react-router-dom';

function Main() {
  return (
    <div className="text-3xl mx-auto max-w-md h-screen bg-slate-200 flex flex-col justify-between">
      <Routes>
        <Route path="/">
          <Route index element={<div>Hello</div>} />
          <Route path="find-pokemon" element={<div>Find Pokemon</div>} />
          <Route path="my-profile" element={<div>My Profile</div>} />
        </Route>
      </Routes>
      <Nav />
    </div>
  );
}

export default Main;
