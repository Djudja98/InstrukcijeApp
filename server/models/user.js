import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    picture: {type: String, required: false},
    phone: {type: String, required: false},
    aboutMe: {type :String, required: false},
    age : {type: Number, required: false},
    id: {type: String}
})

export default mongoose.model("User", userSchema);