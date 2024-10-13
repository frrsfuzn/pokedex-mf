import React from "react";

function Popup({ children }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-50 bg-opacity-50 flex justify-center items-center">
      {children}
    </div>
  );
}

export default Popup;
