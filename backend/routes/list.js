import express from "express";
import mongoose from "mongoose";
const router = express.Router();
const List = require('../models/list.js');
const User = require('../models/User.js');

router.post('/addTask', async(req,res)=>{
    try {
    const {title,body,email} = req.body;
    const existingUser =  await User.findOne({email});
    if(existingUser){
        const list = new List({email,body,user:existingUser});
        await list.save();
        console.log('list added:'+list);
        
        existingUser.lists.push(list);
        await existingUser.save();
        console.log('User updated:'+existingUser);
    }
    if(!existingUser){
        return res.status(400).json({message:'You have to login 1st'})
    }
    res.status(200).json({message:'Note added successfully'});
    } catch (error) {
                return res.status(400).json({message:error.message});
    }
})
