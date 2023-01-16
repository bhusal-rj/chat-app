const jwt=require('jsonwebtoken');
const router=require('express').Router();

router.post('/token',async(req,res,next)=>{
    try{
        const {token}=req.body;
        const resultVerification=await jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({email:resultVerification.email, status:true});   
    }catch(err){
        console.log(err)
        return res.json({status:false});
    }
   
})

module.exports=router;