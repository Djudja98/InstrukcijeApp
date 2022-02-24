import axios from "axios";
import {io} from 'socket.io-client';
import { useState, useEffect, useRef } from "react";
import * as api from '../../api';

import Conversation from "../Conversations/Conversation";
import Message from "../message/Message";
import "./messenger.css";

const Messenger = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const socket = useRef();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [myPicture, setMyPicture] = useState("");
    const scrollRef = useRef();

    useEffect(() =>{
        socket.current = io("ws://localhost:9000");
        socket.current.on("getMessage", data=>{
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        });
    }, []);

    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)
        && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);
    
    useEffect(() =>{
        socket.current.emit("addUser",user.result._id);
        socket.current.on("getUsers", users=>{
            console.log(users);
        })
    }, [])

    useEffect(()=>{
        const getConversations = async () =>{
            try{
                const res = await api.getConversation(user.result._id);
                setConversations(res.data);
            }catch(error){
                console.log(error);
            }
        };
        const getMyPic = async () =>{
            const pic = await api.getUserPictureById(user.result._id);
            setMyPicture(pic.data);
        }
        getConversations();
        getMyPic();
    },[user.result._id]);

    useEffect(()=>{
        const getMessages = async ()=>{
            try{
                const result = await axios.get("/messages/"+currentChat?._id);
                setMessages(result.data);
            }catch(error){
                console.log(error);
            }
        };
        
        getMessages();

    },[currentChat]);

    useEffect(()=> {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    },[messages]);

    const handleSendMessage = async (e) =>{
        e.preventDefault();
        const message = {
            sender: user.result._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(member => member !== user.result._id);

        socket.current.emit("sendMessage",{
            senderId: user.result._id,
            receiverId: receiverId,
            text: newMessage,
        })

        try{
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        }catch(error){
            console.log(error);
        }
    };

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    {conversations.map((con) =>(
                        <div key={con._id} onClick={()=>setCurrentChat(con)}>
                            <Conversation conversation={con} myId={user.result._id} />
                        </div>
                    ))} 
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat ?
                    <>
                    <div className="chatBoxTop">
                        {messages.map(m => (
                            <div key={m._id} ref={scrollRef}>
                                <Message message={m} ownMessages={m.sender === user.result._id}
                                    picture={myPicture}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea 
                        className="chatMessageInput" 
                        placeholder="write a message..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}></textarea>
                        <button 
                        className="chatSubmitButton"
                        onClick={handleSendMessage}>Send</button>
                    </div>     
                    </> : <span className="noConversationText">Open a conversation to see messages</span>
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Messenger;