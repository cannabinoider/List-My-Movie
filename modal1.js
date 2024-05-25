const Login = require('./schemas/login');

module.exports.getUserName=async (userName)=>{
    const Dbdata=await Login.findOne({userName:userName});
    if(Dbdata){
        return("Username present");
    }
    else{
        return("go ahead");
    }
}

module.exports.addUserName=async(userName,password,email)=>{
    try{
    const userLogin = new Login({ userName, email, password });
    await userLogin.save();
    return ("Details Entered")
    }
    catch{
        return("error entering data");
    }
}