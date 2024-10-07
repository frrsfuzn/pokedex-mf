import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Main from './Main';

import "./index.scss";

const App = () => (
  <GoogleOAuthProvider clientId="1019916382686-oasdh2nhustbgea276lf0t4kvcjv92fm.apps.googleusercontent.com">
    <Main />
  </GoogleOAuthProvider>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)