import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import List  from '../models/list.js';
import User from'../models/User.js';

router.post('/addTask', async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save();
      console.log('list added:' + list);
      existingUser.lists.push(list);
      await existingUser.save();
      console.log('User updated:' + existingUser);
    }

    if (!existingUser) {
      return res.status(400).json({ message: 'You have to login 1st' });
    }

    return res.status(200).json({ message: 'Note added successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


router.put('/updateTask/:id', async (req, res) => {
  try {
    const{title,body,email} = req.body;
    const {id} = req.params;
    const existingUser = await User.findOne({email});

    if(existingUser){
        await List.findByIdAndUpdate(id , {title,body});
        res.status(200).json({message:'Updated okkkk....'});
    }
    else{
      return res.status(400).json({ message: 'You have to login 1st' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/deleteTask/:id', async (req, res) => {
  try {
    const{email} = req.body;
    const {id} = req.params;
    const existingUser = await User.findOneAndUpdate({email},
        {$pull:{lists:req.params.id}}
    );

    if(existingUser){
        await List.findByIdAndDelete(id);
        res.status(200).json({message:'deleted okkkk....'});
    }
    else{
      return res.status(400).json({ message: 'You have to login 1st' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/getTasks/:id',async(req,res)=>{
    const {id} = req.params;
    const lists = await List.find({user:id});
    if(lists.length !==0)
    res.status(200).json({list:lists});
    else
        res.status(500).json({message:'no tasks'});

})

export default router;

