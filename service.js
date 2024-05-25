const { getUserName, addUserName } = require('./modal1')

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
        return "error accessing db";
    }
};
