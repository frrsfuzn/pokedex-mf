import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Main() {
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>Name: login</div>
      <div>Framework: react</div>
      <div>Language: JavaScript</div>
      <div>CSS: Tailwind</div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(jwtDecode(credentialResponse.credential));
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}

export default Main;
