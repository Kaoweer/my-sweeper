import React from "react";

export default function Tile(props) {
  const { rowIndex, colIndex,hdlReveal, bombLocation, isBomb, board,revealed } = props;

  const isRevealed = revealed.has(`${rowIndex},${colIndex}`)
  const baseClass = `w-10 aspect-square bg-slate-300 flex items-center justify-center hover:bg-slate-200 cursor-pointer`

  return (
    <div onClick={() => hdlReveal(rowIndex,colIndex)} key={`${rowIndex}-${colIndex}`} className={!isRevealed ? baseClass : isBomb(rowIndex,colIndex) ? `bg-red-400` :``}>
      {isRevealed && board[rowIndex][colIndex] !== 0 ? board[rowIndex][colIndex] : null}
    </div>
  );
}
