import React, { useEffect, useState } from "react";
import FormInput from "./components/FormInput";
import ProfilePicture from "./components/ProfilePicture";

function ProfilePage({ onLogOut }) {
  const user = localStorage.getItem("credential");

  if (!user) return <h1 className="text-3xl">Unauthorized Access!</h1>;

  const [userData, setUserData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const logOut = () => {
    localStorage.removeItem("credential");
    onLogOut?.();
  };

  const onEditToggle = () => {
    setIsEdit((prev) => !prev);
  };

  const onChangeName = (e) => {
    const value = e.target.value;
    setUserData((prev) => ({ ...prev, name: value }));
  };

  const onSuccessEdit = (base64) => {
    setUserData((prev) => ({ ...prev, picture: base64 }));
  }

  useEffect(() => {
    const parsedJson = JSON.parse(user);
    setUserData({
      name: parsedJson.name,
      picture: parsedJson.picture,
    });
  }, []);

  useEffect(() => {
    if (!isEdit) {
      const parsedJson = JSON.parse(user);
      const newUserData = {...parsedJson, ...userData}; 
      localStorage.setItem('credential', JSON.stringify(newUserData));
    }
  }, [userData, isEdit]);

  return (
    <div className="mx-auto max-w-md w-full bg-slate-200 flex flex-col justify-evenly items-center py-10">
      <h1 className="text-4xl">Your Profile!</h1>
      <div className="flex justify-center gap-2">
        <ProfilePicture url={userData?.picture} onSuccessEdit={onSuccessEdit} />
        <FormInput
          value={userData?.name}
          isEdit={isEdit}
          onChange={onChangeName}
          onEditToggle={onEditToggle}
        />
      </div>
      <button
        className="p-3 bg-rose-500 rounded-md text-white font-bold w-1/2"
        onClick={logOut}
      >
        Log Out
      </button>
    </div>
  );
}

export default ProfilePage;
