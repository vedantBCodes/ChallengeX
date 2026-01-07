import React, { useState, useEffect } from 'react';
import './quiz.css';
import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emailSend } from "../../EmailSend"; // ✅ Assuming you export it as a function
import {emailSendToUser} from  '../../EmailSendToUser';
import { useAuth } from "../../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
function Quiz() {
  const [index, SetIndex] = useState(0);
  const [count, SetCount] = useState(0);
  const [lock, SetLock] = useState(false);
  const [clickedAns, SetClickedAns] = useState('');
  const [start, setStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20); // 20 seconds
  const [showResult, setShowResult] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [emailSent, setEmailSent] = useState(false); // new state to prevent multiple emails
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  // Fetch quiz data mongodb collection
  useEffect(() => {
    const getQuiz = async () => {
      try {
        const res = await axios.get("http://localhost:4001/quiz");
        setQuizData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuiz();
  }, []);

  useEffect(() => {
    const passed = count > 8 && timeLeft > 0;
    if (start && showResult && passed && !emailSent) {
      const taskName="QuizTest";
      const msgForAdmin=`${authUser.fullname} has completed ${taskName} task and he/she won ₹12!`;
      const msgForUser=`You have completed ${taskName} task and won 12 rupees!`
      emailSend(authUser.fullname,authUser.email,msgForAdmin,msgForUser,taskName,authUser.upiid); 
      emailSendToUser(authUser.fullname,authUser.email,msgForUser); 
      setEmailSent(true); //  prevent future calls
      setTimeout(() => {
        navigate("/task");
      }, 5000);
    }
  }, [showResult, count, timeLeft, start, emailSent]);
  
  
  const Question = quizData[index];

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
    if (!lock && Question) {
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
    if (nextIndex >= quizData.length) {
      setShowResult(true);
    }
  }

  function startQuiz() {
    setStart(true);
    setTimeLeft(20);
    SetIndex(0);
    SetCount(0);
    setShowResult(false);
  }

  // ✅ Final Screen
  if (start && (showResult || index === quizData.length)) {
    const passed = count > 8 && timeLeft > 0;
    return (
      <div className={`qsuccess ${passed ? 'win' : 'lose'}`}>
        <h1>{passed ? '🎉 You Win!' : '😢 You Lose!'}</h1>
        <p className='score'>Your Score: <br />{count} / {quizData.length}</p>
        <p className='time'>Time Left: <br />{timeLeft} seconds</p>
      </div>
    );
  }

  // ✅ Rules page
  if (!start) {
    return (
      <div className='rulesPageMainContainer'>
        <div className="rulesPage">
          <h2>Welcome to the Computer Fundamentals Quiz</h2>
          <ul>
            <li>The quiz contains {quizData.length} questions.</li>
            <li>You have 20 seconds to complete the quiz.</li>
            <li>Each question has four options, only one is correct.</li>
            <li>Click the option to lock your answer.</li>
            <li>Click "Next" to proceed to the next question.</li>
            <li style={{ color: 'blue' }}>
              To Win the Game you must complete the Quiz within 20 seconds and score 8+ out of 10
            </li>
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
          {Question ? (
            <>
              <h4>{index + 1}. {Question.question}</h4>
              <div className='quizOptions'>
                <button onClick={(e) => { checkForAnswers(e, 1) }}>{Question.option1}</button>
                <button onClick={(e) => { checkForAnswers(e, 2) }}>{Question.option2}</button>
                <button onClick={(e) => { checkForAnswers(e, 3) }}>{Question.option3}</button>
                <button onClick={(e) => { checkForAnswers(e, 4) }}>{Question.option4}</button>
              </div>
              <button onClick={nextbtn} id='quizNextBtn'>Next</button>
              <p>{index + 1} of {quizData.length} questions</p>
            </>
          ) : (
            <p>Loading question...</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Quiz;
