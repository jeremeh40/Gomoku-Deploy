/* Games page that shows information of previously completed games*/

import { useLocalStorage } from "../hooks"
import { useNavigate, Navigate } from "react-router-dom"
import { UserContext } from "../context";
import { useContext,useState, useEffect } from "react";
import style from './Games.module.css'
import { get } from "http";
import { game } from "../types/game";

export default function Games() {
  //import games object from local storage
  const [games, setGames] = useState<game[]>([])
  const API_HOST = process.env.API_HOST || ''
  const getGames = async() => {
  
    try{

      const allGames = await get(`${API_HOST}/api/games`)
      console.log(allGames)

    }
    catch(err){
      console.log(err)
    }
  }


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
      {Object.keys(games).map((key)=>{
        const gameNumber = key.split('-')[1]
        const winner = key.split('-')[0]
        const date = new Date()
        const month = date.getMonth() +1;
        const day = date.getDate()
        const year = date.getFullYear()

        return(
          <div className={style.games} key={key}>
            <p className={style.individualGames}> Game #{gameNumber} @{day}/{month}/{year} Winner: {winner || 'Draw'}</p>
            <button className={style.button}
            onClick={() => navigate(`../game-log/${gameNumber}`)}> View Game Log</button>

          </div>
        )

      })}
      </div>
)}