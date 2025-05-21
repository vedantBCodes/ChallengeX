import React, { useState, useEffect } from "react";
import SudokuGrid from "./SudukuGrid.jsx";
import "./suduko.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider";
import { emailSend } from "../../EmailSend"; // ✅ Assuming you export it as a function
import {emailSendToUser} from  '../../EmailSendToUser';

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
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();
  const [emailSent, setEmailSent] = useState(false);



  useEffect(() => {
  if (win && !emailSent) {
    const taskName = "Sudoku";
    const msgForAdmin = `${authUser.fullname} has completed ${taskName} task and he/she won ₹18!`;
    const msgForUser = `You have completed ${taskName} task and won 18 rupees!`;

    emailSend(authUser.fullname, authUser.email, authUser.upiid, msgForUser, msgForAdmin, taskName);
    emailSendToUser(authUser.fullname, authUser.email, msgForUser, taskName);

    setEmailSent(true); // ✅ Prevent future sends

    setTimeout(() => {
      navigate("/task");
    }, 5000);
  }
}, [win, emailSent, authUser, navigate]);


  useEffect(() => {
    let interval;
    if (gameStarted && !gameOver && !win) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, win]);

  const handleInputChange = (row, col, value) => {
    const updatedBoard = [...board];
    updatedBoard[row][col] = value === "" ? 0 : parseInt(value, 10);
    setBoard(updatedBoard);
  };

const isSudokuSolved = (grid) => {
  const isValidGroup = (group) => {
    const nums = group.filter(n => n !== 0);
    return nums.length === 9 && new Set(nums).size === 9 && nums.every(n => n >= 1 && n <= 9);
  };

  // Check rows
  for (let row = 0; row < 9; row++) {
    if (!isValidGroup(grid[row])) return false;
  }

  // Check columns
  for (let col = 0; col < 9; col++) {
    const column = grid.map(row => row[col]);
    if (!isValidGroup(column)) return false;
  }

  // Check 3x3 blocks
  for (let blockRow = 0; blockRow < 3; blockRow++) {
    for (let blockCol = 0; blockCol < 3; blockCol++) {
      const block = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          block.push(grid[blockRow * 3 + i][blockCol * 3 + j]);
        }
      }
      if (!isValidGroup(block)) return false;
    }
  }

  return true;
};


  const checkSolution = () => {
    if (gameOver) {
      alert("❌ Time's up! You can't check the solution anymore.");
      return;
    }
    const solved = isSudokuSolved(board);
    if (solved) {
      setWin(true);
      alert("✅ Sudoku Solved!");
    } else {
      alert("❌ Not Yet Solved.");
    }
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
            <li>You have <strong>3 minutes</strong> to complete the puzzle.</li>
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
        <p>⏳ Time Left: {timer}s</p>
        {gameOver && !win && <p className="loseMessage">❌ Time's up! You lost the game.</p>}
        {win && <p className="winMessage">🎉 You solved it!</p>}
        <SudokuGrid board={board} handleInputChange={handleInputChange} />
        <div className="buttons">
          <button onClick={checkSolution} disabled={gameOver || win}>
            Check Solution
          </button>
        </div>
      </div>
    </div>
  );
};

export default Suduko;
