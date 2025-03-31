import React, { useState, useEffect, useRef } from 'react';
import './typingspeed.css';

const TypingSpeedTest = () => {
  const initialStatement = 'he turned in the research paper on friday otherwise he would have not passed the class';
  const [statement, setStatement] = useState(initialStatement);
  const [cnt, setCnt] = useState(0);
  const [letterCnt, setLetterCnt] = useState(0);
  const [time, setTime] = useState(10);
  const [stopTime, setStopTime] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(null);
  const resetBtnRef = useRef(null);

  useEffect(() => {
    let interval;
    if (cnt > 0 && !stopTime) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            setStopTime(true);
            setTypingSpeed((letterCnt / 10).toFixed(2));
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cnt, stopTime, letterCnt]);

  const handleButtonClick = (char) => {
    setCnt((prevCnt) => prevCnt + 1);
    if (char === statement[0] && !stopTime) {
      setStatement((prevStatement) => prevStatement.slice(1));
      setLetterCnt((prevCount) => prevCount + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      setCnt((prevCnt) => prevCnt + 1);
      if (e.key === statement[0] && !stopTime) {
        setStatement((prevStatement) => prevStatement.slice(1));
        setLetterCnt((prevCount) => prevCount + 1);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [statement, stopTime]);

  const handleResetClick = () => {
    setStatement(initialStatement);
    setCnt(0);
    setLetterCnt(0);
    setTime(10);
    setStopTime(false);
    setTypingSpeed(null);
  };

  return (

      <div className="typingSpeedContainer">
        <h1>Typing Speed Test</h1>
        <p>
          <b>Start typing to measure your speed.</b> <br />
          You can type on your keyboard or use the virtual keyboard below.
        </p>

        <input type="text" readOnly placeholder={statement} id="typingSpeedInput" /> <br /> <br />

        <div className="typingSpeedBtnContainer">
          <div className="row">
            {'qwertyuiop'.split('').map((btn, index) => (
              <button key={index} onClick={() => handleButtonClick(btn)} className="typingSpeedBtn">{btn}</button>
            ))}
          </div>
          <div className="row">
            {'asdfghjkl'.split('').map((btn, index) => (
              <button key={index} onClick={() => handleButtonClick(btn)} className="typingSpeedBtn">{btn}</button>
            ))}
          </div>
          <div className="row">
            {'zxcvbnm'.split('').map((btn, index) => (
              <button key={index} onClick={() => handleButtonClick(btn)} className="typingSpeedBtn">{btn}</button>
            ))}
          </div>
        </div>

        <div className="timeContainer">
          <h3 style={{ fontSize: '25px' }}>
            {stopTime ? `Typing speed: ${typingSpeed} lps (letters per second)` : `${time} seconds left`}
          </h3>
        </div>

        <button id="typingSpeedReset" ref={resetBtnRef} onClick={handleResetClick}>
          Reset
        </button>
      </div>
  );
};

export default TypingSpeedTest;
