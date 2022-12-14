import db from "../database/db.js";
import { ObjectId } from "mongodb";

async function getResultController(req, res){
    const id = req.params.id;

    try{
        let votesArray = [];
        let index = 0;
        const choice = await db.collection('choices').find({ pollId: id }).toArray();
        const vote = await db.collection('votes').find({ }).toArray();
        const poll = await db.collection('polls').findOne({ _id: ObjectId(id) });

        if (!poll) {
            res.status(404).send({ message: "Poll not found" });
            return;
        }

        for (let i = 0; i < choice.length; i++) {
            choice[i].vote = 0;
            for (let j = 0; j < vote.length; j++) {
                if (choice[i]._id.toString() === vote[j].choiceId) {
                    choice[i].vote++;
                }
            }
            votesArray.push(choice[i].vote);
            if (choice[i].vote > votesArray[index]) {
                index = i;
            }
        }
        res.status(200).send({...poll, result: { title: choice[index].title, vote: choice[index].vote }});
        return;

    }catch(error){
        res.status(500).json({message: error.message});
        return;
    }

}

export { getResultController }

