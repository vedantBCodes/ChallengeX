import React, { useState, useEffect, useRef } from "react";
import "./typingspeed.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider";
import { emailSend } from "../../EmailSend"; // ✅ Assuming you export it as a function
import {emailSendToUser} from  '../../EmailSendToUser';


const TypingSpeedTest = () => {
  const initialStatement =    "he turned in the research paper on friday otherwise he would have not passed the class";

  const [statement, setStatement] = useState(initialStatement);
  const [letterCnt, setLetterCnt] = useState(0);
  const letterCntRef = useRef(0); //  new ref for real-time count
  const [time, setTime] = useState(10);
  const [stopTime, setStopTime] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [startGame, setStartGame] = useState(false); // For tracking if the game has started
  const [gameResult, setGameResult] = useState(null); // Store game result (win/lose)
  
  const intervalRef = useRef(null);
  const navigate = useNavigate();
const [authUser, setAuthUser] = useAuth();
const [emailSent, setEmailSent] = useState(false);


  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          setStopTime(true);
          const speed = (letterCntRef.current / 10).toFixed(2); // ⬅️ using ref here
          setTypingSpeed(speed);
          if (statement.length === 0) {
            setGameResult("win");
            
          } else {
            setGameResult("lose");
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleTyping = (key) => {
  if (stopTime || gameResult) return;

  if (!timerStarted) {
    setTimerStarted(true);
    startTimer();
  }

  if (key === statement[0]) {
    setLetterCnt((prevCount) => prevCount + 1);
    letterCntRef.current += 1;
    const newStatement = statement.slice(1);
    setStatement(newStatement);

    // ✅ Check if it's the last correct letter
    if (newStatement.length === 0) {
      clearInterval(intervalRef.current); // stop timer
      const elapsed = 10 - time; // calculate time taken
      const speed = (letterCntRef.current / (elapsed || 1)).toFixed(2);
      setTypingSpeed(speed);
      setStopTime(true);
      setGameResult("win");
    }
  }
};

  useEffect(() => {
  if (gameResult === "win" && !emailSent && authUser) {
    const taskName = "TypingSpeedTest";
    const msgForAdmin = `${authUser.fullname} has completed ${taskName} task and he/she won ₹15!`;
    const msgForUser = `You have completed ${taskName} task and won ₹15!`;

    emailSend(authUser.fullname,authUser.email,msgForAdmin,msgForUser,taskName,authUser.upiid); 
    emailSendToUser(authUser.fullname,authUser.email,msgForUser);

    setEmailSent(true);

    setTimeout(() => {
      navigate("/task");
    }, 5000);
  }
}, [gameResult, emailSent, authUser, navigate]);


  const handleKeyDown = (e) => {
    handleTyping(e.key);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleStartClick = () => {
    setStartGame(true); // Start the game
  };

  const handleResetClick = () => {
    clearInterval(intervalRef.current);
    setStatement(initialStatement);
    setLetterCnt(0);
    letterCntRef.current = 0; // ⬅️ reset ref
    setTime(10);
    setStopTime(false);
    setTypingSpeed(null);
    setTimerStarted(false);
    setGameResult(null); // Reset the game result
    setStartGame(false); // Show rules again when reset
  };

  return (
    <main className="typingSpeedMainContainer">
    <div className="typingSpeedContainer">
      {!startGame ? (
        // Rules Subpage
        <div className="rulesPage">
          <h2>Typing Speed Test - Rules</h2>
          <ul>
            <li>Start typing as quickly as possible.</li>
            <li>You will have <strong>10 seconds</strong> to type.</li>
            <li>We will measure how many letters you can type in that time.</li>
            <li>After the timer runs out, your result will be shown.</li>
            <li>
              <b>Win Condition:</b> You win if you type the entire statement within the 10-second time limit.
            </li>
            <li>
              <b>Lose Condition:</b> You lose if the timer runs out before you complete typing the entire statement.
            </li>
          </ul>
          <button onClick={handleStartClick} className="startGameBtn">
            Start Game
          </button>
        </div>
      ) : (
        // Typing Speed Test Screen
        <div className="gameScreen">
          <h1>Typing Speed Test</h1>
          <p>
            <b>Start typing to measure your speed.</b> <br />
            You can type on your keyboard or use the virtual keyboard below.
          </p>

          <input
            type="text"
            readOnly
            value={statement}
            id="typingSpeedInput"
          />{" "}
          <br /> <br />

          <div className="typingSpeedBtnContainer">
            <div className="row">
              {"qwertyuiop".split("").map((btn, index) => (
                <button
                  key={index}
                  onClick={() => handleTyping(btn)}
                  className="typingSpeedBtn"
                >
                  {btn}
                </button>
              ))}
            </div>
            <div className="row">
              {"asdfghjkl".split("").map((btn, index) => (
                <button
                  key={index}
                  onClick={() => handleTyping(btn)}
                  className="typingSpeedBtn"
                >
                  {btn}
                </button>
              ))}
            </div>
            <div className="row">
              {"zxcvbnm".split("").map((btn, index) => (
                <button
                  key={index}
                  onClick={() => handleTyping(btn)}
                  className="typingSpeedBtn"
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>

          <div className="timeContainer">
            <h3 style={{ fontSize: "25px" }}>
              {stopTime
                ? `Typing speed: ${typingSpeed} lps (letters per second)`
                : `${time} seconds left`}
            </h3>
          </div>
        </div>
      )}

      {/* Game Result */}
      {gameResult && (
        <div className="resultMessage">
          {gameResult === "win" ? (
            <p style={{ color: "green", fontSize: "18px" }}>
              🎉 You win! You typed all the words within the time limit.
            </p>
          ) : (
            <p style={{ color: "black", fontSize: "18px" }}>
              😓 You lost. You didn't finish in time.
            </p>
          )}
        </div>
      )}
    </div>
    </main>
  );
};

export default TypingSpeedTest;
