import style from './Header.module.css'

export default function Header() {
  return (
    <>
    <header className={style.header}>

      <div className={style.logo}>Gomoku</div>
      <div className={style.nav}>
        <button className={style.button}>Login</button>
      </div>

    </header>
    </>
  )
}
