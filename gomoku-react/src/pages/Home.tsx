/* Home page that allows for selection of game board size and Sends Board size to server so that a new game can be stored in database.
Receives back new game Board and unique gameId so can navigate to newly created game */

import style from './Home.module.css'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
import { post } from '../utils/http'
import { game } from '../types/game'
import { API_HOST } from '../constants'


export default function Home() {

  // track state of board size
  const [size, setSize] = useState('size')
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  /* function to navigate user to login or game page depending on login status */

  const handleLogin = async () =>{
    if (!user) {return navigate('/login')}
    else if (size !== 'size'){
      //sends post request to server to create new game with desired board size
      try{
      const createGame: game = await post(`${API_HOST}/api/newGame`,{
        boardSize: parseInt(size)
      })

      if(!createGame){
        return

      }
      const gameId: string = createGame._id

      if(!createGame){
        return
      }

      //navigate to game page with unique game ID as parameter and sharing new game to game page

      navigate(`game/${gameId}`, {state: { game: createGame}})
    
    }
      catch(err){
        console.log(err)
      }
 
      }

      }

  /* Render form and button to page to allow user to select board size from
  drop down list and use button to then navigate */

  return (
    <>
    { user && size === 'size' && <h2 className={style.heading}>Please choose the size of the game board</h2>}
    {!user && <h2 className={style.heading}>Please login before choosing board size</h2>}
    <form className={style.container}
    onSubmit={(e) => {
      e.preventDefault()
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
