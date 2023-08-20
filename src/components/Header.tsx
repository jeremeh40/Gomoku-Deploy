/* Component that renders header on all pages of the app */

import style from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context';
import { useContext } from 'react';

export default function Header() {
  //define user and navigate constants
  const { user } = useContext(UserContext)
  const navigate = useNavigate();


  /* getActions function that changes naviagation options in header depending on if use is logged in or not*/
  const getActions = () => {
    if (user) {
      return(
      <>
      
        <button className={style.button} onClick={() => navigate('Games')}>Previous Games</button>
      
      </>
      )
    } else {
      return(
        <button className={style.button} onClick={() => navigate('login')}>Login</button>
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
