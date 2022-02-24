import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
    title: String,
    senderName: String,
    accepted: Boolean,
    rejected: Boolean,
    senderId: String,
    receiverId: String,
    date: Date,
});

export default mongoose.model("Request", RequestSchema);