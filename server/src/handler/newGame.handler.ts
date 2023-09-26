import express, {Request, Response} from 'express'
import validate from '../middleware/validateSchema';
import { createGameSchema } from '../schema/game.schema';
import { createGame } from '../service/game.service';
import { deserializeUser } from '../middleware/deserialiseUser';

const newGameRouter = express.Router();
newGameRouter.use(deserializeUser)

newGameRouter.post("/", async(req:Request, res:Response)=> {

    try{
        const boardSize = req.body.boardSize

        console.log(boardSize)

        const game = {
            "gameBoard": Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => ' ')),
            "turnOrder": [],
            "winner": ''
        }

        const newGame = await createGame({...game})

        console.log(newGame)

        return res.status(200).json(newGame, )

    }
    catch(err){
        console.log("error creating new game: ", err)
        return res.status(500).json({ err: "Internal server error"})


    }






})

export default newGameRouter