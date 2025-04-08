import React, { useState, useEffect } from "react";
import "./memorygame.css";

const MemoryGame = () => {
  const [start, setStart] = useState(false);
  const [gridSize, setGridSize] = useState(3);
  const [coloredBoxCount, setColoredBoxCount] = useState(3);
  const [coloredBoxIndexes, setColoredBoxIndexes] = useState([]);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [gamePhase, setGamePhase] = useState("showing");
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(25);
  const [gameWon, setGameWon] = useState(false);
  const [gameOverReason, setGameOverReason] = useState(null); // 'time' | 'lives'

  // Handle timer countdown
  useEffect(() => {
    if (!start || gameWon || lives <= 0 || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameOverReason("time");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start, gameWon, lives, timer]);

  // Setup level
  useEffect(() => {
    if (!start || gameWon || lives <= 0 || timer <= 0) return;

    const totalBoxes = gridSize * gridSize;
    const randomIndexes = new Set();
    while (randomIndexes.size < coloredBoxCount) {
      randomIndexes.add(Math.floor(Math.random() * totalBoxes));
    }

    setColoredBoxIndexes([...randomIndexes]);
    setSelectedBoxes([]);
    setGamePhase("showing");

    const timeout = setTimeout(() => setGamePhase("playing"), 2000);
    return () => clearTimeout(timeout);
  }, [level, start]);

  const handleBoxClick = (index) => {
    if (gamePhase !== "playing" || gameWon || lives <= 0 || timer <= 0) return;

    if (coloredBoxIndexes.includes(index)) {
      if (!selectedBoxes.includes(index)) {
        const newSelection = [...selectedBoxes, index];
        setSelectedBoxes(newSelection);

        if (newSelection.length === coloredBoxCount) {
          setTimeout(() => {
            if (level >= 5) {
              setGameWon(true);
            } else {
              setGridSize((prev) => prev + 1);
              setColoredBoxCount((prev) => prev + 1);
              setLevel((prev) => prev + 1);
            }
          }, 500);
        }
      }
    } else {
      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) setGameOverReason("lives");
        return newLives;
      });
    }
  };



  // Show rules screen
  if (!start) {
    return (
      <main className="memoryGameMainContainer">
        <div className="rulesPage">
          <h2>🧠 Memory Game Rules</h2>
          <ul>
            <li>You will see some colored boxes for 2 seconds.</li>
            <li>Then try to click the same boxes from memory.</li>
            <li>Each level adds more boxes and increases difficulty.</li>
            <li>You have 3 lives. One wrong click = one life lost.</li>
            <li>Win by completing level 5 within 20 seconds!</li>
          </ul>
          <button className="startGameBtn" onClick={() => setStart(true)}>
            Start Game
          </button>
        </div>
      </main>
    );
  }

  const renderEndMessage = () => {
    if (gameWon) {
      return (
        <>
          <h2 style={{ color: "green", marginTop: "20px" }}>🎉 You Win!</h2>
          <p>You've successfully completed all 5 levels!</p>
        </>
      );
    }

    if (gameOverReason === "time") {
      return (
        <>
          <h2 style={{ color: "red", marginTop: "20px" }}>⏰ Time’s up!</h2>
          <p>You ran out of time before finishing the game.</p>
        </>
      );
    }

    if (gameOverReason === "lives") {
      return (
        <>
          <h2 style={{ color: "red", marginTop: "20px" }}>💥 Game Over!</h2>
          <p>You lost all your lives.</p>
        </>
      );
    }

    return null;
  };

  const gameEnded = gameWon || lives <= 0 || timer <= 0;

  return (
    <main className="memoryGameMainContainer">
      <h1>Memory Game</h1>
      <div className="infoBar">
        <p>Level: {level}</p>
        <p>Lives: {lives}</p>
        <p>Time Left: {timer}s</p>
      </div>

      {gameEnded ? (
        <div>
          {renderEndMessage()}
          {/* <button onClick={restartGame} id="memoryGameBtn">
            Play Again
          </button> */}
        </div>
      ) : (
        <div
          className="memoryGameGridContainer"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, index) => (
            <div
              key={index}
              className={`memoryGameBox ${
                gamePhase === "showing" && coloredBoxIndexes.includes(index)
                  ? "colored"
                  : selectedBoxes.includes(index)
                  ? "correct"
                  : ""
              }`}
              onClick={() => handleBoxClick(index)}
            ></div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MemoryGame;
