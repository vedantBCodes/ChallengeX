import React, { useState, useEffect } from "react";
import "./WordSearch.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emailSend } from "../../EmailSend"; // ✅ Assuming you export it as a function
import { useAuth } from "../../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
const grid = [
  ["S", "C", "O", "D", "E"],
  ["M", "H", "T", "M", "L"],
  ["A", "N", "Z", "Y", "P"],
  ["R", "M", "A", "P", "P"],
  ["T", "J", "A", "V", "A"],
];

const wordsToFind = ["CODE", "APPLE", "JAVA", "SMART", "HTML"];

const WordSearch = () => {
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [time, setTime] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [showGame, setShowGame] = useState(false); // Toggle between Rules and Game
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
<<<<<<< HEAD
  const [emailSent, setEmailSent] = useState(false);
  const [resultMsg, setResultMsg] = useState("");
=======

>>>>>>> a8b0efa49977b26a23fff21bf973ec6249dd6883

  useEffect(() => {
    if (foundWords.length === wordsToFind.length) {
      setGameOver(true);
<<<<<<< HEAD
      setResultMsg("win"); // 👈 set result message to "win"
=======
>>>>>>> a8b0efa49977b26a23fff21bf973ec6249dd6883
      return;
    }
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameOver(true);
        }
        return prevTime > 0 ? prevTime - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [foundWords]);
<<<<<<< HEAD
  
=======

>>>>>>> a8b0efa49977b26a23fff21bf973ec6249dd6883
  const checkWord = (selection) => {
    const word = selection.map((cell) => cell.letter).join("");
    if (foundWords.includes(word)) {
      toast.info(`"${word}" has already been found!`, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      setSelectedCells([]);
      return false;
    }
    return wordsToFind.includes(word);
  };

  const handleCellClick = (row, col) => {
    if (gameOver) return;

    const newSelection = [
      ...selectedCells,
      { row, col, letter: grid[row][col] },
    ];
    setSelectedCells(newSelection);

    if (checkWord(newSelection)) {
      setFoundWords([
        ...foundWords,
        newSelection.map((cell) => cell.letter).join(""),
      ]);
      setSelectedCells([]);
    }
  };

  const cancelWordSelection = () => {
    setSelectedCells([]);
  };

  const startGame = () => {
    setShowGame(true);
    setSelectedCells([]);
    setFoundWords([]);
    setTime(30);
    setGameOver(false);
  };
  useEffect(() => {
<<<<<<< HEAD
      if (gameOver && resultMsg === "win" && ! emailSent) {
        const taskName="WordSearch";
        const msgForAdmin=`${authUser.fullname} has completed ${taskName} task and he/she won ₹12!`;
        const msgForUser=`You have completed GuessingGame task and won 12 rupees!`
        emailSend(authUser.fullname,authUser.email,authUser.upiid,msgForUser,msgForAdmin,taskName); 
        // setEmailSent(true); // 👈 prevent future calls
        setTimeout(() => {
          navigate("/task");
        }, 5000);
      }
    }, [gameOver, resultMsg, emailSent]);
    
=======
    if (gameOver && time !== 0) {
      const msg=`${authUser.fullname} has completed WordSearch task and he/she won ₹12!`;
      emailSend(authUser.fullname,authUser.email,authUser.upiid,msg); 
      setTimeout(() => {
        navigate("/task");
      }, 5000);
    }
  }, [gameOver, time]);
>>>>>>> a8b0efa49977b26a23fff21bf973ec6249dd6883
  return (
    <main className="wordSearchMainContainer">
      <ToastContainer />
      {!showGame ? (
        <div
          className="rulesPage"
          style={{ textAlign: "center", padding: "20px" }}
        >
          <h1>Rules of the Game</h1>
          <ul
            style={{
              textAlign: "left",
              maxWidth: "500px",
              margin: "0 auto",
              fontSize: "18px",
            }}
          >
            <li>Find 5 hidden words in 30 seconds.</li>
            <li>Click letters in order to form a word.</li>
            <li>Click "Cancel" to deselect current letters.</li>
            <li>Each correct word is counted once only.</li>
          </ul>
          <br />
          <button
            onClick={startGame}
            style={{
              padding: "10px 25px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Start the Game
          </button>
        </div>
      ) : (
        <div className="word-search-container">
          <h1 style={{ color: "blue" }}>Word Search Game</h1>
          <p style={{ fontSize: "20px", color: "green" }}>
            Find 5 hidden words in 30 seconds
          </p>
          {gameOver ? (
            time === 0 ? (
              <h2>Game Over! Time's up!</h2>
<<<<<<< HEAD
            ) : 
            (
             
              <h2>Congratulations! You found all words!</h2>
            )
            
=======
            ) : (
              <h2>Congratulations! You found all words!</h2>
            )
>>>>>>> a8b0efa49977b26a23fff21bf973ec6249dd6883
          ) : (
            <h2>Time Left: {time} sec</h2>
          )}
          <div className="wordSearchGrid">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="wordSearchRow">
                {row.map((letter, colIndex) => (
                  <button
                    key={colIndex}
                    className={`wordSearchCell ${
                      selectedCells.some(
                        (c) => c.row === rowIndex && c.col === colIndex
                      )
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="words-found">
            <h4 style={{ color: "rgb(107, 108, 108)" }}>
              Words Found: {foundWords.length} / 5
            </h4>
            <ul>
              <li>
                {foundWords.map((word, index) => (
                  <span key={index}>{word}&nbsp;&nbsp;</span>
                ))}
              </li>
            </ul>
          </div>
          <button onClick={cancelWordSelection} className="cancel-word-button">
            Cancel Selected letters
          </button>
        </div>
      )}
    </main>
  );
};

export default WordSearch;
