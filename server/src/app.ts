import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import playGameRouter from '../handler/playGame.Router';
import storeGameRouter from '../handler/storeGame.router';

import connectDB from '../util/connectDB';
import getGameRouter from '../handler/getGames.Router';

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response)=> {
    res.send('hello world');
});

app.use(express.json())
app.use('/game', playGameRouter)
app.use("/storeGame", storeGameRouter)
app.use("/games", getGameRouter)


mongoose.connection.once('connected', () => {
    console.log("[server]: Connected to MongoDB")
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
    
})