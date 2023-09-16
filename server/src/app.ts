import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import gameRouter from '../handler/game.Router';

import connectDB from '../util/connectDB';

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response)=> {
    res.send('hello world');
});

app.use(express.json())
app.use('/game', gameRouter)


mongoose.connection.once('connected', () => {
    console.log("[server]: Connected to MongoDB")
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
    
})