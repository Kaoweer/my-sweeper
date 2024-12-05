import React from "react";

export default function MarkedTile(props) {
  let { rowIndex, colIndex, hdlOnClick, baseClass } = props;
  return (
    <div
      className="relative"
      onMouseDown={(e) => hdlOnClick(e, rowIndex, colIndex)}
    >
      <div className="absolute animate-fadeIn bg-green-300 z-50 mix-blend-lighten w-10 rounded-sm aspect-square blur-sm"></div>

      <div
        onMouseDown={(e) => hdlOnClick(e, rowIndex, colIndex)}
        key={`${rowIndex}-${colIndex}`}
        className={`${baseClass} bg-white transform transition-transform duration-200 ease-in-out hover:scale-105`}
      >
        <span className="animate-fadeIn">🚩</span>
      </div>
    </div>
  );
}
