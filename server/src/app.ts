import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import connectDB from '../util/connectDB';

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response)=> {
    res.send('hello world');
});


mongoose.connection.once('connected', () => {
    console.log("[server]: Connected to MongoDB")
    app.listen(port, () => {
        console.log(`[server]: Server is runnng at http://localhost:${port}`);
    });
    
})