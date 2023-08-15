import { useLocalStorage } from "../hooks"
import { useNavigate } from "react-router-dom"

export default function Games() {

  const [games] = useLocalStorage<Record<string,string[][]>>('games', {})
  const navigate = useNavigate();


  return (
    <div className="game-container">
      {Object.keys(games).map((key)=>{
        const gameNumber = key.split('-')[1]
        const winner = key.split('-')[0]
        const date = new Date()
        const month = date.getMonth()
        const day = date.getDay()
        const year = date.getFullYear()
        


        return(
          <div className="games" key={key}>
            <p className="individual-games"> Game #{gameNumber} @{day}/{month}/{year} Winner: {winner}</p>
            <button className="game-log"
            onClick={() => navigate(`../game-log/${gameNumber}`)}> View Game Log</button>


          </div>



        )

      })}


      </div>
)}
