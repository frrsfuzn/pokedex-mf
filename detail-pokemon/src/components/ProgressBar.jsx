import React from "react";

function ProgressBar({
  percentage = 30,
  baseColor = "#efefef",
  barColor = "skyblue",
  height = 10,
}) {
  return (
    <div
      style={{ background: baseColor, height }}
      className="w-full rounded-full overflow-hidden"
    >
      <div
        style={{ width: `${percentage}%`, background: barColor }}
        className="h-full"
      />
    </div>
  );
}

export default ProgressBar;
