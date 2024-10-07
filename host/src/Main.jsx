import React, { Suspense } from "react";
import Nav from "./components/Nav";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import LoadingPage from "@/components/Loading/LoadingPage";
import SafeComponent from "@/components/SafeComponent";

const ListPokemonPage = React.lazy(() => import("listPokemon/ListPokemonPage"));
const LoginPage = React.lazy(() => import("login/LoginPage"));
const ProfilePage = React.lazy(() => import("profile/ProfilePage"));

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("credential");
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

function Main() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <div>Hello world</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="find-pokemon"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingPage />}>
                <SafeComponent key="pokemonPage">
                  <ListPokemonPage />
                </SafeComponent>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="my-profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingPage />}>
                <SafeComponent key="profilePage">
                  <ProfilePage onLogOut={() => navigate("/login")} />
                </SafeComponent>
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/">
        <Route
          path="login"
          element={<LoginPage onSuccess={() => navigate("/")} />}
        />
      </Route>
    </Routes>
  );
}

export default Main;
