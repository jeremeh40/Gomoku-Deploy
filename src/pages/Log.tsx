import { useParams, useNavigate, Navigate } from "react-router-dom"
import { useLocalStorage } from "../hooks"
import { UserContext } from "../context";
import style from './Log.module.css'
import { useContext } from "react";

export default function Log() {

  type GameData = {
    board: string[][];
    turnOrder: string[];
  };

  const [games] = useLocalStorage<Record<string,GameData>>('games', {})
  const { id } = useParams()
  const navigate = useNavigate()
  const {user} = useContext(UserContext);

  if(!user)
  return <Navigate to = '/login'/>;

  if(!id) return null

  const renderCell = (board: string[][], row: number, col: number, turns: string[]) => {
    const cellValue = board[row][col];
    const cellClass = cellValue === 'black' ? 'player1' : cellValue === 'white' ? 'player2' : 'empty';
    const coordinate = `${row}-${col}`;
  
    if (turns.includes(coordinate)) {
      const index = turns.indexOf(coordinate);
  
      return (
        <div
          key={`${row}-${col}`}
          id={`${row}-${col}`}
          className={`${cellClass}`}
        >
          <p>{index+1}</p>
        </div>
      );
    }
  
    return (
      <div
        key={`${row}-${col}`}
        id={`${row}-${col}`}
        className={`${cellClass}`}
      />
    );
  };

  const renderBoard = (board: string[][], turns: string[]) => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((_, colIndex) => renderCell(board, rowIndex, colIndex, turns))}
      </div>
    ))
  }

  return (
    <div>

    {Object.keys(games).map((key)=>{
      console.log(key)
    const gameNumber = key.split('-')[1]
    const winner = key.split('-')[0]

    if(parseInt(gameNumber) === parseInt(id)){
      const currentGame =games[winner+'-'+ gameNumber]
      const currentBoard: string[][] = currentGame['board']
      const currentTurns: string[] = currentGame['turnOrder']

      return (

        <div>

          <div className="game-info">

          <h2> Winner: {winner || 'draw'}</h2>

          </div>


        <div className="board" key ={id}>
                  
        
          {renderBoard(currentBoard, currentTurns)}

        </div>

        <div className="options">  

          <button className="button" onClick={()=> navigate('/games')}>Back</button>

        </div>      

        </div>        
        
  )}
  })}

      </div>
  )
}
