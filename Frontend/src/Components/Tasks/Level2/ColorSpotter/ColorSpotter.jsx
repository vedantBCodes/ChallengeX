import React, { useEffect, useState } from "react";
import "./colorSpotter.css";
import { emailSend } from "../../EmailSend"; // ✅ Assuming you export it as a function
import {emailSendToUser} from  '../../EmailSendToUser';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider";

const ColorSpotter = () => {
  const [gridSize, setGridSize] = useState(3);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(localStorage.getItem("maxScore5") || 0);
  const [uniqueIndex, setUniqueIndex] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [baseColor, setBaseColor] = useState(getRandomRGBColor());
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameResult, setGameResult] = useState(null); // "win" | "lose" | null
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  

  useEffect(() => {
    localStorage.setItem("maxScore5", maxScore);
    if (gameStarted) generateGrid(gridSize);
  }, [maxScore, gridSize, gameStarted]);

  // Handle timer countdown
  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0 && !isShaking) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    // Stop the timer and end the game immediately when shaking starts
    if (isShaking) {
      clearInterval(timer); // Stop timer immediately
      setGameResult("lose"); // Immediately set game result to "lose"
      setGameStarted(false); // Stop the game
    }

    if (gameStarted && timeLeft === 0) {
      if (score > 3) {
        setGameResult("win");
        const taskName="ColorSpotter";
        const msgForAdmin=`${authUser.fullname} has completed ${taskName} task and he/she won ₹12!`;
        const msgForUser=`You have completed ${taskName} task and won 12 rupees!`
        emailSend(authUser.fullname,authUser.email,authUser.upiid,msgForUser,msgForAdmin,taskName); 
        emailSendToUser(authUser.fullname,authUser.email,msgForUser,taskName); 
        setEmailSent(true); //  prevent future calls
        setTimeout(() => {
          navigate("/task");
        }, 5000);
      } else {
        setGameResult("lose");
      }

      if (score > maxScore) setMaxScore(score);
      setGameStarted(false);
    }

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [gameStarted, timeLeft, isShaking]);

  const generateGrid = (size) => {
    setUniqueIndex(Math.floor(Math.random() * (size * size)));
    setBaseColor(getRandomRGBColor());
  };

  const handleBoxClick = (index) => {
    if (index === uniqueIndex) {
      setScore((prev) => prev + 1); // Increment score only if correct box is clicked
      setGridSize((prev) => prev + 1); // Increase grid size on correct click
      generateGrid(gridSize + 1); // Generate new grid
    } else {
      setIsShaking(true); // Trigger shake animation
      setTimeout(() => setIsShaking(false), 1000); // Reset shaking state after 1 second
      if (score > maxScore) setMaxScore(score); // Update max score if necessary
    }
  };

  const handleStart = () => {
    setScore(0); // Reset score when starting the game
    setGridSize(3); // Reset grid size to 3
    setTimeLeft(10); // Reset time left to 20 seconds
    setGameResult(null); // Reset game result
    setGameStarted(true); // Start the game
  };

  // Win or Lose screen (without Play Again button)
  if (gameResult) {
    return (
      <div className="resultScreen">
        <h1>{gameResult === "win" ? "🎉 You Win!" : "😢 You Lose!"}</h1>
        <p>{gameResult === "win"
          ? "Nice spotting! You scored more than 10 in under 20 seconds!"
          : "Wrong click or time's up! Try again later."}
        </p>
        <p>Your Score: {score}</p>
      </div>
    );
  }

  // Start screen
  if (!gameStarted) {
    return (
      <div className="startScreen">
        <h1>Welcome to Color Spotter!</h1>
        <p><strong>Rules:</strong></p>
        <ul style={{ textAlign: 'left' }}>
          <li>One box in the grid has a slightly different shade.</li>
          <li>Click the different box to level up.</li>
          <li>Wrong click ends the game immediately.</li>
          <li>You have 20 seconds to score as high as you can.</li>
          <li><strong>Win:</strong> Score more than 10 in the first 20 seconds.</li>
        </ul>
        <button className="colorSpotterStartButton" onClick={handleStart}>Start Game</button>
      </div>
    );
  }

  return (
    <div className="colorSpotterContainer">
      <div className="colorSpotterScore">
        <h1>Color Spotter</h1>
        <span id="score">Score: {score}</span>
        <span id="timer">Time Left: {timeLeft}s</span>
      </div>

      <div
        className={`mainBox ${isShaking ? "shake" : ""}`}
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const isUnique = index === uniqueIndex;
          return (
            <button
              key={index}
              style={{
                backgroundColor: baseColor,
                opacity: isUnique ? 0.85 : 1,
              }}
              onClick={() => handleBoxClick(index)}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

// Generate random RGB color
const getRandomRGBColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

export default ColorSpotter;
