import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar_01';
import Header_02 from './Components/Header_02';
import TasksPage_03 from './Components/TasksPage_03';
import JoinNowSection_04 from './Components/JoinNowSection_04';
import CommunitySection_05 from './Components/CommunitySection_05';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <Navbar/>
      <Header_02/>
      <TasksPage_03/>
      <JoinNowSection_04/>
      <CommunitySection_05/>
      <Footer/>
    </>
  )
}

export default App
