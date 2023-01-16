import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import ChatInput from './ChatInput';
import Logout from './Logout';
import Messages from './Messages';
import axios from "axios";
import { getAllMessages, sendMessageRoutes } from '../utils/API';


function ChatContainer({user, currentChat, showEmojiPicker, setShowEmojiPicker, socket}){
   const [messages,setMessages]= useState([]);
   console.log("Jell")
   const [arrivalMessage, setArrivalMessage]=useState(null);
    const handleSendMsg=async (msg)=>{
        await axios.post(sendMessageRoutes,{
            from: user.email,
            to:currentChat.email,
            message:msg
        })

        socket.current.emit("send-msg",{

        
        to:currentChat.email,
        from: user.email,
    message:msg});
    const msgs=[...messages];
    msgs.push({fromSelf:true, message:msg});
    setMessages(msgs)
    }

    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-receive",msg=>{
                setArrivalMessage({fromSelf:false, message:msg});

            })
        }
    })

    useEffect(()=>{
        arrivalMessage && setMessages([...messages, arrivalMessage])
    },[arrivalMessage])

    useEffect(()=>{
        async function getAllMessage(){
            console.log("Hello")
            const {data}= await axios.post(getAllMessages,{
                from: user.email,
                to:currentChat.email
            });
            
            setMessages(data)
        }
        getAllMessage();

    }, [currentChat]);
    return(
        <>
        <Container>
            <div className='user'>            
            <div className="user-detail">
                <div className="avatar">
                <img src={`data:image/svg+xml;base64, ${currentChat?.avatarImage}`}  />
                </div>
                <div className="username">
                    <h3>{currentChat?.username}</h3>
                </div>
                
            </div>
            <Logout/>
            </div>
            
            <div className="chat-messages">
                <Messages messages={messages}/>
                

            </div>
            <div className="chat-input">
                <ChatInput handleSendMsg={handleSendMsg} showEmojiPicker setShowEmojiPicker={setShowEmojiPicker}/>
            </div>
            </Container>
        </>
    )
}

export default ChatContainer;

const Container=styled.div`
    padding-top: 1rem;
    /* justify-content: space-between; */
    /* align-items: center; */
    display: grid;
    grid-template-rows: 10% 83% 17%;
    gap:0.1rem;
    overflow: auto;
    padding: 1rem 2rem;
    @media screen and (min-width: 720px) {
     grid-auto-rows: 15% 70% 15%;
    }
    .user{
        display: grid;
        grid-template-columns: 90% 10%;
    .user-detail{
        display: flex;
        align-items: center;
        
        gap:1rem;
        .avatar{
            img{
                height: 3rem ;
            }
        }

        .username{
            h3{
                color: white;
            }
        }
    }
}
`