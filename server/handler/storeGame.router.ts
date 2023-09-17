import express, { Request, Response} from 'express';
import mongoose from 'mongoose';
import validate from '../src/middleware/validateSchema';
import { createGameSchema } from '../src/schema/game.schema';
import { appendFile } from 'fs';
import { createGame } from '../src/service/game.service';
import { deserializeUser } from '../src/middleware/deserialiseUser';

const storeGameRouter = express.Router();
storeGameRouter.use(deserializeUser)

storeGameRouter.post("/", validate(createGameSchema), async(req: Request, res: Response) => {

    try{

        const userId = req.userId

        const game: {} = req.body
        console.log(game)
        const newGame = await createGame({...game, userId})
        return res.status(200).json(newGame)

    } catch (err){

        console.log("error storing the game: ", err)
        return res.status(500).json({ err: "Internal server error"})
    }





})

export default storeGameRouter

