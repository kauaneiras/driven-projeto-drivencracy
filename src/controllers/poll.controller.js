import db from "../database/db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

async function PostPollController (req, res) {
    // {
    //     title: "Qual a sua linguagem favorita?",
    //         expireAt: "2022-02-28 01:00" 
    // }
    const { title, expireAt } = req.body;
    

    if (!expireAt || dayjs(expireAt).isBefore(dayjs()) || expireAt === "") {
        expireAt = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm");
    }

    try{
        await db.collection("polls").insertOne({ title, expireAt });
        res.status(201).send([{ title, expireAt }]);
    }catch(err){
        console.log(err);
    }
}

async function GetPollController (req, res) {
    try{
        const polls = await db.collection("polls").find({}).toArray();
        res.json(polls);
    }
    catch(err){
        res.status(500).send(err);
    }
}

export { PostPollController, GetPollController };