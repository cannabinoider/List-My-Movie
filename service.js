const mongoose = require("mongoose");
const Login = require('./schemas/login');

module.exports.addUser = async (userName, email, password) => {
    try {
        const existingUser = await Login.findOne({ userName: userName });
        if (existingUser) {
            return "error";
        }
        const userLogin = new Login({ userName, email, password });
        await userLogin.save();
        return "details added";
    } catch (err) {
        console.error(err);
        return "error";
    }
};
