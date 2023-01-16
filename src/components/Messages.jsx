import React from "react";
import styled from "styled-components";

function Messages({ messages }) {
  return (
    <>
      <Container>
      <div className="chat-messages">
        {messages.map((msg) => {
          return (
            
<div className={`message ${msg.fromSelf ? "sent" : "received"}`}>
    <div className="content">
    <p>{msg.message}</p>
    </div>
              
            </div>

            
            
          );
        })}
        </div>
      </Container>
    </>
  );
}

export default Messages;

const Container = styled.div`

    .chat-messages{
      overflow: auto;
        padding:1rem 2rem;
        display: flex;
        flex-direction: column;
        gap:0.5em;
        

        .message{
          overflow: visible;
            display: flex;
            align-items: center;
            
        }

        .content{
            max-width: 40%;
            overflow-wrap: break-word;
            padding: 1rem;
            
            border-radius: 1rem;
            color: #d1d1d1;

            

        }
        .sent{
            justify-content: flex-end;
        
        .content{
            background-color: #4f04ff21;
        }
    }
    .received{
        justify-content: flex-start;
        .content{
            background-color: #9900ff20;
        }
    }
    }

    
`;
