import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Otp from "./components/Otp";

import useStore from 'host/store';

function Main({ onSuccess }) {
  const [credential, setCredential] = useState(null);
  const setUser = useStore((state) => state.setUser);
  return (
    <GoogleOAuthProvider clientId="1019916382686-oasdh2nhustbgea276lf0t4kvcjv92fm.apps.googleusercontent.com">
      <div className="mx-auto max-w-md h-screen flex flex-col justify-center items-center bg-slate-200">
        <h1 className="text-3xl mb-3">Welcome to Pokedex!</h1>
        <h2 className="text-2xl mb-10">
          Please login with your Google Account
        </h2>
        {credential ? (
          <Otp
            correctValue="1234"
            onCorrect={() => {
              setUser(credential);
              onSuccess?.();
            }}
          />
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              setCredential(jwtDecode(credentialResponse.credential));
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default Main;
