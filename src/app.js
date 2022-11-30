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



//App use routes
// --> POST/poll
// body: {title: "Qual a sua linguagem favorita?", expireAt: "2022-02-28 01:00"}
app.use(PollRouter);

// --> GET/poll
// Return all polls : [
// 	{
// 		_id: "54759eb3c090d83494e2d222",
//     title: "Qual a sua linguagem favorita?",
// 		expireAt: "2022-02-28 01:00" 
// 	},
// 	...
// ]

// --> POST/choice
// body: { title: "JavaScript", pollId: "54759eb3c090d83494e2d222",}


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