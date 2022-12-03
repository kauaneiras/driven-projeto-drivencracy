import {Router} from 'express';
import {getResultController} from '../controllers/result.controller.js';

export const ResultRouter = Router();

ResultRouter.get('/poll/:id/result', getResultController);
