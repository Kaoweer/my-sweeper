import React, { useEffect, useState } from "react";
import Tile from "./Tile";

export default function GameBoard() {
  const [dimension, setDimension] = useState(9);
  const [bombLocation, setBombLocation] = useState([]);
  const [board, setBoard] = useState(
    Array(dimension)
      .fill()
      .map(() => Array(dimension).fill(0))
  );
  const [revealed, setRevealed] = useState(new Set());

  const hdlReveal = (row, col) => {
    if (isBomb(row,col)){
      alert('you lose')
    }
    // do bfs finds all adj 0s
    const openedTile = bfs(row, col);
    setRevealed((prev) => {
      const newRevealed = new Set(prev);
      openedTile.forEach(([r, c]) => newRevealed.add(`${r},${c}`));
      return newRevealed;
    });
  };
  

  const bfs = (r, c) => {
    let visited = new Set([`${r},${c}`]);
    let queue = [[r, c]];
    if (board[r][c] !== 0) {
      return [[r, c]];
    }

    while (queue.length > 0) {
      const [curRow, curCol] = queue.shift();
      const adjTile = [
        [curRow - 1, curCol],
        [curRow, curCol - 1],
        [curRow, curCol + 1],
        [curRow + 1, curCol],
        [curRow - 1, curCol - 1], // Add diagonal neighbors
        [curRow - 1, curCol + 1],
        [curRow + 1, curCol - 1],
        [curRow + 1, curCol + 1],
      ];
      // console.log(adjTile)
      for (const [neiRow, neiCol] of adjTile) {
        if (
          neiRow < 0 ||
          neiRow >= dimension ||
          neiCol < 0 ||
          neiCol >= dimension
        ) {
          continue;
        }
        const key = `${neiRow},${neiCol}`;
        if (!visited.has(key)) {
          visited.add(key);
          if (board[neiRow][neiCol] === 0) {
            queue.push([neiRow, neiCol]);
          }
        }  
      }
    }
    const res = Array.from(visited).map((str) => str.split(",").map(Number));
    return res;
  };

  const isBomb = (rowIndex, colIndex) => {
    return bombLocation.some(
      ([row, col]) => row === rowIndex && col === colIndex
    );
  };

  const bombPlacement = (amount) => {
    const randomizedNumber = () => Math.floor(Math.random() * dimension);
    let bombSet = new Set();
    let bombLeft = amount;

    while (bombLeft > 0) {
      const row = randomizedNumber();
      const col = randomizedNumber();

      if (bombSet.has(`${row},${col}`)) {
        continue;
      }
      bombSet.add(`${row},${col}`);
      const newBoard = [...board]
      newBoard[row][col] = '💣'
      bombLeft -= 1;
    }
    let generatedBomb = Array.from(bombSet).map((str) => {
      const strArray = str.split(",");
      const [row, col] = strArray;
      return [+row, +col];
    });
    setBombLocation(generatedBomb);
    return generatedBomb;
  };
  const numTagPlacement = (row, col) => {
    const newBoard = [...board];
    for (let r = row - 1; r < row + 2; r++) {
      for (let c = col - 1; c < col + 2; c++) {
        if (
          (r === row && c === col) ||
          isBomb(r, c) ||
          r < 0 ||
          r >= dimension ||
          c < 0 ||
          c >= dimension
        ) {
          continue;
        }
        newBoard[r][c] += 1;
      }
    }
    setBoard(newBoard);
  };

  useEffect(() => {
    bombPlacement(10);
  }, []);
  useEffect(() => {
    for (const [row, col] of bombLocation) {
      numTagPlacement(row, col);
    }
  }, [bombLocation]);

  return (
    <div className={`grid grid-cols-9 gap-1 w-fit bg-slate-400 p-0.5`}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Tile
            bombLocation={bombLocation}
            revealed={revealed}
            isBomb={isBomb}
            hdlReveal={hdlReveal}
            board={board}
            key={`${rowIndex}-${colIndex}`}
            rowIndex={rowIndex}
            colIndex={colIndex}
          />
        ))
      )}
    </div>
  );
}
