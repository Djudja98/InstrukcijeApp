import axios from "axios";
import { useState, useEffect } from "react";
import * as api from '../../api';

import "./conversation.css";

const Conversation = ({conversation, myId}) => {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState("");

    useEffect(()=>{
        const friendId = conversation.members.find(mem => mem !== myId);
        const getPic = async () =>{
            try{
                const temp = await api.getUserPictureById(friendId);
                setImage(temp);
            }catch(error){
                console.log(error);
            }
        }
        getPic();
    }, []);

    useEffect(()=>{
        const friendId = conversation.members.find(mem => mem !== myId);

        const getUser = async ()=>{
            try{
                const res = await axios("/user/"+friendId);
                setUser(res.data);
            }catch(error){
                console.log(error);
            }
        };
        getUser();
    },[myId, conversation]);

    return (
        <div className="conversation">
            <img className="conversationImg" src= {image.data || "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"}
             alt="" />
            <span className="conversationName">{user?.name}</span>
        </div>
    );
}
 
export default Conversation;