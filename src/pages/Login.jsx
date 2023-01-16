import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link,useNavigate } from "react-router-dom";
import Logo from "../assests/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoutes } from "../utils/API";


function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    
  });
  const navigate=useNavigate();
  const toastOption = {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, username } = values;
    
    
     if (username[0].length < 3) {
      toast.error("Username must be at least 3 characters long", toastOption);
      return false;
    }else if (password[0].length < 8) {
      toast.error("Password must be 8 characters long", toastOption);
      return false;
    }else return true;


  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(handleValidation()){
      let {password,username}=values;
      
      [password]=password;
      [username]=username;
      try{
        const {data}=await axios.post(loginRoutes,{
          password,username
        })
        
        if(data.status===true){
          const dataToBeStored={
            token:data.token,
            email:data.user.email,
            username:data.user.username,
            isAvatarImage:data.user.isAvatarImage,
            avatarImage:data.user.avatarImage
          }
          
          localStorage.setItem('userInfo', JSON.stringify(dataToBeStored));
          toast.success(data.msg, toastOption);
          setTimeout(()=>{
            navigate("/");
          },3000);
        }
      }catch(err){
        toast.error(err.response.data.msg,toastOption);
      }
      
      
      
    };
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>Chat-app</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
         
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
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

    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
