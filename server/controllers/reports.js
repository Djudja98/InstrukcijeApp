import Report from '../models/Report.js';
import mongoose from 'mongoose';

export const createReport = async (req, res)=>{
    const report = req.body;
    const newReport = new Report({...report});
    try{
        await newReport.save();
        res.status(201).json(newReport);
    }catch(error){
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const deleteReport = async (req, res)=>{
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send('No report with that id');
        }
        await Report.findByIdAndRemove(id);
        res.json({message: 'Deleted'});
    }catch(error){
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const getReports = async (req, res)=>{
    try{
        const reports = await Report.find({});
        res.status(200).json(reports);
    }catch(error){
        res.status(500).json({message: 'Something went wrong'}); 
    }
}