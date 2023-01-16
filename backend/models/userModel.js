const mongoose=require('mongoose')
const bcrypt= require('bcryptjs')

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        unique:true,
        required:true,
        min:3,
        max:50
    },
    password:{
        type:String,
        require:true,
        min:8
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    isAvatarImage:{
        type: Boolean,
        default: false
    },
    avatarImage:{
        type:String,
        default:""
    }
})

const User= mongoose.model("Users", userSchema);



module.exports=User;