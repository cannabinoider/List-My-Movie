const { addUser } = require('./service');

module.exports.getHome = (req, res) => {
    res.send("Hello vashisht");
};

module.exports.signup = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const value = await addUser(userName, email, password);
        if( value==="Details Entered Successfully"){
            res.send("User details added successfully");
        }
        else if (value==="Username already taken"){
            return("This username is already taken and is unavailable");
        }
        else {
            res.status(404).send("Error adding details");
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
};
