import React, { useState, useEffect } from 'react';
import './fifteenPuzzle.css';

function FifteenPuzzle() {
  const [buttons, setButtons] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [win, setWin] = useState(false);

  // Initialize buttons for the puzzle grid (1 to 15) and an empty space at the last position
  useEffect(() => {
    resetGame();
  }, []);

  // Shuffle buttons and ensure the empty tile is always at the last position
  const shuffleButtons = (btns) => {
    for (let i = btns.length - 2; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [btns[i], btns[j]] = [btns[j], btns[i]];
    }
    btns[15] = 16; // Ensure the empty tile stays in the last position
    return [...btns];
  };

  const handleClick = (index) => {
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
    }
  };

  const resetGame = () => {
    const initialButtons = Array.from({ length: 16 }, (_, i) => i + 1);
    const shuffledButtons = shuffleButtons(initialButtons);
    setButtons(shuffledButtons);
    setMoveCount(0);
    setWin(false);
  };

  return (
    <main>
    <div className="puzzleContainer">
      <h1>15 Puzzle Game</h1>
      <p>Total Moves: {moveCount}</p>
      {win && <p className="winMessage">Congrats! You won!</p>}
      <div className="puzzleBtnContainer">
        {buttons.map((num, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={num === 16 ? 'hiddenBtn' : 'puzzleBtn'}
            disabled={num === 16}
            style={num !== 16 && num === index + 1 ? { border: '2px solid rgb(99, 99, 222)' } : {}}
          >
            {num !== 16 ? num : ''}
          </button>
        ))}
      </div>
      <button id="puzzleResetBtn" onClick={resetGame}>Reset</button>
    </div>
    </main>
  );
}

export default FifteenPuzzle;
