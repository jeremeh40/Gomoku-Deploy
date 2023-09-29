/* Handle the playing of the gomoku game. Handle request from user with where a piece has been placed, update board,
calculate if there is a winner or draw, update board in database, and send updated board to frontend. Also handle delete request */
import express, { Request, Response} from 'express';
import { deserializeUser } from '../middleware/deserialiseUser';
import { deleteGameSchema, updateGameSchema } from '../schema/game.schema';
import { deleteGame, getGamebyId, updateGame } from '../service/game.service';
import validate from '../middleware/validateSchema'

const playGameRouter = express.Router();
playGameRouter.use(deserializeUser)

let count: number = 0;

//Function the check if there is a winner or draw in the gomoku game
const checkWinner = (board: string[][], boardSize: number, player: string) =>{

    let winner:string = '';

    //horizontal check
    for(let r=0; r<boardSize; r++){
      for(let c = 0; c< boardSize - 4; c++){
          if (board[r][c] !== ' '){
              if (board[r][c] === board[r][c+1] && board[r][c+1] === board[r][c+2] && board[r][c+2] === board[r][c+3] && board[r][c+3] === board[r][c+4]){
                  
                  winner = player                
                  return winner;
              }   
          }      
      }
  }
    //vertical check
    for(let c=0; c<boardSize; c++){
      for(let r=0; r<boardSize -4 ; r++){
          if(board[r][c] !== ' '){
              if(board[r][c] === board[r+1][c] && board[r+1][c] === board[r+2][c] && board[r+2][c] === board[r+3][c] && board[r+3][c] === board[r+4][c]){

                winner = player
                return winner;
              }
          }
      }
  }
    //diagonal check
      for(let r=0; r<boardSize -4; r++){
          for(let c=0; c<boardSize -4; c++){
              if(board[r][c] !== ' '){
                  if(board[r][c] === board[r+1][c+1] && board[r+1][c+1] === board[r+2][c+2] && board[r+2][c+2] === board[r+3][c+3] && board[r+3][c+3] === board[r+4][c+4]){
                 
                    winner = player
                    return winner;
                  }
              }
          }
      }
    //anti-diagonal check
      for(let r=4; r<boardSize; r++){
          for(let c=0; c<boardSize -4 ; c++){
              if(board[r][c] !== ' '){
                  if(board[r][c] === board[r-1][c+1] && board[r-1][c+1] === board[r-2][c+2] && board[r-2][c+2] === board[r-3][c+3] && board[r-3][c+3] === board[r-4][c+4]){
                
                    winner = player
                    return winner;
                  }
              }
          }
      }
      //if players have used all available turns that match the size of the board then draw state is set
      if(count === boardSize * boardSize){
        winner = 'draw'
        return winner
    }

    return winner        
      }

/*Handle Put request from user, update board using user turn, check for winner, store updated game object in database
and respond with updated game object to user*/

playGameRouter.put("/:_id", validate(updateGameSchema), async (req: Request, res: Response) => {
    try{

        const pieceCoordinate = req.body.pieceCoordinate
        const userTurnOrder = req.body.turnOrder
        const player: string = req.body.currentPlayer
        const gameId = req.params._id
        const userId = req.userId

        if (userTurnOrder.length === 1){
            count = 0
            
        }
        
        const r: number = parseInt(pieceCoordinate.split('-')[0])
        const c: number = parseInt(pieceCoordinate.split('-')[1])
        //get game buy id from database
        const game = await getGamebyId(gameId, userId)

        if(!game){
            return res.sendStatus(404)
        }

        const board = game.gameBoard;
        const boardSize = game.gameBoard.length
        const turnOrder = game.turnOrder
        turnOrder.push(pieceCoordinate)

        //update board and check for winner
        board[r][c] = player
        count +=1
        const result = checkWinner(board, boardSize, player)

        //if winner, then reset count and store winner
        if(result === "black" || result === "white" || result === "draw"){
            game.winner = result
            count = 0
        }
        //updated game Object
        const userGame = {
            gameBoard: board,
            turnOrder: turnOrder,
            winner: game.winner
        }

        //update game in database
        const changeGame = await updateGame(gameId, userId, {...userGame, userId})

        if(!changeGame) return res.sendStatus(404)
        //respond with updated game
        res.status(200).json(changeGame)
    }
    catch(err){
        return res.status(500).send(err)
    }
})

//Handle delete request from user when game is unfinished
playGameRouter.delete("/:_id", validate(deleteGameSchema), async (req:Request, res:Response)=> {
    const userId = req.userId
    const gameId = req.params._id
    await deleteGame(gameId, userId)

    return res.sendStatus(200)
})




// playGameRouter.put("/", async (req: Request, res: Response) => {
//     try{

//         const pieceCoordinate = req.body.coordinate
//         const boardSize: number = req.body.boardSize
//         const player: string = req.body.player

//         console.log(pieceCoordinate)
//         console.log(boardSize)
//         console.log(player)

//         const r: number = parseInt(pieceCoordinate.split('-')[0])
//         const c: number = parseInt(pieceCoordinate.split('-')[1])        
       
//         if (boardSize && boardSize !== board.length){
//             board = initialBoard(boardSize)
//         }
//         board[r][c] = player
//         const result = checkWinner(board, boardSize, player)
//         const response = {
//             "result": result
//         }
//         res.status(200).json(response)
//     }
//     catch(err){
//         return res.status(500).send(err)
//     }


// })
export default playGameRouter