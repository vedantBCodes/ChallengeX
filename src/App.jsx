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

// import TicTacToe  from './Components/Tasks/Level1/Tic-Tac-Toe/TicTacToe'

function App() {
  return (
    <>
    <Router>
    {/* <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
        <li><Link to="/tictactoe">TicTacToe</Link></li>
        <li><Link to="/guessingGame">GuessingGame</Link></li>
        <li><Link to="/matchPair">MatchPair</Link></li>
        <li><Link to="/typingSpeedTest">TypingSpeedTest</Link></li>
        <li><Link to="/memoryGame">MemoryGame</Link></li>
        <li><Link to="/colorSpotter">ColorSpotter</Link></li>
        <li><Link to="/fifteenPuzzle">FifteenPuzzle</Link></li>
        <li><Link to="/calculatingSpeed">CalculatingSpped</Link></li>
        <li><Link to="/suduku">Suduku</Link></li>
      </ul>
    </nav> */}

    {/* Define Routes */}
    <Routes>
      <Route path="/" element={ <><Navbar/>
       <Header_02/>
       <TasksPage_03/>
       <JoinNowSection_04/>
       <CommunitySection_05/>
      <Footer/>
      </>} />
      <Route path="/join" element={<JoinNowSection_04 />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/tictactoe" element={<TicTacToe/>} />
      <Route path="/guessingGame" element={<Guessinggame/>} />
      <Route path="/matchPair" element={<MatchPair/>} />
      <Route path="/typingSpeedTest" element={<TypingSpeedTest/>} />
      <Route path="/memoryGame" element={<MemoryGame/>} />
      <Route path="/colorSpotter" element={<ColorSpotter/>} />
      <Route path="/fifteenPuzzle" element={<FifteenPuzzle/>} />
      <Route path="/calculatingSpeed" element={<Calculatingspeed/>} />
      <Route path="/suduku" element={<Suduko/>} />
    </Routes>
  </Router>
     
       
    </>
  )
}

export default App

