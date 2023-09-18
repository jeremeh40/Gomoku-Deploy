import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import playGameRouter from '../handler/playGame.Router';
import storeGameRouter from '../handler/storeGame.router';
import newGameRouter from '../handler/newGame.handler';

import connectDB from '../util/connectDB';
import getGameRouter from '../handler/getGame.router';
import getGamesRouter from '../handler/getGames.Router';
import authHandler from '../handler/auth.handler';

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response)=> {
    res.send('hello world');
});

app.use(express.json())
app.use('/game', playGameRouter)
app.use("/newGame", newGameRouter)
app.use("/games", getGamesRouter)
app.use("/game", getGameRouter)
app.use("/auth", authHandler)
app.use("/storeGame", storeGameRouter)


mongoose.connection.once('connected', () => {
    console.log("[server]: Connected to MongoDB")
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
    
})