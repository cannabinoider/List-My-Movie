const { getUserName, addUserName,getEmail } = require('./modal1')
const bcrypt = require('bcrypt');

module.exports.addUser = async (userName, email, password) => {
    try {
        const existingUser = await getUserName(userName);
        if (existingUser === "go ahead") {
            try {
                const returnedData = await addUserName(userName, email, password);
                if (returnedData === "Details Entered") {
                    return ("Details Entered Successfully");
                }
                else {
                    return ("db error");
                }
            }
            catch (err) {
                console.error(err);
                return ("db data entering error");
            }
        }
        else{
            return("Username already taken");
        }
    } catch (err) {
        console.error(err);
        return("error accessing db");
    }
};


module.exports.checkUserName=async(userName,password)=>{
    try{
        const existingUser = await getUserName(userName);
        if(existingUser==="go ahead"){
            try{
                const userNameLower=userName.toLowerCase();
                const existingEmail = await getEmail(userNameLower);
                if(existingEmail==="go ahead"){
                    return("UserName not found");
                }
                else{
                    const isPasswordCorrect = await bcrypt.compare(password, existingEmail.password);
                    if(isPasswordCorrect){
                        return("Login Successfull");
                    }
                    else{
                        return("Incorrect Password");
                    }
                }
            }
            catch(err){
                console.log(err);
                return("error accessing db");
            }
        }
        else{
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if(isPasswordCorrect){
                return("Login Successfull");
            }
            else{
                return("Incorrect Password");
            }
        }
    }
    catch(err){
        console.log(err);
        return("error accessing db");
    }
}