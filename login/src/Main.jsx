import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Otp from "./components/Otp";

function Main({ onSuccess }) {
  return (
    <GoogleOAuthProvider clientId="1019916382686-oasdh2nhustbgea276lf0t4kvcjv92fm.apps.googleusercontent.com">
      <div className="mx-auto max-w-md h-screen flex flex-col justify-center items-center bg-slate-200">
        <h1 className="text-3xl mb-3">Welcome to Pokedex!</h1>
        <h2 className="text-2xl mb-10">
          Please login with your Google Account
        </h2>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            localStorage.setItem(
              "credential",
              JSON.stringify(jwtDecode(credentialResponse.credential))
            );
            onSuccess?.();
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Main;