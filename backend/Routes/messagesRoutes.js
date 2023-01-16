const { getAllMessage, addMessage } = require('../controller/messageController');
const router=require('express').Router();

router.post("/add-messages", addMessage);
router.post('/get-all-messages', getAllMessage);

module.exports=router