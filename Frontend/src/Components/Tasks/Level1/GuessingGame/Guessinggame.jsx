import React, { useRef, useState } from "react";
import "./Guessinggame.css";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emailSend } from "../../EmailSend"; // ✅ Assuming you export it as a function
import { useAuth } from "../../../../context/AuthProvider";
import { useEffect } from "react";
const Guessinggame = () => {
  const input = useRef(null);
  const msgContainer = useRef(null);

  const [num, setNum] = useState(Math.floor(Math.random() * 101));  
  const [isDisabled, setIsDisabled] = useState(true);
  const [guessNumbers, setGuessNumbers] = useState([]);
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [resultMsg, setResultMsg] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [authUser, setAuthUser] = useAuth();
  
  useEffect(() => {
    if (gameOver && resultMsg === "win" && !emailSent) {
      const msg=`${authUser.fullname} has completed GuessingGame task and he/she won ₹12!`;
      emailSend(authUser.fullname,authUser.email,msg); 
      setEmailSent(true); // 👈 prevent future calls
    }
  }, [gameOver, resultMsg, emailSent]);
  

  function handleSubmit() {
    const enteredNum = input.current.value;

    if (enteredNum === "") {
      alert("Please enter a number:");
      return;
    }

    const updatedGuesses = [...guessNumbers, enteredNum];
    setGuessNumbers(updatedGuesses);    
    msgContainer.current.innerHTML = "";

    const msg1 = document.createElement("p");
    const msg2 = document.createElement("p");

    if (enteredNum < num) {
      msg1.innerText = "Too Low!";
    } else if (enteredNum > num) {
      msg1.innerText = "Too High!";
    } else {
      msg1.innerText = `🎉 You guessed it in ${updatedGuesses.length} attempts! You win!`;
      setResultMsg("win");
      input.current.disabled = true;
      setIsDisabled(false);
      setGameOver(true);
    }

    // If guessed wrong and max attempts reached
    if (
      enteredNum != num &&
      updatedGuesses.length >= 5 &&
      !gameOver
    ) {
      msg1.innerText = `❌ You've used all 5 attempts. You lose. The number was ${num}.`;
      input.current.disabled = true;
      setIsDisabled(false);
      setResultMsg("lose");
      setGameOver(true);
    }

    msg2.innerText = `Your Guesses: ${updatedGuesses.join(", ")}`;
    msgContainer.current.appendChild(msg1);
    msgContainer.current.appendChild(msg2);
    input.current.value = "";
  }

  function startGame() {
    setStart(true);
    msgContainer.current.innerHTML = "";
    input.current.disabled = false;
    setIsDisabled(true);
  }

  return (
    <main className="guessingGameMainContainer">
      {!start ? (
        <div className="rulesPage">
          <h2>Welcome to the Guessing Game</h2>
          <ul>
            <li>Guess a number between 0 and 100.</li>
            <li>You’ll get hints: “Too Low” or “Too High”.</li>
            <li>You only get <strong>5 attempts</strong>.</li>
            <li>Game ends automatically after 5 tries.</li>
          </ul>
          <button className="startGameBtn" onClick={startGame}>
            Start Game
          </button>
        </div>
      ) : (
        <div className="guessingGameContainer">
          <h3>Guess the Number</h3>
          <p style={{ fontSize: "20px" }}>Enter a number between 0 and 100</p>
          <input
            type="number"
            placeholder="Guess a number"
            min="0"
            max="100"
            ref={input}
            id="guessingGameInput"
          />
          <div id="Btns">
            <button
              id="submitBtn"
              onClick={handleSubmit}
              disabled={!isDisabled}
            >
              Submit
            </button>
          </div>

          <div id="msg" ref={msgContainer}></div>

          {gameOver && (
            <div className="resultMessage">
              {resultMsg === "win" ? (
                <p style={{ color: "green", fontSize: "18px" }}>
                  🏆 Great job! You won!
                </p>
              ) : (
                <p style={{ color: "red", fontSize: "18px" }}>
                  😓 You lost. 
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Guessinggame;
