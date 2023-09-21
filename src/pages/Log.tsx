/* Game log page that takes previously completed game from local storage and renders
it to the page with the board, turn order and winner displayed */


import { useParams, useNavigate, Navigate } from "react-router-dom"
import { useLocalStorage } from "../hooks"
import { UserContext } from "../context";
import { useContext,useEffect,useState } from "react";
import {get} from "../utils/http"
import { game } from "../types/game";
import { object } from "zod";

export default function Log() {

  const { gameId } = useParams()
  console.log(gameId)
  const navigate = useNavigate()
  const {user} = useContext(UserContext);

  const API_HOST = process.env.API_HOST || ''

  const initialGameData:game = {
      gameBoard: [],
      turnOrder: [],
      winner: '',
      _id: '',
      createdAt: new Date()
  
    }


  const [gameDetails,setGameDetails] = useState<game>(initialGameData)


  //define Gamedata object

  type GameData = {
    board: string[][];
    turnOrder: string[];
  };

  //import games object from local storage
  const getGameDetails = async () =>{
    try{
      console.log(gameId)

    const getGame = await get<game>(`${API_HOST}/api/gameDetails/${gameId}`)
    setGameDetails(getGame)
    console.log(gameDetails)
    const board = gameDetails.gameBoard
    const turns = gameDetails.turnOrder
    const winner = gameDetails.winner

    }
    catch(err){
      console.log(err)
    }


  } 

  useEffect(()=>{
    getGameDetails()
  },[])


  
  // define page id for matching with game number
 
  // if user not logged in navigate to login page
  if(!user)
  return <Navigate to = '/login'/>;

  if(!gameId) return null

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



          /* Read only game board of previously completed game rendered to the page with turn order also displayed */

      return (

        <div>

          <div className="game-info">

          <h2> Winner: {gameDetails.winner}</h2>

          </div>


        <div className="board" key ={gameDetails._id}>
                  
        
          {renderBoard(gameDetails.gameBoard, gameDetails.turnOrder)}

        </div>

        <div className="options">  

          <button className="button" onClick={()=> navigate('/games')}>Back</button>

        </div>      

        </div>        
        
  )}