/* Game log page that takes previously completed game from local storage and renders
it to the page with the board, turn order and winner displayed */


import { useParams, useNavigate, Navigate } from "react-router-dom"
import { useLocalStorage } from "../hooks"
import { UserContext } from "../context";
import { useContext } from "react";

export default function Log() {

  //define Gamedata object

  type GameData = {
    board: string[][];
    turnOrder: string[];
  };

  //import games object from local storage
  const [games] = useLocalStorage<Record<string,GameData>>('games', {})
  // define page id for matching with game number
  const { id } = useParams()
  const navigate = useNavigate()
  const {user} = useContext(UserContext);

  // if user not logged in navigate to login page
  if(!user)
  return <Navigate to = '/login'/>;

  if(!id) return null

  /* function to render each Cell giving the cell an unique id, classname and turn order in the board
  Params: row and column of cell in 2d array, turns - array of order of turns of game
  returns: cell with id, classname, and turn number */

  const renderCell = (board: string[][], row: number, col: number, turns: string[]) => {
    const cellValue = board[row][col];
    const cellClass = cellValue === 'black' ? 'player1' : cellValue === 'white' ? 'player2' : 'empty';
    //define coordinate of cell
    const coordinate = `${row}-${col}`;
  
    //if cell coordinate is found in array of turns, index = turn number and is rendered to cells
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

    /* Function to render the game board. Maps the board state into rows and columns of cells created
  by the renderCell function 
  params: game board 2d array, and array of turn orders
  returns: rendered read only game board with turn order displayed*/
  

  const renderBoard = (board: string[][], turns: string[]) => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((_, colIndex) => renderCell(board, rowIndex, colIndex, turns))}
      </div>
    ))
  }

  /* Read only game board of previously completed game rendered to the page with turn order also displayed */

  return (
    <div>

    {Object.keys(games).map((key)=>{
    const gameNumber = key.split('-')[1]
    const winner = key.split('-')[0]
    //match page id and gamenumber to only display the desired game
    if(parseInt(gameNumber) === parseInt(id)){
      //define constants from local storage games Object
      const currentGame =games[winner+'-'+ gameNumber]
      const currentBoard: string[][] = currentGame['board']
      const currentTurns: string[] = currentGame['turnOrder']

       /* Read only game board of previously completed game rendered to the page with turn order also displayed */

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
