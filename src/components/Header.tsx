import style from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context';
import { useContext } from 'react';

export default function Header() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();

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
