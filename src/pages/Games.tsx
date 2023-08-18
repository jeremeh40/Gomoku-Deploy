import { useLocalStorage } from "../hooks"
import { useNavigate, Navigate } from "react-router-dom"
import { UserContext } from "../context";
import { useContext } from "react";

export default function Games() {

  const [games] = useLocalStorage<Record<string,string[][]>>('games', {})
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  if(!user)
  return <Navigate to = '/login'/>;


  return (
    <div className="game-container">
      {Object.keys(games).map((key)=>{
        const gameNumber = key.split('-')[1]
        const winner = key.split('-')[0]
        const date = new Date()
        const month = date.getMonth() +1;
        const day = date.getDate()
        const year = date.getFullYear()

        return(
          <div className="games" key={key}>
            <p className="individual-games"> Game #{gameNumber} @{day}/{month}/{year} Winner: {winner || 'Draw'}</p>
            <button className="game-log"
            onClick={() => navigate(`../game-log/${gameNumber}`)}> View Game Log</button>

          </div>
        )

      })}
      </div>
)}
