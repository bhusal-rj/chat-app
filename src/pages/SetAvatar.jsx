import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/API";
import {Buffer} from 'buffer'

function SetAvatar(){
    const api="https://api.multiavatar.com/45678945";
    const [avatars,setAvatars]=useState([]);
    const [isLoading,setIsLoading]= useState(true);
    const [selectedAvatar,setSelectedAvatar]= useState(undefined);
    const navigate=useNavigate();
    const toastOption = {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      };
      useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('userInfo'));
        if(user.isAvatarImage) navigate("/");
        async function callAvatarApi(){
            const data=[];
            for(let i=0;i<4;i++){
                const image= await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
                const buffer=new Buffer(image.data);
                data.push(buffer.toString("base64"))
            }
            setAvatars(data);
            setIsLoading(false);
        }
       callAvatarApi();
      },[])

      const setProfilePic=async()=>{
        const {email}= JSON.parse(localStorage.getItem('userInfo'))
        
        if(selectedAvatar===undefined){
            toast.error("Please select an avatar", toastOption)
        }else{
            // console.log(email)
            const user=await JSON.parse(localStorage.getItem('userInfo'));
            const {data}=await axios.post(`${setAvatarRoute}`,{
                image:avatars[selectedAvatar],
                email

            });
           
            if(data.isSet){
                user.isAvatarImage=true;
                user.avatarImage=data.image;
                localStorage.setItem("userInfo",JSON.stringify(user));
                navigate('/')
            }else{
                toast.error("Error setting up the avatar. Please try again!", toastOption);
            }

        }
      }
    return(
        <>
        <Container>
            <div className="title-container">
                <h1>Pick an avatar as your profile pic</h1>
            </div>
            <div className="avatars">
                {
                    avatars.map((avatar,index)=>{
                        return(
                            <div className={`avatar ${selectedAvatar==index ? "selected":''  }`} key={index}>
                                <img src={`data:image/svg+xml;base64, ${avatar}`} onClick={()=>setSelectedAvatar(index)} />
                            </div>
                        )
                    })
                }
            </div>
            <button className="submit-btn" onClick={setProfilePic}>Set as Profile Picture</button>
        </Container>
        <ToastContainer />
        </>
        
    )
}

export default SetAvatar;

const Container=styled.div`

display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;

    .title-container{
        h1{
            color: white;
        }
    }

    .avatars{
        display: flex;
        gap:2rem;
        .avatar{
            border:0.4rem solid transparent;
            justify-content: center;
            transition: 0.5s ease-in-out;
            cursor: pointer;
            border-radius: 5rem;
            padding: 0.4rem;
           
            img{
                height: 6rem;
            }
        }
        .selected{
                border:0.4rem solid #4e0eff;
            }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      transition: 0.5ms ease-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
`