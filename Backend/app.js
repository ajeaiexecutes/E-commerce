import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session'

import router from './Routes/routes.js';
import MongoStore from 'connect-mongo';
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const app = express();

 async function connectDB(){
try{
	await mongoose.connect(process.env.MONGO_URI);
	console.log('mongo db connected');
}

catch (error){
 console.log(error)
}
}

await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//to allow these ports can access
app.use(cors({
    origin : ['http://localhost:5173','http://localhost:5174','http://localhost:5176','http://beyours.duckdns.org','https://be-yours.vercel.app'],
	methods: ["GET", "POST", "PUT", "DELETE"],
    credentials : true,
}))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));


app.use(session({
   secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        client:mongoose.connection.getClient(),
        collectionName:'sessions'
    }),
   cookie: { 
       secure:false,
       maxAge: 1000 * 60 * 60
    }
}));
app.use('/', router)





app.get('/check',(req,res)=>{
	console.log("CHECK ROUTE HIT");
 res.status(200).send("check sucessfull")
})
app.listen(process.env.PORT || 3000,'0.0.0.0', () => {
    console.log('running');
})




