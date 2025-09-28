import express from 'express';
import mongoose from 'mongoose';

const str='mongodb+srv://animeshsamantaray2_db_user:1111@user.7fve1jm.mongodb.net/?retryWrites=true&w=majority&appName=user'

export const connectDb = async()=>{
    try{
        await mongoose.connect(str,{
        useNewUrlParser: true,
      useUnifiedTopology: true,
        })

        console.log('connected database');
        
    }
    catch(err){
        console.log(err);
        
    }
}



