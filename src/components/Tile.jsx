import React, { useEffect, useState } from "react";
import BombTile from "./BombTile";
import MarkedTile from "./MarkedTile";
import IdleTile from "./IdleTile";

export default function Tile(props) {
  const [tileState, setTileState] = useState(null);
  const {
    rowIndex,
    marked = new Set(), // Add default value
    colIndex,
    hdlOnClick,
    hdlReveal,
    bombLocation,
    isBomb,
    board,
    revealed = new Set(), // Add default value
  } = props;

  const isRevealed = revealed.has(`${rowIndex},${colIndex}`);
  const isMarked = marked.has(`${rowIndex},${colIndex}`);
  const baseClass = `border-[3px] border-gray-600 shadow-md transition-all duration-300 ease-in-out w-10 rounded-md aspect-square flex items-center justify-center hover:bg-slate-200 cursor-pointer text-black opacity-100`;

  // Use conditional rendering with proper JSX syntax
  if (isMarked) {
    return (
      <MarkedTile
        baseClass={baseClass}
        hdlOnClick={hdlOnClick}
        rowIndex={rowIndex}
        colIndex={colIndex}
      />
    );
  }

  if (isRevealed) {
    if (isBomb(rowIndex, colIndex)) {
      return (
        <BombTile
          baseClass={baseClass}
          hdlOnClick={hdlOnClick}
          rowIndex={rowIndex}
          colIndex={colIndex}
        />
      );
    }
    return (
      <div className="bg- w-10 rounded-md aspect-square flex items-center justify-center">
        <span className="font-bold text-white animate-fadeIn drop-shadow-lg text-glow">
          {board[rowIndex][colIndex] === 0 ? "" : board[rowIndex][colIndex]}
        </span>
      </div>
    );
  }

  return (
    <IdleTile
      baseClass={baseClass}
      hdlOnClick={hdlOnClick}
      rowIndex={rowIndex}
      colIndex={colIndex}
    />
  );
}
