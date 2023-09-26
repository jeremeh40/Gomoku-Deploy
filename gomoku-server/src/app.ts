import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import playGameRouter from './handler/playGame.Router';
import newGameRouter from './handler/newGame.handler';

import connectDB from '../util/connectDB';
import getGameRouter from './handler/getGame.router';
import getGamesRouter from './handler/getGames.Router';
import authHandler from './handler/auth.handler';
import cors from 'cors'

dotenv.config();

//connect database to server
connectDB();

const app: Express = express();
const port = process.env.PORT;

app.use(
    cors({
      origin: process.env.allowHost || true,
    })
  )

//API endpoints
app.use(express.json())
app.use('/api/game/', playGameRouter)
app.use("/api/newGame", newGameRouter)
app.use("/api/games", getGamesRouter)
app.use("/api/gameDetails", getGameRouter)
app.use("/api/auth", authHandler)


//run server
mongoose.connection.once('connected', () => {
    console.log("[server]: Connected to MongoDB")
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
    
})