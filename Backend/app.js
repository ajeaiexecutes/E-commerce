import express from 'express';
import session from 'express-session'
import { connectDB } from './utils/db.js';
import router from './Routes/routes.js';
import MongoStore from 'connect-mongo';
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


await connectDB();
//to allow these ports can access
app.use(cors({
    origin : ['http://localhost:5173','http://localhost:5174','http://localhost:5176'],
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
        mongoUrl: "mongodb://localhost:27017/Thrifts",
        collectionName:'sessions'
    }),
    cookie: { //secure:false
        maxAge: 1000 * 60 * 60
    }
}));




// app.use((req, res, next) => {
//     console.log(req.session); next()
// })

// app.post('/login', (req,res) => {
//     console.log("came");
    
// })
app.use('/', router)

console.log(process.env.PORT);


app.listen(process.env.PORT || 3000, () => {
    console.log('running');
})



