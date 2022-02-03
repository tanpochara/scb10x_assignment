import express from "express";
import userSchema from '../models/userSchema.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const router = express.Router();
const secret = 'secret';

router.post('/login', async (req , res) => {
    try {
        const { email , password } = req.body;

        const user = await userSchema.findOne({email});

        if (!user) {
            return res.status(404).json({message : 'user does not exist'})
        }
        const correctPass = await bcrypt.compare(password , user.password)

        if (!correctPass) {
            return res.status(404).json({message : 'password incorrect'})
        }

        const token = jwt.sign({email : user.email , id : user._id}, secret , {expiresIn : '1h'});
        res.status(200).json({result: user,token});

    } catch (err) {
        res.status(500).json({message :err});
    }
})

router.post('/register' , async (req, res) => {
    try {
        const { firstName , lastName , email , password } = req.body;

        const user = await userSchema.findOne({email});
        
        if (user) {
            return res.status(404).json({message : 'email has already been used'})
        }

        const hashedPass = await bcrypt.hash(password,12);
        const userCreate = await userSchema.create({email : email , password : hashedPass , name : `${firstName} ${lastName}` });

        const token = jwt.sign({email: email , id : userCreate._id}, secret , {expiresIn : '1h'});
        res.status(200).json({token : token})

    } catch (error) {  
        res.status(500).json({message : 'something went wrong'});
        
    }
})

router.get('/getDb', async (req,res) => {
    try {
        const user = await userSchema.find();

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message : err});
    }
})

export default router;