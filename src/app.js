import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();


//App use modules
app.use(cors());
app.use(express.json()); 

//App routes
import { PollRouter } from './routes/poll.router.js';
import { ChoiceRouter } from './routes/choice.router.js';
import { ResultRouter } from './routes/result.router.js';

//App use routes
app.use(PollRouter);
app.use(ChoiceRouter);
app.use(ResultRouter);

//Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
console.log("____________________________________________________");
console.log("|  ||  /|                                           |");
console.log("|  |/_|/     ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆      |");
console.log(`|  /. .|     Server is running on port ${port}...      |`);
console.log("| =|_Y_|=    ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆      |");
console.log("|  {>o<}                                            |");
console.log("|___________________________________________________|");
});