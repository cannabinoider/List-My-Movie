const { addUser, checkUserName } = require('../services/serviceMovie');
const bcrypt = require('bcrypt');

module.exports.getHome = (req, res) => {
    res.send("Hello vashisht");
};

module.exports.signup = async (req, res) => {
    const { userName, email, password } = req.body;
    console.log(userName,email,password)
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const value = await addUser(userName, email, hashedPassword);
        console.log(value);
        if (value === "Details Entered Successfully") {
            res.status(200).send({message:"User details added successfully"});
        }
        else if (value === "Username already taken") {
            res.status(500).send({message:"This username is already taken and is unavailable"});
        }
        else {
            res.status(500).send({message:"Error adding details"});
        }
    } catch (err) {
        res.status(400).send({message:"Something went wrong!"});
    }
};


module.exports.login = async (req, res) => {
    const userName = req.headers.username;
    const password  = req.headers.password;
    console.log(userName,password);
    try {
        const value = await checkUserName(userName, password);
        if (value === "Incorrect Password") {
            res.status(500).send({message:"Entered password is incorrect"});
        }
        else if (value === "error accessing db") {
            res.status(404).send("Some error occured");
           
        }
        else if (value === "UserName not found") {
            res.status(500).send({message:"UserName is not present"});
        }
        else {
            res.status(200).send({token:value});
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
};