import mongoose from 'mongoose';

//malo je logicki neispravno, senderName je username usera koji je napravio post
//senderID je ID usera koji je naprabio post, ne da mi se mijenjati sad
const ReportSchema = new mongoose.Schema({
    title: String,
    senderName: String,
    senderId: String,
    postId: String,
    description: String,
});

export default mongoose.model("Report", ReportSchema);