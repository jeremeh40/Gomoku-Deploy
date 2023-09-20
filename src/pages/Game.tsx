/*Game page that implements Gomoku 5 in a row game with customisable 
board size and determine winner and tied game*/

/* import components and set variables for gomoku game*/

import { useState, useContext } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks";
import { UserContext } from "../context";
import { put,del } from "../utils/http";
import { game } from "../types/game";

export default function Game() {
  //define user or authentication
  const {user} = useContext(UserContext);
  const {gameId} = useParams()
  const navigate = useNavigate()

   //import size of board from home page
  const {state} = useLocation()
  const game = state
  const API_HOST = process.env.API_HOST || ''

  const blankBoard: string[][] = game.game.gameBoard
  const turnOrder: string[] = game.game.turnOrder
  const winner: string = game.game.winner

  console.log(gameId)

  //define gameDate object to be saved into local storage
  type GameData = {
    board: string[][];
    turnOrder: string[];
  };

  // define states of the game board, game turns, currentplayer, gameover, and if a draw occurs
  
  
  // const navigate = useNavigate();
  const [board, setBoard] = useState(blankBoard);
  const [gameover, setGameOver] = useState(false);
  let [currentPlayer, setCurrentPlayer] = useState('black');
  const[isWinner, setisWinner] = useState('')


  /*checkWinner() function that loops through the 2d array 'board' and checks vertically, 
  horizontally, and diagonally for 5 pieces in a row. If 5 in a row found, then setGameOver function is run*/

  // const checkWinner = () =>{
  //   //horizontal check
  //   for(let r=0; r<boardSize; r++){
  //     for(let c = 0; c< boardSize - 4; c++){
  //         if (board[r][c] !== ' '){
  //             if (board[r][c] === board[r][c+1] && board[r][c+1] === board[r][c+2] && board[r][c+2] === board[r][c+3] && board[r][c+3] === board[r][c+4]){
                  
  //                 setGameOver(true)
  //                 winner = currentPlayer
                
  //                 return;
  //             }   
  //         }      
  //     }
  // }
  //   //vertical check
  //   for(let c=0; c<boardSize; c++){
  //     for(let r=0; r<boardSize -4 ; r++){
  //         if(board[r][c] !== ' '){
  //             if(board[r][c] === board[r+1][c] && board[r+1][c] === board[r+2][c] && board[r+2][c] === board[r+3][c] && board[r+3][c] === board[r+4][c]){
  //               setGameOver(true)
  //               winner = currentPlayer
  //               return;
  //             }
  //         }
  //     }
  // }
  //   //diagonal check
  //     for(let r=0; r<boardSize -4; r++){
  //         for(let c=0; c<boardSize -4; c++){
  //             if(board[r][c] !== ' '){
  //                 if(board[r][c] === board[r+1][c+1] && board[r+1][c+1] === board[r+2][c+2] && board[r+2][c+2] === board[r+3][c+3] && board[r+3][c+3] === board[r+4][c+4]){
  //                   setGameOver(true)
  //                   winner = currentPlayer
  //                   console.log(winner)
  //                   return;
  //                 }
  //             }
  //         }
  //     }
  //   //anti-diagonal check
  //     for(let r=4; r<boardSize; r++){
  //         for(let c=0; c<boardSize -4 ; c++){
  //             if(board[r][c] !== ' '){
  //                 if(board[r][c] === board[r-1][c+1] && board[r-1][c+1] === board[r-2][c+2] && board[r-2][c+2] === board[r-3][c+3] && board[r-3][c+3] === board[r-4][c+4]){
  //                   setGameOver(true)
  //                   winner = currentPlayer
  //                   return;
  //                 }
  //             }
  //         }
  //     }
  //     //if players have used all available turns that match the size of the board then draw state is set
  //     if(count === boardSize * boardSize){        
  //       setIsDraw(true)
  //       winner = 'Draw'
  //       return;
  //     }
  //       }
  
  /* function that is run when the leave game button is pressed. if game is over it 
  saves current game into localstorage and navigates user to games page and resets 
  game with resetGame() function
  if Game is not finished it will only reset the game*/
        
  // const leaveGame = () =>{

  //   if (gameover || isDraw){
  //     saveGames({...games, [`${winner}-${gameCount}`]: {board, turnOrder}})
  //     navigate('/games')      
  //     gameCount += 1;      
  //     resetGame()

  //   }
  //   else { resetGame()
  //   }
  // }

  /* Function that handles the click on each game cell and updates the board and
  turn order and also checks for a winner with each click */

  const handleClick = async (row:number, col:number) =>{
    try{
    //block clicks if game is over 

    if(isWinner!== ''){
      return;
    }


    //blocks clicks on already clicked on cells
    if(board[row][col]!==' '){
      return;
    }

    const coordinate = `${row}-${col}`
    turnOrder.push(coordinate)

    const playerTurn:game = await put(`${API_HOST}/api/game/${gameId}`,{
      pieceCoordinate: coordinate,
      turnOrder: turnOrder,
      currentPlayer: currentPlayer     

    })

    const newBoard =playerTurn.gameBoard
    setisWinner(playerTurn.winner)






    //board and turn order updated with each click
    // const updatedBoard = [...newBoard];
    setBoard(newBoard);


    // count += 1;
    // const updatedTurnOrder = [...turnOrder, `${row}-${col}`];
    // setTurnOrder(updatedTurnOrder);
    // //check for winner with each click
    // checkWinner()

    //change current player depending on previous player turn
    if(currentPlayer === 'black'){
      setCurrentPlayer('white')     
    }
    else{
      setCurrentPlayer('black')     
    }
    
  }
  catch(err){
    console.log(err)
  }
  }
  // onClick={()=> handleClick(row, col)}

  /* function to render each Cell giving the cell an unique id and classname in the board
  Params: row and column of cell in 2d array
  returns: cell with id, classname, and that runs handleclick function*/

  const renderCell = (row: number, col: number) =>{
    const cellValue = board[row][col];
    const cellClass = cellValue === 'black' ? 'player1' : cellValue === 'white' ? 'player2' : 'empty';

    return(
      <div
      key={`${row}-${col}`}
      id={`${row}-${col}`}
      className={`${cellClass}`}
      onClick={() => handleClick(row,col)}
     />

    )
  }

  /* function that resets game by setting all variables to their initial values */

  const resetGame = async () =>{
    try{
      
 
    await del(`${API_HOST}/api/game/${gameId}`)

    navigate('/')

  }
  
  catch(err){
    console.log(err)
  }}


  /* Function to render the game board. Maps the board state into rows and columns of cells created
  by the renderCell function */

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
      </div>
    ))
  }

  //checks that user is logged in and returns to login page if not logged in

  if(!user)
  return <Navigate to = '/login'/>;

  /* Render Game Board to page */

  return ( 

    <div className="main">
      <div className="game-info">
        {currentPlayer && isWinner === '' && <h2>Current Player: {currentPlayer}</h2>}
        {isWinner !== '' && <h2> Congratulations {isWinner} You won!</h2>}
        {winner === 'draw' && <h2> No more available moves! it's a draw</h2>}

      </div>


      <div className="board">
        {renderBoard()}
      </div>
      <div className="options">
        <button className="button" onClick={() => resetGame()}>Restart</button>
        <button className="button" disabled = {isWinner ===''} onClick={() => navigate('/games')} >Leave</button>
      </div>

    </div>
  )
  }
