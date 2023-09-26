/* Games page that shows information of previously completed games*/

import { useLocalStorage } from "../hooks"
import { useNavigate, Navigate } from "react-router-dom"
import { UserContext } from "../context";
import { useContext,useState, useEffect } from "react";
import style from './Games.module.css'
import { get } from "../utils/http";
import { game } from "../types/game";

export default function Games() {
  //import games object from local storage
  const [games, setGames] = useState<game[]>([])
  const API_HOST = process.env.API_HOST || '';  
  
  const getGames = async () => {
  
    try{

      const allGames = await get<game[]>(`${API_HOST}/api/games`)
      setGames(allGames)
      console.log(allGames)
      console.log(games)

    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getGames()
  }, [])


  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  //navigate to login page if no user logged in
  if(!user)
  return <Navigate to = '/login'/>;

  /* Render previous games to page with information on game number, date, winner, and with
  a button to navigate to the game-log page*/
  return (
    
    <div className={style.container}>
      <h2 className={style.gameCount}>Previous games: {Object.keys(games).length}</h2>

      {games.map(({winner, _id, createdAt}, index) => {
        console.log(typeof(createdAt))
        createdAt = new Date(createdAt)
        console.log(createdAt)
        const gameId = _id
        const month = createdAt.getMonth() +1;
        const day = createdAt.getDate()
        const year = createdAt.getFullYear()
      return (
          <div className={style.games} key={_id}>
            <p className={style.individualGames}> Game #{index+1} @{day}/{month}/{year} Winner: {winner}</p>
            <button className={style.button}
            onClick={() => navigate(`../game-log/${gameId}`)}> View Game Log</button>

          </div>
        )
      })}


      </div>
  )



    }




