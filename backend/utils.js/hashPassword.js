const bcrypt=require('bcryptjs')

async function hashPassword(password){
    const salt=await bcrypt.genSalt(10);
    password=await bcrypt.hash(password,salt);
    return password;
}

module.exports=hashPassword;
