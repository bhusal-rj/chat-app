import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/API";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from 'socket.io-client';

function Chat() {
  const socket= useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  const [currentChat,setCurrentChat]=useState(undefined);
  const [showEmojiPicker,setShowEmojiPicker]=useState(0);
  const handleChatChange=(chat)=>{
        setCurrentChat(chat);
  }

  useEffect(()=>{
    
        let user =  localStorage.getItem("userInfo");
        user=JSON.parse(user);
        
        if (!user) {
          navigate("/login");
        } else {
          setCurrentUser(user);
        }
  },[]);

  
useEffect(()=>{
  console.log("Current User", currentUser)
  if(currentUser){
    socket.current=io(host);
    socket.current.emit("add-user", currentUser.email);
  }
},[currentUser])

  useEffect(() => {
    async function getAllUser() {
      const user =  JSON.parse(localStorage.getItem("userInfo"));
      
      if (user.isAvatarImage) {
       
        const {data}  = await axios.get(`${allUsersRoute}/${user.email}`);
        
        setContacts(data);
        
      } else {
        navigate("/setAvatar");
      }
    }
    
    getAllUser();
  }, []);
  return (
    <>
       <Container>
         <div className="container">
           
          <Contacts contacts={contacts} currentUser={currentUser} handleChatChange setCurrentChat={setCurrentChat} currentChat showEmojiPicker setShowEmojiPicker={setShowEmojiPicker}/>
          
          {currentChat===undefined ? <Welcome user={currentUser} /> : <ChatContainer user={currentUser} currentChat={currentChat} showEmojiPicker setShowEmojiPicker={setShowEmojiPicker} socket={socket}/>}
        </div> 
      </Container> 
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) {
      grid-template-columns: 40% 60%;
    }
  }
`;
export default Chat;
