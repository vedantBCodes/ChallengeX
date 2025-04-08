import React, { useRef, useState, useEffect } from 'react';
import './calculatingspeed.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Calculatingspeed = () => {
  const expressionBox = useRef(null);
  const answerBox = useRef(null);
  const startBtn = useRef(null);
  const submitBtn = useRef(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [expression, setExpression] = useState(null);
  const [result, setResult] = useState(null);
  const [time, setTime] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [correctExpressionCount, setCorrectExpressionCount] = useState(0);
  const [totalExpressionCount, setTotalExpressionCount] = useState(0);
  const [gameResult, setGameResult] = useState(null);
  const [startClicked, setStartClicked] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  useEffect(() => {
    if (time === 0) {
      handleGameOver();
    }
  }, [time]);

  const getRandomExpression = () => {
    const getRandomNumber = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const getRandomOperator = () => {
      const operators = ['+', '-', '*', '/'];
      return operators[Math.floor(Math.random() * operators.length)];
    };

    const operand1 = getRandomNumber(1, 10);
    const operand2 = getRandomNumber(1, 10);
    const operand3 = getRandomNumber(1, 10);
    const operand4 = getRandomNumber(1, 10);

    const operator1 = getRandomOperator();
    const operator2 = getRandomOperator();
    const operator3 = getRandomOperator();

    const temp = `${operand1} ${operator1} ${operand2} ${operator2} ${operand3} ${operator3} ${operand4}`;
    setExpression(temp);
    setTotalExpressionCount((prev) => prev + 1);
    setTimeout(() => {
      if (expressionBox.current) {
        expressionBox.current.value = temp;
      }
    }, 0);
  };

  const handleGameOver = () => {
    disableEverything();
    if (correctExpressionCount >= 5) {
      setGameResult('win');
    } else {
      setGameResult('lose');
    }
  };

  const handleStartClick = () => {
    if (!isRunning && !startClicked) {
      setIsRunning(true);
      setStartClicked(true);
      getRandomExpression();
    }
  };

  const disableEverything = () => {
    expressionBox.current.disabled = true;
    answerBox.current.disabled = true;
    startBtn.current.disabled = true;
    submitBtn.current.disabled = true;
  };

  const handleSubmitClick = () => {
    const ans = parseInt(answerBox.current.value);
    const evaluated = eval(expression);
    setResult(evaluated);

    if (!expression) {
      toast.warning('Please start the game first.');
    } else if (answerBox.current.value === '') {
      toast.warning('Please enter your answer!');
    } else if (ans === parseInt(evaluated)) {
      toast.success('Correct!');
      setCorrectExpressionCount((prev) => prev + 1);
      expressionBox.current.value = '';
      answerBox.current.value = '';
      getRandomExpression();
    } else {
      toast.error('Incorrect!');
      expressionBox.current.value = '';
      answerBox.current.value = '';
      getRandomExpression();
    }
  };

  if (!gameStarted) {
    return (
      <main className="calculatingSpeedMainContainer">
        <div className="rulesContainer">
          <h3>🧠 Calculating Speed Game Rules</h3>
          <ul>
            <li>Click "Start Game" to begin the 30-second challenge.</li>
            <li>You must quickly evaluate and type the correct answer.</li>
            <li>Each correct answer increases your score.</li>
            <li>To win you have to solve 5 expressions in 30 seconds</li>
          </ul>
          <button className="startGameBtn" onClick={() => setGameStarted(true)}>
            Start Game
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="calculatingSpeedMainContainer">
      <div className="calculatingSpeedContainer">
        <h1>Calculating Speed</h1>
        <button onClick={handleStartClick} ref={startBtn} disabled={startClicked}>
          Start
        </button>
        <br />
        <br />
        <input
          type="text"
          placeholder="Expression :"
          readOnly
          ref={expressionBox}
          onCopy={(e) => e.preventDefault()}
        />
        <br />
        <br />
        <input type="number" placeholder="Your Ans :" ref={answerBox} />
        <br />
        <br />
        <button onClick={handleSubmitClick} ref={submitBtn}>
          Submit
        </button>
        <p style={{ fontSize: '25px' }}>{time} sec left</p>

        {time === 0 && gameResult && (
          <div className="resultMessage">
            <h2 style={{ fontSize: '22px', color: '#333' }}>⏱️ Time's up!</h2>
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px 0', color: 'black' }}>
              You solved{' '}
              <span style={{ color: '#28a745' }}>{correctExpressionCount}</span> out of{' '}
              <span style={{ color: '#007bff' }}>{totalExpressionCount}</span> expressions!
            </p>
            <h3 className="gameOverStatement" style={{ fontSize: '24px', marginTop: '10px' }}>
              {gameResult === 'win' ? '🎉 You Win! 🎉' : '😢 You Lose! 😢'}
            </h3>
          </div>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </main>
  );
};

export default Calculatingspeed;
