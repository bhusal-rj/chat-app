const Messages = require("../models/messageModel");
const User = require("../models/userModel");

module.exports.addMessage=async(req,res,next)=>{
    try{
        
        const {from,to,message}=req.body;
        
        const fromId=await User.findOne({email:from});
        const toId=await User.findOne({email:to});
        
        const data=await Messages.create({
            message:{text:message,
                
                sender: fromId._id},
                users:[fromId._id,toId._id],
        });
        
        if(data) return res.json({msg:"Message added successfully"});
        return res.json({msg:"Failed to add message to database"})
    }catch(err){
        console.log(err)
    }
}

module.exports.getAllMessage=async(req,res,next)=>{
    try{
        const {from,to}=req.body;
        const fromId=await User.findOne({email:from}).select(["_id"]);
        const toId=await User.findOne({email:to}).select(["_id"]);
        
        let messages=await Messages.find({
            users:{
                $all:[fromId._id, toId._id]
            }
                
            
        }).sort({updatedAt:1});
        
        let updatedMsg=messages.map(msg=>{
            
            return({
            fromSelf: msg.message.sender.toString()===fromId._id.toString(),
            message: msg.message.text
        })
        
        })
        res.send(updatedMsg);
        

    }catch(err){
        console.log(err);
    }
}