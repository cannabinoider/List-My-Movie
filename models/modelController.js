const Login = require('../schemas/login');

module.exports.getUserName=async (userName)=>{
    const Dbdata=await Login.findOne({userName:userName});
    if(Dbdata){
        return(Dbdata);
    }
    else{
        return("go ahead");
    }
}

module.exports.addUserName=async(userName,email,password)=>{
    try{
    const userLogin = new Login({ userName, email, password });
    await userLogin.save();
    return ("Details Entered")
    }
    catch{
        return("error entering data");
    }
}

module.exports.getEmail=async (email)=>{
    const Dbdata=await Login.findOne({email:email});
    if(Dbdata){
        return(Dbdata);
    }
    else{
        return("go ahead");
    }
}