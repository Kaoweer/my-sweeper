import React from "react";

export default function BombTile(props) {
  const { rowIndex, colIndex, hdlOnClick, baseClass } = props;

  return (
    <div
      className="relative"
      onMouseDown={(e) => hdlOnClick(e, rowIndex, colIndex)}
    >
      <div className="absolute animate-fadeIn bg-red-300 z-50 mix-blend-color-dodge w-10 rounded-sm aspect-square blur-sm"></div>

      <div className={`${baseClass}`}>
        <span>💣</span>
      </div>
    </div>
  );
}
