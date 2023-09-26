/*Handle the request to get specific game in database using _id of game and responds with this to front end*/

import express, { Request, Response} from 'express';
import { getGamebyId } from '../service/game.service';
import { createGameSchema, getGameByIdSchema } from '../schema/game.schema';
import validate from '../middleware/validateSchema';
import { deserializeUser } from '../middleware/deserialiseUser';

const getGameRouter = express.Router()
getGameRouter.use(deserializeUser)

//Handle get request from front end, validates game Schema, and responds with specific game that user requests

getGameRouter.get('/:_id', validate(getGameByIdSchema), async(req: Request, res: Response) =>{
    try{
        const gameId = req.params._id
        const userId = req.userId

        const game = await getGamebyId(gameId, userId)

        if(!game) return res.sendStatus(404)

        return res.status(200).json({ ...game})
        }
    catch(err){
        console.log("error retrieving game: ", err)
        return res.status(500).send(err)
    }
})

export default getGameRouter