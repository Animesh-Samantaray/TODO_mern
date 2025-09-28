import express from "express";
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/register' , async(req,res)=>{
try {
    const {email,username,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,10)
    const user = new User({email,username,password:hashedPassword});
    await user.save();
    res.status(200).json({user:user});
} catch (error) {
      res.status(400).json({message:'User already exists'});
}
})

router.post('/login' , async(req,res)=>{
try {
    const {email,password} = req.body;
   const user = await User.findOne({email:email});
   if(!user){
    return res.status(404).json({message:'You dont have any id'});
   }
   const flag=bcrypt.compareSync(password,user.password);
   if(!flag){
    return res.status(400).json({message:'Wrong Password'});
   }
   const {password:pass,...others} = user._doc;
   res.status(200).json(others);
} catch (error) {
      res.status(400).json({message:error.message});
}
})


export default router;