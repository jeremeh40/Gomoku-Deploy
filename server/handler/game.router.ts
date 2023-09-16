import express, { Request, Response} from 'express';
import mongoose from 'mongoose';

import validate from '../src/middleware/validateSchema';
import { createGameSchema, getBookingSchema } from '../src/schema/game.schema';
import { appendFile } from 'fs';

const listGamesRouter = express.Router();




