import express, { Request, Response} from 'express';
import { getGamebyId } from '../service/game.service';
import { createGameSchema, getGameByIdSchema } from '../schema/game.schema';
import validate from '../middleware/validateSchema';
import { deserializeUser } from '../middleware/deserialiseUser';

const getGameRouter = express.Router()
getGameRouter.use(deserializeUser)

getGameRouter.get('/:_id', validate(getGameByIdSchema), async(req: Request, res: Response) =>{
    try{
        const gameId = req.params._id
        const userId = req.userId

        console.log(gameId)

        const game = await getGamebyId(gameId, userId)

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