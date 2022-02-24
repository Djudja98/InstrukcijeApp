import Conversation from '../models/Conversation.js';

export const createConversation = async (req, res)=>{
    const { senderId, receiverId} = req.body;

    const newConversation = new Conversation({
        members: [senderId, receiverId],
    });

    try{
        //ovo bas nije najpametnije ali ne da mi se sad bolje ganjati
        const existingConversation = await Conversation.findOne({members:[senderId,receiverId]});
        const existingConversation2 = await Conversation.findOne({members:[receiverId,senderId]});
        if(existingConversation || existingConversation2){
            return res.json({message:"User already added"});
        }
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(error){
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const getConversation = async (req, res)=>{
    try{
        const conversation = await Conversation.find({
            members: {$in:[req.params.userId]}
        });
        res.status(200).json(conversation);
    }catch(error){
        res.status(500).json({message: 'Something went wrong'}); 
    }
}