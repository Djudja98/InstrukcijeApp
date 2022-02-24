import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try{
        const existingUser = await User.findOne({ email });
        if(!existingUser){
            return res.status(404).json({message: "User doesnt exist"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }

        //OVO TEST TREBA PROMIJENITI U ENV DA BUDE PRAVI SECRET KEY
        const token = jwt.sign({ email: existingUser.email, id:existingUser._id}, 'test', {expiresIn:"1h"});
        const{picture, ...other} = existingUser._doc; // da ne vracam sliku dzabe u user local storage
        res.status(200).json({ result: other, token});
    }catch(error){
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const signup = async (req, res) => {
    const { email, password, firstName, lastName, picture} = req.body;
    try{
        const existingUser = await User.findOne({ email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`, picture:picture});
        const token = jwt.sign({ email: result.email, id: result._id}, 'test', {expiresIn:"1h"});
        res.status(200).json({result, token});
    }catch(error){
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const getUser = async (req, res)=>{
    try{    
        const user = await User.findById(req.params.id);
        const {password,picture, ...other} = user._doc;
        res.status(200).json(other);

    }catch(error){
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const getUserImg = async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {picture} = user._doc;
        res.status(200).json(picture);

    }catch(error){
        res.status(500).json({message: 'Something went wrong'});
    }
}

//fali mi middleware auth za ovo i jos neke funkcije UPAMTI
export const updateUser = async (req, res)=>{
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No user with that id');
    }
    const user = await User.findByIdAndUpdate(_id, 
        {
            age: req.body.age,
            phone: req.body.phone,
            aboutMe: req.body.aboutMe,
    });
    const {password, picture, ...other} = user._doc;
    res.status(200).json(other);
}