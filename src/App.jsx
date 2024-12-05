import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GameBoard from "./components/GameBoard";
import Minesweeper from "./page/Minesweeper";
import PageLayout from "./Layout/PageLayout";

function App() {
  return (
    <>
      <PageLayout/>
    </>
  );
}

export default App;
