/* Home page that allows for selection of game board size and direct to game page
or login page depending on login status */

import style from './Home.module.css'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
import { post, setToken } from '../utils/http'


export default function Home() {

  // track state of board size
  const [size, setSize] = useState('size')
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const API_HOST = process.env.API_HOST || ''

  /* function to navigate user to login or game page depending on login status */

  const handleLogin = async () =>{
    if (!user) {return navigate('/login')}
    //navigate to Game page and send board size state to page aswell
    else if (size !== 'size'){
      try{
      const createGame = await post(`${API_HOST}/api/newGame`,{
        boardSize: size
      })

      console.log(createGame)

      if(!createGame){
        return
      }

      navigate('Game', {state: { game: createGame}})
    
    }
      catch(err){
        console.log(err)
      }
 
      }

      }

        

      // const login = async (username: string, password: string) => {
      //   try {
      //     const user = await post<Credential, User>(`${API_HOST}/api/auth/login`, {
      //       username,
      //       password,
      //     })
      //     setUser(user)
      //     setToken(user.token)
      //     return true
      //   } catch (error) {
      //     if (error instanceof Error) {
      //       return error.message
      //     }
      //     return 'Unable to login at this moment, please try again'
      //   }
      // }



  //     
  // }

  /* Render form and button to page to allow user to select board size from
  drop down list and use button to then navigate */

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
