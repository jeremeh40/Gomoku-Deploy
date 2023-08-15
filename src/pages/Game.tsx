import Square from "../components/Square"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import style from './Game.module.css'
import { useLocalStorage } from "../hooks";
let count: number = 0;
let gameCount:number = 1;
let winner: string = ''

export default function Game() {
  const {state} =useLocation()
  const {Size} = state
  // console.log(Size)

  const boardSize: number = Size;
  const player1 = 'black';
  const player2 = 'white';

  
  const initialBoard: string[][] = Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => ' '));
  const navigate = useNavigate();

  const [games, saveGames] = useLocalStorage<Record<string, string [][]>>('games', {});



  const [board, setBoard] = useState(initialBoard);
  const [gameover, setGameOver] = useState(false);
  let [currentPlayer, setCurrentPlayer] = useState('black');
  const [isDraw, setIsDraw] = useState(false);

  const checkWinner = () =>{

    for(let r=0; r<boardSize; r++){
      for(let c = 0; c< boardSize - 4; c++){
          if (board[r][c] != ' '){
              if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board [r][c+2] == board [r][c+3] && board[r][c+3] == board[r][c+4]){
                  
                  setGameOver(true)
                  winner = currentPlayer
                
                  return;
              }   
          }      
      }
  }
  for(let c=0; c<boardSize; c++){
    for(let r=0; r<boardSize -4 ; r++){
        if(board[r][c] != ' '){
            if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board [r+2][c] == board [r+3][c] && board[r+3][c] == board[r+4][c]){
              setGameOver(true)
              winner = currentPlayer
              return;
            }
        }
    }
}
//diagonal check
for(let r=0; r<boardSize -4; r++){
    for(let c=0; c<boardSize -4; c++){
        if(board[r][c] != ' '){
            if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board [r+2][c+2] == board [r+3][c+3] && board[r+3][c+3] == board[r+4][c+4]){
              setGameOver(true)
              winner = currentPlayer
              console.log(winner)
              return;
            }
        }
    }
}
//anti-diagonal check
for(let r=4; r<boardSize; r++){
    for(let c=0; c<boardSize -4 ; c++){
        if(board[r][c] != ' '){
            if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board [r-2][c+2] == board [r-3][c+3] && board[r-3][c+3] == board[r-4][c+4]){
              setGameOver(true)
              winner = currentPlayer
              return;
            }
        }
    }
}

if(count === boardSize * boardSize){
  console.log('draw');
  setIsDraw(true)
  return;
}

  }


  const leaveGame = () =>{

    if (gameover || isDraw){
      saveGames({...games, [`${winner}-${gameCount}`]: board})
      navigate('/games')
      // console.log(gameCount)
      gameCount += 1;
      // console.log(gameCount)
      resetGame()

    }
    else { resetGame()
    }
  }

  const handleClick = (row:number, col:number) =>{
    
    if(gameover === true || isDraw === true){
      return;
  
    }

    if(board[row][col]!==' '){
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[row][col] = currentPlayer;
    setBoard(updatedBoard);
    count += 1;

    checkWinner()

    if(currentPlayer === 'black'){
      setCurrentPlayer('white')
    }
    else{
      setCurrentPlayer('black')
    }
    }

  const renderCell = (row: number, col: number) =>{
    const cellValue = board[row][col];
    const cellClass = cellValue === 'black' ? 'player1' : cellValue === 'white' ? 'player2' : 'empty';

    return(
      <div
      key={`${row}-${col}`}
      id={`${row}-${col}`}
      className={`${cellClass}`}      
      onClick={()=> handleClick(row, col)}/>
    )

  }

  const resetGame = () =>{
    setCurrentPlayer('black')
    setGameOver(false)
    setIsDraw(false)
    setBoard(initialBoard)
    count = 0
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
        {currentPlayer && gameover === false && isDraw === false && <h2>Current Player: {currentPlayer}</h2>}
        {gameover && <h2> Congratulations {winner} You won!</h2>}
        {isDraw && <h2> No more available moves! it's a draw</h2>}

      </div>


      <div className="board">
        {renderBoard()}
      </div>
      <div className="options">
        <button onClick={resetGame}>Restart</button>
        <button onClick={() => leaveGame()}>Leave</button>
      </div>

    </div>
  )
  }
