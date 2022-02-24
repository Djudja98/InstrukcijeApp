import Request from '../models/Request.js';
import mongoose from 'mongoose';

export const createRequest = async (req, res)=>{
    const request = req.body;
    const newRequest = new Request({...request});
    try{
        await newRequest.save();
        res.status(201).json(newRequest);
    }catch(error){
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const getRequests = async (req, res)=>{
    try{
        const requests = await Request.find({
            receiverId: req.params.receiverId
        });
        res.status(200).json(requests);
    }catch(error){
        res.status(500).json({message: 'Something went wrong'}); 
    }
}

export const deleteRequest = async (req, res)=>{
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send('No request with that id');
        }
        await Request.findByIdAndRemove(id);
        res.json({message: 'Deleted'});
    }catch(error){
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const updateRequest = async (req, res)=>{
    try{
        const {id} = req.params;
        const request = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send('No request with that id');
        }
        await Request.findByIdAndUpdate(id, {...request});
        res.json({message: 'Updated'});
    }catch(error){
        res.status(500).json({message: 'Something went wrong'});
    }
}