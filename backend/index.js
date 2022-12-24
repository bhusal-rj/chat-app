const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const app=express();

app.use(cors());
app.use(express.json())

//connect to the database
mongoose.connect(process.env.MONGO_URL,{
    useNewURLParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Database has been connected successfully"))
    .catch((err)=>console.log(err))

const server= app.listen(process.env.PORT,()=>{
    console.log("Connected to the servert Port", process.env.PORT);
})