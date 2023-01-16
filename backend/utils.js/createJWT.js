const jwt=require('jsonwebtoken');

module.exports= function createJWT(email,username){
    const token= jwt.sign({ email, username},process.env.JWT_SECRET, {expiresIn:'3d'});
    return token;
}