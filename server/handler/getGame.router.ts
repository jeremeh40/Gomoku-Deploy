import express, { Request, Response} from 'express';
import { getGamebyId } from '../src/service/game.service';
import { createGameSchema, getGameByIdSchema } from '../src/schema/game.schema';
import validate from '../src/middleware/validateSchema';

const getGameRouter = express.Router()

getGameRouter.get('/:_id', validate(getGameByIdSchema), async(req: Request, res: Response) =>{
    try{
        const gameId = req.params._id

        console.log(gameId)

        const game = await getGamebyId(gameId)

        console.log(game)

        if(!game) return res.sendStatus(404)

        return res.status(200).json({ ...game})




    }
    catch(err){
        console.log("error retrieving game: ", err)
        return res.status(500).send(err)
    }


})

export default getGameRouter