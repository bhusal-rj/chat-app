const User= require('../models/userModel')
const bcrypt=require('bcrypt');
const hashPassword = require('../utils.js/hashPassword');
const createJWT = require('../utils.js/createJWT');


module.exports.register=async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        
        const usernameCheck= await User.findOne({username});
        if(usernameCheck){
            return res.status(400).json({msg:"Username already used", status:false});
        }
        const emailCheck=await User.findOne({email});
        if(emailCheck){
            return res.status(400).json({msg:"Email already exist", status:false});
        }
        
        password=await hashPassword(password);
        let user=await User.create({email,username,password});
        user.password=null;
        const token=await createJWT(user.email,user.username);
        return res.status(200).json({msg:"User created successfully",token,user, status:true})
    }catch(error){
        console.log(error);
    }
}

module.exports.login=async(req,res,next)=>{
    const {username, password}=req.body;
    const findUser=await User.findOne({username});
   
    if(!findUser) return res.status(400).json({msg:"Invalid Username Provided", status:false});
    const passResult=bcrypt.compareSync(password, findUser.password)
    
    if(!passResult) return res.status(400).json({msg:"Incorrect Password", status:true});

    const token=await createJWT(findUser.email, findUser.username);
    findUser.password=null;
    return res.status(200).json({msg:"User Logged In Successfully", token, user:findUser, status:true})
}

module.exports.setAvatar=async(req,res,next)=>{
    try{
        
        const {image,email}=req.body;
        const user=await User.findOneAndUpdate({email},{
            isAvatarImage:true,
            avatarImage:image
        });
        
        return res.status(200).json({isSet:user.isAvatarImage,image})
    }catch(ex){
        next(ex);
    }
    
}

module.exports.getAllUsers= async(req,res,next)=>{
    try{
       
        const email=req.params.email;
        const currentUser= await User.findOne({email});
        const allUsers= await User.find({_id:{$ne:currentUser.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ]);
        return res.json(allUsers)

    }catch(err){
        console.log(err);
    }
}