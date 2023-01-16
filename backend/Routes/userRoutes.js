const express=require('express');
const { register,login,setAvatar, getAllUsers } = require('../controller/usersController');
const router=express.Router();

router.post("/register", register);
router.post("/login", login);
router.post('/setAvatar', setAvatar);
router.get("/allusers/:email", getAllUsers)

module.exports=router;