import React, { useState } from "react";
import SudokuGrid from "./SudukuGrid.jsx";
import "./suduko.css";

const Suduko = () => {
  const initialBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [gameStarted, setGameStarted] = useState(false);

  const handleInputChange = (row, col, value) => {
    const updatedBoard = [...board];
    updatedBoard[row][col] = value === "" ? 0 : parseInt(value, 10);
    setBoard(updatedBoard);
  };

  const checkSolution = () => {
    alert(isSudokuSolved(board) ? "✅ Sudoku Solved!" : "❌ Not Yet Solved.");
  };

  const isSudokuSolved = (grid) => {
    return !grid.some(row => row.includes(0));
  };

  if (!gameStarted) {
    return (
      <div className="mainContainer">
        <div className="rulesContainer">
          <h2>🧩 Sudoku Rules</h2>
          <ul>
            <li>Each row must contain numbers from 1 to 9 with no repetition.</li>
            <li>Each column must also contain numbers from 1 to 9 without duplicates.</li>
            <li>Each 3x3 grid must contain the numbers 1 through 9.</li>
            <li>Fill in all the missing numbers correctly to solve the puzzle.</li>
          </ul>
          <button className="startBtn" onClick={() => setGameStarted(true)}>
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mainContainer">
      <div className="sudukuContainer">
        <h1>Sudoku Game</h1>
        <SudokuGrid board={board} handleInputChange={handleInputChange} />
        <div className="buttons">
          <button onClick={checkSolution}>Check Solution</button>
        </div>
      </div>
    </div>
  );
};

export default Suduko;
