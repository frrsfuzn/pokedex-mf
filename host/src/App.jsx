import React from "react";
import ReactDOM from "react-dom/client";
import Nav from "./components/Nav";

import "./index.scss";

const App = () => (
  <div className="text-3xl mx-auto max-w-md h-screen bg-slate-200 flex flex-col justify-between">
    <div
      className="mb-auto"
    >
      Content
    </div>
    <Nav />
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)