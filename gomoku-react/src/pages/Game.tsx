/*Game page that implements Gomoku 5 in a row game. Performs put request to send user turn to server and
receives updated gameboard in response.

/* import components and set variables for gomoku game*/
import { useState, useContext } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context";
import { put,del } from "../utils/http";
import { game } from "../types/game";

export default function Game() {
  //define user and gameID
  const {user} = useContext(UserContext);
  const {gameId} = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

   //import created game
  const {state} = useLocation()
  const game = state
  const API_HOST = process.env.API_HOST || ''
  const blankBoard: string[][] = game.game.gameBoard
  const turnOrder: string[] = game.game.turnOrder

  // define states of the game board, currentplayer, and if there is a winner 
  const [board, setBoard] = useState(blankBoard);
  let [currentPlayer, setCurrentPlayer] = useState('black');
  const[isWinner, setisWinner] = useState('')
 

  /* Function that handles the click on each game cell, sends put request to server and receives updated board as response,
  updating UI board.
  */

  const handleClick = async (row:number, col:number) =>{
    try{

    //blocks clicking on cell if response not received
    if(isLoading === true){
      return;
    }

    //block clicks if there is a winner
    if(isWinner!== ''){
      return;
    }


    //blocks clicks on already clicked on cells
    if(board[row][col]!==' '){
      return;
    }

    const coordinate = `${row}-${col}`
    turnOrder.push(coordinate)
    setIsLoading(true)

    //put request sending player turn to server so that game result can be calculated.

    const playerTurn:game = await put(`${API_HOST}/api/game/${gameId}`,{
      pieceCoordinate: coordinate,
      turnOrder: turnOrder,
      currentPlayer: currentPlayer     

    })

    setIsLoading(false)

    //update gameboard using response from server

    const newBoard =playerTurn.gameBoard
    setisWinner(playerTurn.winner)
    setBoard(newBoard);


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
    setIsLoading(false)
  }
  }

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

  /* function that resets game, navigates to home page, and sends delete request to server */

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
        {(isWinner === 'black' || isWinner === 'white') && <h2> Congratulations {isWinner} You won!</h2>}
        {isWinner === 'draw' && <h2> No more available moves! it's a draw</h2>}

      </div>


      <div className="board">
        {renderBoard()}
      </div>
      <div className="options">
        <button className="button" disabled = {turnOrder.length === 0} onClick={() => resetGame()}>Restart</button>
        <button className="button" disabled = {isWinner ===''} onClick={() => navigate('/games')} >Leave</button>
      </div>

    </div>
  )
  }
