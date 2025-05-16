import React, { useEffect, useState } from 'react';
import './matchpair.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider";
import { emailSend } from "../../EmailSend"; // ✅ Assuming you export it as a function
import {emailSendToUser} from  '../../EmailSendToUser';

const symbolsSet1 = ['🍇', '🍉', '🚗', '🍌', '🏠', '🥭', '🍎', '🐯', '🍇', '🍉', '🚗', '🍌', '🏠', '🥭', '🍎', '🐯'];
const symbolsSet2 = ['🍒', '🍓', '🐵', '🥝', '🍿', '🏀', '🎱', '🐻', '🍒', '🍓', '🐵', '🥝', '🍿', '🏀', '🎱', '🐻'];
const symbolsSet3 = ['🍜', '🍢', '🎓', '🍤', '🦀', '🍦', '🍩', '🎂', '🍜', '🍢', '🎓', '🍤', '🦀', '🍦', '🍩', '🎂'];

function MatchPair() {
  const [symbols, setSymbols] = useState([]);
  const [attemptCount, setAttemptCount] = useState(0);
  const [buttonsState, setButtonsState] = useState([]);
  const [preIndex, setPreIndex] = useState(null);
  const [matchCount, setMatchCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [timer, setTimer] = useState(30);
  const [timerId, setTimerId] = useState(null);
  const [loseReason, setLoseReason] = useState(null); // NEW
const navigate = useNavigate();
const [authUser, setAuthUser] = useAuth();
const [gameCompleted, setGameCompleted] = useState(false);


const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      setRandomSymbols();
      startTimer();
    }
  }, [gameStarted]);

  useEffect(() => {
    if (symbols.length > 0) shuffleAndSetValues();
  }, [symbols]);

  const getRandomSymbols = () => {
    const randomSet = Math.floor(Math.random() * 3) + 1;
    return randomSet === 1 ? symbolsSet1 : randomSet === 2 ? symbolsSet2 : symbolsSet3;
  };

  const setRandomSymbols = () => {
    setSymbols(getRandomSymbols());
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffleAndSetValues = () => {
    const shuffledSymbols = shuffleArray([...symbols]);
    const initialButtonsState = shuffledSymbols.map((symbol) => ({
      symbol,
      revealed: false,
      matched: false,
    }));
    setButtonsState(initialButtonsState);
    setAttemptCount(0);
    setPreIndex(null);
    setMatchCount(0);
    setGameOver(false);
    setGameResult(null);
    setLoseReason(null);
    setTimer(30);
  };

  const handleButtonClick = (index) => {
    if (gameOver) return;

    const newButtonsState = [...buttonsState];
    if (newButtonsState[index].matched || newButtonsState[index].revealed) return;

    newButtonsState[index].revealed = true;

    if (preIndex !== null) {
      const prevIndex = preIndex;
      if (newButtonsState[index].symbol === newButtonsState[prevIndex].symbol) {
        newButtonsState[index].matched = true;
        newButtonsState[prevIndex].matched = true;
        setMatchCount((prev) => prev + 1);
      } else {
        setTimeout(() => {
          newButtonsState[index].revealed = false;
          newButtonsState[prevIndex].revealed = false;
          setButtonsState([...newButtonsState]);
        }, 1000);
      }
      setPreIndex(null);
      setAttemptCount((prev) => prev + 1);
    } else {
      setPreIndex(index);
    }

    setButtonsState([...newButtonsState]);
  };

  const startTimer = () => {
    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(id);
          setGameOver(true);
          setGameResult('lose');
          setLoseReason('time'); // Set reason
        }
        return prev - 1;
      });
    }, 1000);
    setTimerId(id);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

 useEffect(() => {
  if (!gameStarted || gameCompleted || symbols.length === 0) return;
  // Lose by attempts
  if (attemptCount >= 10 && matchCount < symbols.length / 2) {
    setGameResult('lose');
    setGameOver(true);
    setLoseReason('attempts');
    clearInterval(timerId);
    setGameCompleted(true);
    return;
  }

  // Win condition
  if (matchCount === symbols.length / 2 && attemptCount <= 10) {
    setGameResult('win');
    setGameOver(true);
    clearInterval(timerId);
    setGameCompleted(true);

    if (authUser && !emailSent) {
      const taskName = "MatchPair";
      const msgForAdmin = `${authUser.fullname} has completed ${taskName} task and he/she won ₹15!`;
      const msgForUser = `You have completed ${taskName} task and won 15 rupees!`;

      emailSend(authUser.fullname, authUser.email, authUser.upiid, msgForUser, msgForAdmin, taskName);
      emailSendToUser(authUser.fullname, authUser.email, msgForUser, taskName);
      setEmailSent(true);

      setTimeout(() => {
        navigate("/task");
      }, 5000);
    }
  }
}, [gameStarted, matchCount, attemptCount, symbols.length, timerId, emailSent, authUser, gameCompleted, navigate]);




  if (!gameStarted) {
    return (
      <main className="matchPairMainTag">
        <div className="matchPairMainContainer">
          <h1>🧠 Match Pair Game - Rules</h1>
          <ul style={{ textAlign: 'left', fontSize: '18px' }}>
            <li>Find matching pairs of emojis hidden in the grid.</li>
            <li>Click two buttons to reveal the symbols.</li>
            <li>If they match, they stay revealed!</li>
            <li>If they don’t, they hide again after a second.</li>
            <li>You have <strong>10 attempts</strong> and <strong>30 seconds</strong> to complete the game.</li>
          </ul> <br />
          <button id="matchPairInput" onClick={handleStartGame}>Start Game</button>
        </div>
      </main>
    );
  }

  if (gameOver) {
    return (
      <main className="matchPairMainTag">
        <div className="matchPairMainContainer">
          <h1>{gameResult === 'win' ? '🎉 You Win!' : '😞 You Lose!'}</h1>
          {gameResult === 'win' ? (
            <p>Great job! You matched all pairs within the time limit!</p>
          ) : loseReason === 'time' ? (
            <p>⏳ Time's up! You ran out of time before completing the game.</p>
          ) : (
            <p>💥 You used all your attempts before finding all pairs.</p>
          )}
          <p>Total Attempts: {attemptCount}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="matchPairMainTag">
      <div className="matchPairMainContainer">
        <h1>Matching Game</h1>
        <div id="attempts">
          <p style={{ fontSize: '20px' }}>Attempts: {attemptCount} / 10</p>
        </div>
        <div id="timer">
          <p style={{ fontSize: '20px' }}>Time Left: {timer} seconds</p>
        </div>
        <div className="matchPairContainer">
          <div className="MatchPairGridContainer">
            {buttonsState.map((button, index) => (
              <button
                id="matchPairBtn"
                key={index}
                style={{
                  backgroundColor: button.matched ? 'yellowgreen' : button.revealed ? '' : '#7fffd4',
                  color: button.revealed ? '' : 'transparent',
                  fontSize: '30px',
                }}
                onClick={() => handleButtonClick(index)}
              >
                {button.symbol}
              </button>
            ))}
          </div>
        </div> <br />
      </div>
    </main>
  );
}

export default MatchPair;
