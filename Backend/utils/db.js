import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";

//database creation
export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI
            // || "mongodb://127.0.0.1:27017/Thrifts"
        );

        console.log('mongo db connected');
        
    }
    catch (error) {
        console.log(error);
        
    }
}
