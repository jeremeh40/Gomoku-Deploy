import style from './Home.module.css'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context'


export default function Home() {
  const [size, setSize] = useState('size')
  const navigate = useNavigate()
  const { user } = useContext(UserContext)


  const handleLogin = () =>{
    if (!user) {return navigate('/login')}
    else if (size !== 'size')
      { navigate('Game', {state: { Size: size}})}
  }

  return (
    <>
    { user && size === 'size' && <h2 className={style.heading}>Please choose the size of the game board</h2>}
    {!user && <h2 className={style.heading}>Please login before choosing board size</h2>}
    <form className={style.container}
    onSubmit={(e) => {
      e.preventDefault()
      console.log(size)
      handleLogin()
      
      
    }}>
      <select name = 'board size' className={style.dropdown} defaultValue={'Board size'}
       onChange={e => setSize(e.target.value)}>
        <option value = 'Board size' disabled>Board size</option>
        <option value ='5'>5</option>
        <option value ='6'>6</option>
        <option value ='7'>7</option>
        <option value ='8'>8</option>
        <option value ='9'>9</option>
        <option value ='10'>10</option>
        <option value ='11'>11</option>
        <option value ='12'>12</option>
        <option value ='13'>13</option>
        <option value ='14'>14</option>
        <option value ='15'>15</option>
        <option value ='16'>16</option>
        <option value ='17'>17</option>
        <option value ='18'>18</option>
        <option value ='19'>19</option>
      </select>
      <input type = 'submit' value = 'Start' className={style.button}/>

    </form>
         </>
  )

  
}
