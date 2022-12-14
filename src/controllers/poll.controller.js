import db from "../database/db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

async function PostPollController (req, res) {
    // {
    //     title: "Qual a sua linguagem favorita?",
    //         expireAt: "2022-02-28 01:00" 
    // }
    const { title, expireAt } = req.body;
    const poll = { title, expireAt };

    if (!expireAt || dayjs(expireAt).isBefore(dayjs()) || expireAt === "") {
        poll.expireAt = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm");
    }

    try{
        await db.collection("polls").insertOne(poll);
        res.status(201).send([poll]);
        return;
    }catch(err){
        res.status(500).send(err);
        return;
    }
}

async function GetPollController (req, res) {
    try{
        const polls = await db.collection("polls").find({}).toArray();
        res.send(polls.reverse());
        return;
    }
    catch(err){
        res.status(500).send(err);
        return;
    }
}

export { PostPollController, GetPollController };