import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

function Otp({ correctValue, onCorrect }) {
  const [otp, setOtp] = useState("");
  useEffect(() => {
    if (otp === correctValue) {
      onCorrect?.();
    }
  }, [otp])
  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-3">Enter your one-time-password</h3>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<span className="mx-2">-</span>}
        renderInput={(props) => (
          <input
            {...props}
            className="text-xl rounded-md border-2 border-gray-500"
          />
        )}
        inputStyle={{
          width: "2.5rem",
          height: "3.5rem",
        }}
      />
    </div>
  );
}

export default Otp;
