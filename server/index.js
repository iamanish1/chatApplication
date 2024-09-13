import express from 'express';
import dotenv from 'dotenv' ; 
import cors from 'cors';
import { connectDB } from './config/connectDB.js';
import { Route } from './routes/userRoutes.js';
dotenv.config() ;

const app = express();
app.use(cors({
    origin: process.env.FRONT_URI,  // allows all origins
    methods: 'GET, POST, PUT, DELETE',  // allows all HTTP methods
    credentials: true,  // enables cookies
}))

app.use(express.json());
app.use('/api',Route)

app.get('/',(req,res)=>{
    res.send('Hello, World!');
})

connectDB().then(()=>{
    app.listen(process.env.PORT||3000, ()=>{
        console.log('Server is running on port 8000');  // logs the server is running on port 8000
    })
})

