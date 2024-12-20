import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { heartMatrix } from "../assets/heart";

export default function GameBoard() {
  const [dimension, setDimension] = useState(9);
  const [bombLocation, setBombLocation] = useState([]);
  const [board, setBoard] = useState(
    Array(dimension)
      .fill()
      .map(() => Array(dimension).fill(0))
  );
  const [revealed, setRevealed] = useState(new Set());
  const [marked, setMarked] = useState(new Set());
  const [bombAmount, setBombAmount] = useState(null);
  const [flagUsed, setFlagUsed] = useState(0);
  const [special, setSpecial] = useState(false);
  const [gameStatus, setGameStatus] = useState(null);
  const [score, setScore] = useState(0);

  const endGame = (status) => {
    setGameStatus(status);
    const allTiles = new Set();
    for (let r = 0; r < dimension; r++) {
      for (let c = 0; c < dimension; c++) {
        allTiles.add(`${r},${c}`);
      }
    }
    setRevealed(allTiles);
  };

  const handleSizeChange = (e, newSize) => {
    setGameStatus(null);
    setDimension(newSize);
    setRevealed(new Set());
    setMarked(new Set());
    setFlagUsed(0);
    setBoard(
      Array(newSize)
        .fill()
        .map(() => Array(newSize).fill(0))
    );
    bombPlacement()
    if (e.target.name === "fame") {
      setSpecial(true);
    } else {
      setSpecial(false);
    }
  };
  useEffect(() => {
    if (score === bombAmount && revealed.size === (dimension*dimension)-bombAmount) {
      endGame("win");
    }
  }, [score, revealed, bombAmount, dimension]);
  const hdlOnClick = (e, row, col) => {
    const isMarked = marked.has(`${row},${col}`);
    if (e.button === 1) {
      hdlFlagPlacement(row, col);
      console.log(score, bombAmount);
    } else if (e.button === 0) {
      if (isMarked) {
        return;
      }
      hdlReveal(row, col);
    }
  };

  const hdlFlagPlacement = (row, col) => {
    const key = `${row},${col}`;
    if (marked.has(key)) {
      if (isBomb(row, col)) {
        setScore((prv) => prv - 1);
      }
      setFlagUsed((prv) => prv - 1);
      setMarked((prv) => {
        const newMark = new Set(prv);
        newMark.delete(key);
        return newMark;
      });
    } else {
      if (flagUsed + 1 > bombAmount) {
        return;
      }
      if (isBomb(row, col)) {
        setScore((prv) => prv + 1);
      }
      setFlagUsed((prv) => prv + 1);
      setMarked((prv) => {
        const newMark = new Set(prv);
        newMark.add(key);
        return newMark;
      });
    }
  };

  const hdlReveal = (row, col) => {
    if (isBomb(row, col)) {
      endGame("lose");
      return;
    }
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
        [curRow - 1, curCol - 1],
        [curRow - 1, curCol + 1],
        [curRow + 1, curCol - 1],
        [curRow + 1, curCol + 1],
      ];
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

  const bombPlacement = () => {
    const bombCount = Math.floor(dimension * dimension * 0.15);
    const randomizedNumber = () => Math.floor(Math.random() * dimension);
    let bombLeft = bombCount;
    let bombSet = new Set();

    if (special) {
      bombSet = heartMatrix();
      setBombAmount(93);
    } else {
      setBombAmount(bombLeft);

      while (bombLeft > 0) {
        const row = randomizedNumber();
        const col = randomizedNumber();

        if (bombSet.has(`${row},${col}`)) {
          continue;
        }
        bombSet.add(`${row},${col}`);
        const newBoard = [...board];
        newBoard[row][col] = "💣";
        bombLeft -= 1;
      }
    }
    let generatedBomb = Array.from(bombSet).map((str) => {
      const strArray = str.split(",");
      const [row, col] = strArray;
      return [+row, +col];
    });
    setBombLocation(generatedBomb);
    return generatedBomb;
  };

  const hdlResetGame = (e) => {
    handleSizeChange(e, dimension);
    setScore(0)
    setGameStatus(null);
    bombPlacement();
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
    const preventMiddleClick = (e) => {
      if (e.button === 1) {
        e.preventDefault();
      }
    };

    document.addEventListener("mousedown", preventMiddleClick);

    return () => {
      document.removeEventListener("mousedown", preventMiddleClick);
    };
  }, []);

  useEffect(() => {
    bombPlacement();
  }, [dimension]);

  useEffect(() => {
    for (const [row, col] of bombLocation) {
      numTagPlacement(row, col);
    }
  }, [bombLocation]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <button
          className="px-4 py-2 w-[100px] transition-all border text-white rounded-full hover:bg-blue-600"
          onClick={(e) => handleSizeChange(e, 9)}
        >
          9x9
        </button>
        <button
          className="px-4 py-2 w-[100px] transition-all border text-white rounded-full hover:bg-blue-600"
          onClick={(e) => handleSizeChange(e, 16)}
        >
          16x16
        </button>
        <button
          className="px-4 py-2 w-[100px] transition-all border text-white rounded-full hover:bg-blue-600"
          onClick={(e) => handleSizeChange(e, 24)}
        >
          24x24
        </button>
        <button
          className="px-4 py-2 w-[100px] transition-all border text-white rounded-full hover:bg-blue-600"
          onClick={(e) => handleSizeChange(e, 24)}
          name="fame"
        >
          For fame
        </button>
      </div>
      <div
        style={{ gridTemplateColumns: `repeat(${dimension}, minmax(0, 1fr))` }}
        className="border-gray-700 border-4 grid shadow-lg gap-1 w-fit bg-gray-800 p-3 rounded-lg"
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Tile
              hdlOnClick={hdlOnClick}
              marked={marked}
              bombLocation={bombLocation}
              revealed={revealed}
              isBomb={isBomb}
              hdlReveal={hdlReveal}
              board={board}
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              gameStatus={gameStatus}
            />
          ))
        )}
      </div>
      <div className="fixed bottom-4 right-4 text-4xl bg-white bg-opacity-25 rounded-full p-4  text-white">
        🚩: {flagUsed}/{bombAmount}
      </div>
      {gameStatus === "win" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Congratulations!
            </h2>
            <p className="text-gray-700 mb-4">You've won the game!</p>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={hdlResetGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Lose Modal */}
      {gameStatus === "lose" && (
        <div className="fixed z-100 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Game Over!</h2>
            <p className="text-gray-700 mb-4">Better luck next time!</p>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={hdlResetGame}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
