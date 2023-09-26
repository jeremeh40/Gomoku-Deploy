/*Gomoku 5 in a row game with customisable board size that interacts with API endpoints of backend. Game requires
login or sign up before playing and games are saved to a database and can be viewed by user once completed.*/


import './App.css';
import Header from './components/Header'
import { UserProvider } from './components';
import Home from './pages/Home'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Game from './pages/Game';
import Log from './pages/Log'
import History from './pages/Games';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  //Routes used to link all pages together, and each page given unique url
  return <UserProvider>
  <Header />
  <div className='main'>
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='login' element = {<Login/>}/>
      <Route path= 'signup' element = {<SignUp/>}/>
      <Route path='game/:gameId' element = {<Game/>}/>
      <Route path='games' element = {<History/>}/>
      <Route path='game-log/:gameId' element = {<Log/>}/>
      <Route path='*' element = {<Navigate to = "/" replace />}/>

    </Routes>
  </div>
  
  </UserProvider>
}

export default App;
