import { useParams } from "react-router-dom"
import { useLocalStorage } from "../hooks"
import style from './Log.module.css'


export default function Log() {

  const [games] = useLocalStorage<Record<string,string[][]>>('games', {})

  const { id } = useParams()


  if(!id) return null

  const game = games

  // console.log(id)

  // const game = 

  // Object.keys(games).map((key)=>{
  //   const gameNumber = key.split('-')[1]
  //   const winner = key.split('-')[0]
  //   console.log(gameNumber)

  //   if(parseInt(gameNumber) === parseInt(id)){

  //     return (

  //       <div>

  //       {games[winner+'-'+ gameNumber]}


  //       </div>
        
  // )}



  // })






  const renderCell = (board: string[][], row: number, col: number) =>{
    const cellValue = board[row][col];
    const cellClass = cellValue === 'black' ? 'player1' : cellValue === 'white' ? 'player2' : 'empty';

    return(
      <div
      key={`${row}-${col}`}
      id={`${row}-${col}`}
      className={`${cellClass}`}      
      />
    )

  }

  const renderBoard = (board: string[][]) => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((_, colIndex) => renderCell(board, rowIndex, colIndex))}
      </div>
    ))
  }



  return (
    <div>

    {Object.keys(games).map((key)=>{
    const gameNumber = key.split('-')[1]
    const winner = key.split('-')[0]
    console.log(gameNumber)

    if(parseInt(gameNumber) === parseInt(id)){
      const currentGame =games[winner+'-'+ gameNumber]

      return (

        <div key ={id}>
          <h2> Winner: {winner}</h2>
          
        
        {renderBoard(currentGame)}

      


        </div>
        
  )}



  })}

      </div>
  )
}
