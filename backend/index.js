const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const userRoutes = require('./Routes/userRoutes');
const verifyRoutes=require("./Routes/verifyRoute");
const messageRoutes=require('./Routes/messagesRoutes');
require('dotenv').config();
const socket=require('socket.io');
const app=express();


app.use(cors(
    {
        origin:true
    }
));
app.use(express.json())
app.use("/api/auth", userRoutes);
app.use("/api/verify",verifyRoutes );
app.use('/api/messages', messageRoutes);

//connect to the database


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL,{
    useNewURLParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Database has been connected successfully"))
    .catch((err)=>console.log(err))

const server= app.listen(process.env.PORT,()=>{
    console.log("Connected to the servert Port", process.env.PORT);
})
global.onlineUsers= new Map();

const io=socket(server,{
    cors:{
        origin:process.env.ORIGIN,
        credentials:true,
    }
});

onlineUsers=new Map();


io.on("connection",(socket)=>{
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })

    socket.on("send-msg",(data)=>{
        socket.broadcast.emit("msg-receive", data.message);
    })
})