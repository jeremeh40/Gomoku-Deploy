import Square from "../components/Square"
import { useState } from "react"
import style from './Game.module.css'

export default function Game() {

  const boardSize = 15;

  const [board, setBoard] = useState(Array.from({ length: boardSize }, () => Array(boardSize).fill(0)));

  const renderCell = (row: number, col: number) =>{
    const cellValue = board[row][col];
    const cellClass = cellValue === 1 ? 'player1' : cellValue === 2 ? 'player2' : 'empty';

    return(
      <div
      id={`${row}-${col}`}
      className={`${cellClass}`}/>
    )

  }

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
      </div>
    ))
  }



  return (
    
    <div className="main">
      <div className="game-info">
        <h2>Curent Player: </h2>
      </div>


      <div className="board">
        {renderBoard()}
      </div>
      <div className="options">
        <button>Restart</button>
        <button>Leave</button>
      </div>

    </div>
  )
  }
