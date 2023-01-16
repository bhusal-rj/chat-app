import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {FaLock} from 'react-icons/fa'
function Logout(){
    const navigate=useNavigate();

    const handleClick=async()=>{
        localStorage.clear();
        navigate('/login')

    }
    return(
        <>

            <Button onClick={handleClick}>
                <FaLock color='#ffffff'/>
            </Button>
            
        </>
    )
}

export default Logout;

const Button=styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    background-color:transparent;
    border: none;
    cursor: pointer;

    
`
