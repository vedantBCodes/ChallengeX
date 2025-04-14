import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar_01';
import Header_02 from './Components/Header_02';
import TasksPage_03 from './Components/TasksPage_03';
import JoinNowSection_04 from './Components/JoinNowSection_04';
import CommunitySection_05 from './Components/CommunitySection_05';
import Quiz from './Components/Tasks/Level1/Quiz/Quiz'
import Footer from './Components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicTacToe from './Components/Tasks/Level1/Tic-Tac-Toe/TicTacToe';
import Guessinggame from './Components/Tasks/Level1/GuessingGame/Guessinggame';
import MatchPair from './Components/Tasks/Level2/MatchPair/MatchPair';
import TypingSpeedTest from './Components/Tasks/Level2/Typing-Speed_Test/Typingspeed';
import MemoryGame from './Components/Tasks/Level2/MemoryGame/MemoryGame';
import ColorSpotter from './Components/Tasks/Level2/ColorSpotter/ColorSpotter';
import FifteenPuzzle from './Components/Tasks/Level3/FifteenPuzzle/FifteenPuzzle';
import Calculatingspeed from './Components/Tasks/Level3/CalculatingSpeed/Calculatingspeed';
import Suduko from './Components/Tasks/Level3/Suduku/Suduko';
import MidSection from './Components/MidSection';
import WordSearch from './Components/Tasks/Level1/WordSearch/WordSearch';
import ContactPage from './Components/Contact Us/ContactPage';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { Toaster } from "react-hot-toast";
import { useAuth } from './context/AuthProvider';
import { Navigate } from 'react-router-dom';
import TempTaskPage from './Components/TempTaskPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Navigate } from 'react-router-dom';

function App() {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
     <ToastContainer />
    <Toaster position="top-center" reverseOrder={false} />
    <Router>

    {/* Define Routes */}
    <Routes>
      <Route path="/" element={ <><Navbar/>
       <Header_02/>
       {/* <TasksPage_03/> */}
       <MidSection/>
       <CommunitySection_05/>
       <JoinNowSection_04/>
      <Footer/>
      </>} />
      <Route path="/task" element={authUser ? (<><Navbar/> <TasksPage_03 /></>) : <Navigate to="/temptaskpage" />} />
      <Route path="/contact" element={<><Navbar/> <ContactPage/></>} />
      <Route path="/temptaskpage" element={<><Navbar/> <TempTaskPage/></>} />
      <Route path="/signup" element={<><Navbar/> <Signup/></>} />
      <Route path="/login" element={<><Navbar/> <Login/></>} />
      <Route path="/quiz" element={<><Navbar/> <Quiz /></>} />
      <Route path="/tictactoe" element={<><Navbar/><TicTacToe/></>} />
      <Route path="/guessingGame" element={<><Navbar/><Guessinggame/></>} />
      <Route path="/wordsearch" element={<><Navbar/><WordSearch/></>} />
      <Route path="/matchPair" element={<><Navbar/><MatchPair/></>} />
      <Route path="/typingSpeedTest" element={<><Navbar/><TypingSpeedTest/></>} />
      <Route path="/memoryGame" element={<><Navbar/><MemoryGame/></>} />
      <Route path="/colorSpotter" element={<><Navbar/><ColorSpotter/></>} />
      <Route path="/fifteenPuzzle" element={<><Navbar/><FifteenPuzzle/></>} />
      <Route path="/calculatingSpeed" element={<><Navbar/><Calculatingspeed/></>} />
      <Route path="/suduku" element={<><Navbar/><Suduko/></>} />
     
    </Routes>
  </Router>
     
       
    </>
  )
}

export default App

