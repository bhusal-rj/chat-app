
const mongoose=require('mongoose')


const msgSchema= new mongoose.Schema({

   message:{
    text:{
        type:String,
        required:true,
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: true,
    },
   },
   users: Array
   
},
{
    timestamps:true,
   })

const Messages= mongoose.model("Messages", msgSchema);



module.exports=Messages;