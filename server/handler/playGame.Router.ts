import express, { Request, Response} from 'express';
import { deserializeUser } from '../src/middleware/deserialiseUser';

const playGameRouter = express.Router();
playGameRouter.use(deserializeUser)

let board: string[][] = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ' '));

function initialBoard(size: number) {
    const emptyBoard: string[][] = Array.from({ length: size }, () => Array.from({ length: size }, () => ' '));

    return emptyBoard;
}

const checkWinner = (board: string[][], boardSize: number, player: string) =>{

    let winner:string = 'continue';

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
      if (board.some(row => !row.includes(' '))){
        winner = 'draw'
        return winner
    }

    return winner

        
      }

playGameRouter.put("/", async (req: Request, res: Response) => {
    try{

        const pieceCoordinate = req.body.coordinate
        const boardSize: number = req.body.boardSize
        const player: string = req.body.player

        console.log(pieceCoordinate)
        console.log(boardSize)
        console.log(player)

        const r: number = parseInt(pieceCoordinate.split('-')[0])
        const c: number = parseInt(pieceCoordinate.split('-')[1])        
       
        if (boardSize && boardSize !== board.length){
            board = initialBoard(boardSize)
        }
        board[r][c] = player
        const result = checkWinner(board, boardSize, player)
        const response = {
            "result": result
        }
        res.status(200).json(response)
    }
    catch(err){
        return res.status(500).send(err)
    }


})
export default playGameRouter