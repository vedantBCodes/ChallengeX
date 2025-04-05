import React, { useState, useEffect } from 'react';
import data from './data.js';
import './quiz.css';

function Quiz() {
  const [index, SetIndex] = useState(0);
  const [count, SetCount] = useState(0);
  const [Question, SetQuestion] = useState(data[0]);
  const [lock, SetLock] = useState(false);
  const [clickedAns, SetClickedAns] = useState('');
  const [start, setStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20); // 2 minutes
  const [showResult, setShowResult] = useState(false); // to handle end of quiz by timer

  // ⏱️ Timer effect
  useEffect(() => {
    let timer;
    if (start && !showResult && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setShowResult(true);
    }

    return () => clearInterval(timer);
  }, [start, timeLeft, showResult]);

  function checkForAnswers(e, ans) {
    if (!lock) {
      if (Question.ans === ans) {
        e.target.classList.add("qcorrect");
        SetCount(count + 1);
      } else {
        e.target.classList.add("qwrong");
      }
      SetLock(true);
      SetClickedAns(e.target);
    }
  }

  function nextbtn() {
    if (clickedAns !== "") {
      clickedAns.classList.remove("qcorrect", "qwrong");
    }
    SetLock(false);
    SetClickedAns('');
    const nextIndex = index + 1;
    SetIndex(nextIndex);
    if (nextIndex < data.length) {
      SetQuestion(data[nextIndex]);
    } else {
      setShowResult(true);
    }
  }

  function startQuiz() {
    setStart(true);
    setTimeLeft(20); // 2 mins
  }
  


  // ✅ Final Screen (either timer ends or quiz completes)
  if (start && (showResult || index === data.length)) {
    const passed = count > 8 && timeLeft > 0;
  
    return (
      <div className={`qsuccess ${passed ? 'win' : 'lose'}`}>
        <h1>{passed ? '🎉 You Win!' : '😢 You Lose!'}</h1>
        <p className='score'>Your Score: <br />{count} / {data.length}</p>
        <p className='time'>Time Left: <br />{timeLeft} seconds</p>
        {/* <p className='message'>
          {passed
            ? 'Great job! You answered enough questions correctly in time!'
            : 'Oops! You needed more than 8 correct answers and to finish within 2 minutes.'}
        </p> */}
      </div>
    );
  }
  
  
  
  

  // ✅ Rules page before starting
  if (!start) {
    return (
      <div className='rulesPageMainContainer'>
      <div className="rulesPage">
        <h2>Welcome to the Computer Fundamentals Quiz</h2>
        <ul>
          <li>The quiz contains {data.length} questions.</li>
          <li>You have 20 seconds to complete the quiz.</li>
          <li>Each question has four options, only one is correct.</li>
          <li>Click the option to lock your answer.</li>
          <li>Click "Next" to proceed to the next question.</li>
          <li style={{color:'blue'}}>To Win the Game you must complete the Quiz within 20 seconds and you must score 8+ out of 10</li>
        </ul>
        <button className="startBtn" onClick={startQuiz}>Start Quiz</button>
      </div>
      </div>
    );
  }

  // ✅ Main Quiz UI
  return (
    <main className='QuizMainContainer'>
      <h2>Computer Fundamentals Quiz</h2>
      <div className="quizMainContainer">
        <div className="timer">Time Left: {timeLeft}s</div>
        <div className="quizSubContainer">
          <h4>{index + 1}. {Question.question}</h4>
          <div className='quizOptions'>
            <button onClick={(e) => { checkForAnswers(e, 1) }}>{Question.option1}</button>
            <button onClick={(e) => { checkForAnswers(e, 2) }}>{Question.option2}</button>
            <button onClick={(e) => { checkForAnswers(e, 3) }}>{Question.option3}</button>
            <button onClick={(e) => { checkForAnswers(e, 4) }}>{Question.option4}</button>
          </div>
          <button onClick={nextbtn} id='quizNextBtn'>Next</button>
          <p>{index + 1} of {data.length} questions</p>
        </div>
      </div>
    </main>
  );
}

export default Quiz;
