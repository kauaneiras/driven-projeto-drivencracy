import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URL);
let db = null;
try {
    await mongoClient.connect();
    db = mongoClient.db('drivencracy');
    console.log("database foi conectado com sucesso");
} catch (err) {
    console.log("Erro ao conectar no banco de dados: ", err);
}

export default db;