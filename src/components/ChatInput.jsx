import React,{useState} from 'react'
import styled from 'styled-components';
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'


function ChatInput({showEmojiPicker,setShowEmojiPicker,handleSendMsg}){
   
    const [msg,setMsg]=useState('');
    const handleEmojiPicker=()=>{
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick=(e,emoji)=>{
        
        let message=msg;
        message+=emoji.emoji;
        setMsg(message);
    }

    const sendChat=(e)=>{
        e.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('')
        }
    }
    return(
        <>
        <Container>
            <div className="button-container">
                <div className="emoji">
                    {/* <BsEmojiSmileFill onClick={handleEmojiPicker}/>
                    {
                        showEmojiPicker ? <Picker onEmojiClick={handleEmojiClick} /> : " "
                    } */}
                </div>
            </div>
            <form className='input-container' onSubmit={sendChat}>
                <input type="text" placeholder='Enter your message here' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                <button className="submit" onClick={sendChat}>
                    <IoMdSend />
                </button>
            </form>

        </Container>
        </>
    )
}

export default ChatInput;

const Container=styled.div`

    display: grid;
    position: absolute;
    bottom: 1px;
    width: 45%;
    
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: transparent;
    padding: 2rem;
    
    padding-bottom: 0.3rem;
    .button-container{
        display: flex;
        align-items: center;
        color:white;
        height: 20px;
        gap:2rem;
        .emoji{
            position: relative;
            svg{
                
                font-size: 1.5rem;
                color:#ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact{
                display: absolute;
                top: -400px;
                height: 50px;
            }

           
        }
    }

    .input-container{
        width: 100%;
        border-radius: 2rem;
        display: flex;
        background-color: transparent;
        background-color: #ffffff34;
        input{
            width: 95%;
            height: 40%;
            background-color: transparent;
            color: white;
            border: none;
            padding: 1rem;
            font-size: 1.2rem;
            &::selection{
                background-color: #9186f3;

            };

            &:focus{
                outline: none;
            }
        }
        button{
            padding: 0.2rem 1rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            cursor: pointer;
            border: none;
            svg{
                font-size:2rem;
                color: white;
            }
        }
    }
`