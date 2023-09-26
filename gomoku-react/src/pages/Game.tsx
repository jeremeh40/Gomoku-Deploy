/*Game page that implements Gomoku 5 in a row game with customisable 
board size and determine winner and tied game*/

/* import components and set variables for gomoku game*/
import { useState, useContext } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context";
import { put,del } from "../utils/http";
import { game } from "../types/game";

export default function Game() {
  //define user or authentication
  const {user} = useContext(UserContext);
  const {gameId} = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

   //import size of board from home page
  const {state} = useLocation()
  const game = state
  const API_HOST = process.env.API_HOST || ''

  const blankBoard: string[][] = game.game.gameBoard
  const turnOrder: string[] = game.game.turnOrder

  console.log(gameId)

  // define states of the game board, game turns, currentplayer, gameover, and if a draw occurs
  
  
  // const navigate = useNavigate();
  const [board, setBoard] = useState(blankBoard);
  let [currentPlayer, setCurrentPlayer] = useState('black');
  const[isWinner, setisWinner] = useState('')
 

  /* Function that handles the click on each game cell and updates the board and
  turn order and also checks for a winner with each click */

  const handleClick = async (row:number, col:number) =>{
    try{
    //block clicks if game is over 

    if(isLoading === true){
      return;
    }

    if(isWinner!== ''){
      return;
    }


    //blocks clicks on already clicked on cells
    if(board[row][col]!==' '){
      return;
    }

    const coordinate = `${row}-${col}`
    turnOrder.push(coordinate)

    console.log("turnOrder: " +turnOrder)
    console.log("pieceCoordinate:"+ coordinate)
    console.log("player:" +currentPlayer)


    setIsLoading(true)

    const playerTurn:game = await put(`${API_HOST}/api/game/${gameId}`,{
      pieceCoordinate: coordinate,
      turnOrder: turnOrder,
      currentPlayer: currentPlayer     

    })

    setIsLoading(false)

    const newBoard =playerTurn.gameBoard
    setisWinner(playerTurn.winner)

    //board and turn order updated with each click
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
