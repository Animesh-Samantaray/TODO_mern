import express from 'express';
import mongoose from 'mongoose';
import  {connectDb}  from './conn.js';
import auth from './routes/auth.js'
import list from './routes/list.js';
import cors from 'cors';

const port = 1000;
const app=express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

connectDb();
app.listen(port,()=>{
    console.log('http://localhost/'+port);
})
app.use('/api/auth',auth);
app.use('/api/list',list);


app.get('/',(req,res)=>{
    res.send('hello');
}) 