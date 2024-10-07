import React, { Suspense } from "react";
import Nav from "./components/Nav";
import {Routes, Route} from 'react-router-dom';

import LoadingPage from '@/components/Loading/LoadingPage';
import SafeComponent from '@/components/SafeComponent';

const ListPokemonPage = React.lazy(() => import('listPokemon/ListPokemonPage'));

function Main() {
  return (
    <div className="text-3xl mx-auto max-w-md h-screen bg-slate-200 flex flex-col justify-between">
      <Routes>
        <Route path="/">
          <Route index element={<div>Hello</div>} />
          <Route path="find-pokemon" element={
            <Suspense fallback={<LoadingPage />}>
              <SafeComponent>
                <ListPokemonPage />
              </SafeComponent>
            </Suspense>
          } />
          <Route path="my-profile" element={<div>My Profile</div>} />
        </Route>
      </Routes>
      <Nav />
    </div>
  );
}

export default Main;
