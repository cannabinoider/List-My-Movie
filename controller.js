const { addUser, checkUserName } = require('./service');
const bcrypt = require('bcrypt');

module.exports.getHome = (req, res) => {
    res.send("Hello vashisht");
};

module.exports.signup = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const value = await addUser(userName, email, hashedPassword);
        if (value === "Details Entered Successfully") {
            res.send("User details added successfully");
        }
        else if (value === "Username already taken") {
            res.send("This username is already taken and is unavailable");
        }
        else {
            res.status(404).send("Error adding details");
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
};


module.exports.login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const value = await checkUserName(userName, password);
        if (value === "Incorrect Password") {
            res.send("Entered password is incorrect");
        }
        else if (value === "Login Successfull") {
            res.send("Login Successfull");
        }
        else if (value === "UserName not found") {
            res.send("UserName is not present");
        }
        else {
            res.status(404).send("Some error occured");
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
};