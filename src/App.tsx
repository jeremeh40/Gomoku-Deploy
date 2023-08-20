/*Gomoku 5 in a row game with customisable board size and determine winner and tied game. Game requires
login before plying and previous game results are saved to local browser storage and can be viewed*/


import './App.css';
import Header from './components/Header'
import { UserProvider } from './components';
import Home from './pages/Home'
import Login from './pages/Login';
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
      <Route path='game' element = {<Game/>}/>
      <Route path='games' element = {<History/>}/>
      <Route path='game-log/:id' element = {<Log/>}/>
      <Route path='*' element = {<Navigate to = "/" replace />}/>


    </Routes>
  </div>
  
  </UserProvider>
}

export default App;
