import { Router } from 'express';
import { GetPollController, PostPollController} from '../controllers/poll.controller.js';
import { PostPollMiddleware } from '../middlewares/poll.middleware.js';

export const PollRouter = Router();

PollRouter.get('/poll', GetPollController);
PollRouter.post('/poll', PostPollMiddleware, PostPollController);

