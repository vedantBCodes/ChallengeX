import React, { useState, useEffect } from 'react';
import './fifteenPuzzle.css';

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider";
import { emailSend } from "../../EmailSend"; // ✅ Assuming you export it as a function
import {emailSendToUser} from  '../../EmailSendToUser';

function FifteenPuzzle() {
  const [buttons, setButtons] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(120);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();
const [authUser, setAuthUser] = useAuth();

const [emailSent, setEmailSent] = useState(false); // ✅ Prevent duplicate emails

useEffect(() => {
  if (win && authUser && !emailSent) {
    const taskName = "FifteenPuzzleGame";
    const msgForAdmin = `${authUser.fullname} has completed ${taskName} task and he/she won ₹18!`;
    const msgForUser = `You have completed ${taskName} task and won 18 rupees!`;

   emailSend(authUser.fullname,authUser.email,msgForAdmin,msgForUser,taskName,authUser.upiid); 
         emailSendToUser(authUser.fullname,authUser.email,msgForUser);
    setEmailSent(true); // ✅ Prevent future calls

    setTimeout(() => {
      navigate("/task");
    }, 5000);
  }
}, [win, authUser, emailSent, navigate]);

  useEffect(() => {
    if (gameStarted) {
      resetGame(); // Only shuffle and reset if game is starting
    }
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted || win || gameOver) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, win, gameOver]);

  const shuffleButtons = (btns) => {
    for (let i = btns.length - 2; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [btns[i], btns[j]] = [btns[j], btns[i]];
    }
    btns[15] = 16; // Empty tile in the last spot
    return [...btns];
  };

  const handleClick = (index) => {
    if (!gameStarted || win || gameOver) return;

    const emptyIndex = buttons.findIndex((btn) => btn === 16);
    const isValidMove = [index - 1, index + 1, index - 4, index + 4].includes(emptyIndex);

    if (isValidMove) {
      const newButtons = [...buttons];
      [newButtons[index], newButtons[emptyIndex]] = [newButtons[emptyIndex], newButtons[index]];
      setButtons(newButtons);
      setMoveCount((prev) => prev + 1);
      checkForWin(newButtons);
    }
  };

  const checkForWin = (btns) => {
    const isWin = btns.slice(0, 15).every((val, idx) => val === idx + 1);
    if (isWin) {
      setWin(true);
      setGameOver(false);
    }
  };

  const resetGame = () => {
    const initialButtons = Array.from({ length: 16 }, (_, i) => i + 1);
    const shuffledButtons = shuffleButtons(initialButtons);
    setButtons(shuffledButtons);
    setMoveCount(0);
    setWin(false);
    setTimer(120);
    // setWin(true);
    setGameOver(false);
  };

  if (!gameStarted) {
    return (
      <main className="puzzleMainContainer">
        <div className="puzzleRulesContainer">
          <h1>🧩 15 Puzzle Game - Rules</h1>
          <ul>
            <li>Rearrange the tiles from 1 to 15 by sliding them into the empty space.</li>
            <li>Only adjacent tiles (up, down, left, right) can be moved.</li>
            <li>Win by arranging all numbers in order before time runs out!</li>
            <li>You have <strong>120 seconds</strong> to complete the puzzle.</li>
          </ul>
          <button className="startGameBtn" onClick={() => setGameStarted(true)}>
            Start Game
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className='puzzleMainContainer'>
      <div className="puzzleContainer">
        
        <h1>15 Puzzle Game</h1>
        <p>Total Moves: {moveCount}</p>
        <p>Time Left: {timer}s</p>

        {win && <p className="winMessage">🎉 Congrats! You won!</p>}
        {gameOver && !win && <p className="loseMessage">⏰ Time's up! You lost the game.</p>}

        <div className="puzzleBtnContainer">
          {buttons.map((num, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={num === 16 ? 'hiddenBtn' : 'puzzleBtn'}
              disabled={num === 16}
              style={
                num !== 16 && num === index + 1
                  ? { border: '2px solid rgb(99, 99, 222)' }
                  : {}
              }
            >
              {num !== 16 ? num : ''}
            </button>
          ))}
        </div>
        {/* <button id="puzzleResetBtn" onClick={resetGame}>Reset</button> */}
      </div>
    </main>
  );
}

export default FifteenPuzzle;
