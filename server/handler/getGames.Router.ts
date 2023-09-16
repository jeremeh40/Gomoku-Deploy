import express, { Request, Response} from 'express';
import validate from '../src/middleware/validateSchema';

import { getAllGames } from '../src/service/game.service';

const getGameRouter = express.Router()

getGameRouter.get('/' , async(req: Request, res: Response) =>{

    try{
        const games = await getAllGames()

        return res.status(200).send(
            games.map((m) =>({
                _id: m._id,
                winner: m.winner,
                date: m.createdAt


            })
        ))

    }
    catch(err){
        console.log("error retrieving games: ", err)
        return res.status(500).send(err)
    }


})

export default getGameRouter