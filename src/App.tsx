import './App.css';
import Header from './components/Header'
import { UserProvider } from './components';
import Home from './pages/Home'
import Login from './pages/Login';
import Game from './pages/Game';
import Log from './pages/Log'
import History from './pages/History';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
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
