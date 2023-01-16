import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { verifyJWT } from "../utils/API";

async function verifyToken(){
    let userInfo=localStorage.getItem('userInfo');
    userInfo=JSON.parse(userInfo);
    const token=userInfo.token;
    
    const {data}= await axios.post(verifyJWT,{
            'token': token
    })
    if(!data.status){
        localStorage.removeItem('userInfo');
    }
    return data.status;
}

function ProtectForm({children}){
    const navigate=useNavigate();
      useEffect(()=>{
        let userInfo=localStorage.getItem('userInfo');
        if(userInfo){
        const result=verifyToken();
        if(result) navigate('/');
        }
    })
         return children
    
}

function ProtectChat({children}){
    const navigate=useNavigate();
    useEffect(()=>{
        let userInfo=localStorage.getItem('userInfo');
        if(userInfo){
            const result=verifyToken();
            if(!result) navigate('/login'); 
        }else{
            navigate('/login')
        }
        
    })

    return children;
    
}

export {ProtectForm, ProtectChat};