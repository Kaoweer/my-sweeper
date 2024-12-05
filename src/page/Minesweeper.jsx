import React from "react";
import GameBoard from "../components/GameBoard";

export default function Minesweeper() {
  return (
    <div className="flex flex-col gap-4 p-8 font-bebas">
      <h1 className="text-6xl font-extrabold text-white text-center">Mine (my) sweeper💣</h1>
      <p className="text-white text-center text-lg">
        Minesweeper game made from scratch! | Left click : reveal tiles, | middle
        mouse click : mark bombs
      </p>
      <div className="mx-auto w-fit">
        <GameBoard />
      </div>
    </div>
  );
}
