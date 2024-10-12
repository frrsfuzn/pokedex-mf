import React from "react";
import ReactDOM from "react-dom/client";
import DetailPokemonPage from "./DetailPokemonPage";

import "./index.scss";

const App = () => (<DetailPokemonPage />);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)