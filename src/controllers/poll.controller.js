import db from "../database/db.js";
import dayjs from "dayjs";

async function PostPollController (req, res) {
    // {
    //     title: "Qual a sua linguagem favorita?",
    //         expireAt: "2022-02-28 01:00" 
    // }
    const { title, expireAt } = req.body;
    const poll = { title, expireAt };

    if (!expireAt) {
        poll.expireAt = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm");
    }

    try{
        await db.collection("polls").insertOne(poll);
        res.status(201).send([poll]);
    }catch(err){
        console.log(err);
    }
}

async function GetPollController (req, res) {
    const polls = await db.collection("polls").find({}).toArray();
    res.json(polls);
}

export { PostPollController, GetPollController };

