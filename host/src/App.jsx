import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./index.scss";
import Main from "./Main";

const App = () => (
  <BrowserRouter>
    <Main /> 
    <ToastContainer
      position="top-center"
      bodyClassName={() => "text-xl flex items-center"} 
    />
  </BrowserRouter>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)