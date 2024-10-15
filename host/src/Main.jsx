import React, { Suspense } from "react";
import Nav from "./components/Nav";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import LoadingPage from "@/components/Loading/LoadingPage";
import SafeComponent from "@/components/SafeComponent";
import useStore from "host/store";

const ListPokemonPage = React.lazy(() => import("listPokemon/ListPokemonPage"));
const LoginPage = React.lazy(() => import("login/LoginPage"));
const ProfilePage = React.lazy(() => import("profile/ProfilePage"));
const DetailPokemonPage = React.lazy(() =>
  import("detailPokemon/DetailPokemonPage")
);
const MyPokemonPage = React.lazy(() => import("myPokemon/MyPokemonPage"));

const ProtectedRoute = ({ children }) => {
  const user = useStore((state) => state.user);
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

function Main() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={user ? <Nav /> : undefined}>
        <Route index element={<Navigate to="/my-pokemon" />} />
        <Route path="my-pokemon">
          <Route
            index
            element={
              <Suspense fallback={<LoadingPage />}>
                <ProtectedRoute>
                  <SafeComponent key="myPokemonPage">
                    <MyPokemonPage />
                  </SafeComponent>
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path=":pokemonId"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ProtectedRoute>
                  <SafeComponent key="detailPokemonPage">
                    <DetailPokemonPage mode="myPokemon" />
                  </SafeComponent>
                </ProtectedRoute>
              </Suspense>
            }
          />
        </Route>
        <Route path="find-pokemon">
          <Route
            index
            element={
              <Suspense fallback={<LoadingPage />}>
                <ProtectedRoute>
                  <SafeComponent key="pokemonPage">
                    <ListPokemonPage />
                  </SafeComponent>
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path=":pokemonId"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ProtectedRoute>
                  <SafeComponent key="detailPokemonPage">
                    <DetailPokemonPage mode="listPokemon" />
                  </SafeComponent>
                </ProtectedRoute>
              </Suspense>
            }
          />
        </Route>
        <Route
          path="my-profile"
          element={
            <Suspense fallback={<LoadingPage />}>
              <ProtectedRoute>
                <SafeComponent key="profilePage">
                  <ProfilePage
                    onLogOut={() => navigate("/login", { replace: true })}
                  />
                </SafeComponent>
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <LoginPage
              onSuccess={() => navigate("my-pokemon", { replace: true })}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default Main;
