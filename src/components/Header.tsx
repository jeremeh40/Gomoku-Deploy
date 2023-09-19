/* Component that renders header on all pages of the app */

import style from './Header.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context';
import { useContext } from 'react';

export default function Header() {
  //define user and navigate constants
  const { user, logout } = useContext(UserContext)
  const navigate = useNavigate();
  const location = useLocation();


  /* getActions function that changes naviagation options in header depending on if use is logged in or not*/
  const getActions = () => {
    if (user) {
      return(
      <>
      
        <button className={style.button} onClick={() => navigate('Games')}>Previous Games</button>

        <button className={style.button} onClick= {() => {logout(); navigate('/')}}>Logout</button>
      
      </>
      )
    } else {
      return location.pathname !== '/login' ? (
        <button className={style.button} onClick={() => navigate('login')}>
          Login
        </button>
      ) : (
        <button className={style.button} onClick={() => navigate('SignUp')}>
          Sign Up
        </button>
      )

    }
  }

  /* render header to page */
  return (
    <>
    <header className={style.header}>

      <Link to="/" className={style.logo}>Gomoku</Link>
      <div className={style.nav}>
        {getActions()}
      </div>

    </header>
    </>
  )
}
