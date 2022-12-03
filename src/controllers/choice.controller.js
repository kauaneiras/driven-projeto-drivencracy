import db from "../database/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

async function PostChoiceController (req, res){
    const {title, pollId} = req.body;
    const choice = {title, pollId};

    try{
        const searchPoll = await db.collection("polls").findOne({_id: new ObjectId(pollId)});
        const searchChoice = await db.collection("choices").findOne({title : title, pollId: pollId});
        if(!searchPoll){
            res.status(404).json({message: "Poll not found"});
            return;
        }
        const expired = searchPoll.expiredAt;
        if(dayjs(expired).isBefore(dayjs())){
            res.status(403).json({message: "Poll expired"});
            return;
        }
        if(searchChoice){
            res.status(409).json({message: "Choice already exists"});
            return;
        }
        await db.collection("choices").insertOne(choice);
        res.status(201).json({message: "Choice created"});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

async function GetChoicesController (req, res){

    const id = req.params.id;
    try{
        const choices = await db.collection("choices").find({pollId: id}).toArray();
        if (!choices){
            res.status(404).json({message: "Choices not found"});
            return;
        }
        res.status(200).json(choices);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

async function PostChoiceVoteController (req, res){
    const id = req.params.id;
    const vote = {createdAt: dayjs().format('YYYY-MM-DD HH:mm'), choiceId: id};
    try{
        const searchChoice = await db.collection("choices").findOne({_id: new ObjectId(id)});
        if(!searchChoice){
            res.status(404).json({message: "Choice not found"});
            return;
        }
        const searchPoll = await db.collection("polls").findOne({_id: new ObjectId(searchChoice.pollId)});
        const expired = searchPoll.expiredAt;
        if(dayjs(expired).isBefore(dayjs())){
            res.status(403).json({message: "Poll expired"});
            return;
        }
        await db.collection("votes").insertOne(vote);
        res.status(201).json({message: "Vote created"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export {PostChoiceController, GetChoicesController, PostChoiceVoteController};
