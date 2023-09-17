import express, { Request, Response} from 'express';
import validate from '../src/middleware/validateSchema';
import { deserializeUser } from '../src/middleware/deserialiseUser';

import { getAllGames } from '../src/service/game.service';

const getGamesRouter = express.Router()
getGamesRouter.use(deserializeUser)

getGamesRouter.get('/' , async(req: Request, res: Response) =>{

    const userId = req.userId

    try{
        const games = await getAllGames(userId)
        console.log("got all games")

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

export default getGamesRouter