import React from "react";

function ProfilePage({ onLogOut }) {
  const user = localStorage.getItem("credential");
  if (!user) return <h1 className="text-3xl">Unauthorized Access!</h1>;
  const logOut = () => {
    localStorage.removeItem("credential");
    onLogOut?.();
  }
  return (
    <div className="mx-auto max-w-md w-full bg-slate-200 flex flex-col justify-center items-center">
      ProfilePage
      <button className="p-3 bg-rose-500 rounded-md text-white font-bold w-1/2" onClick={logOut}>Log Out</button>
    </div>
  );
}

export default ProfilePage;
