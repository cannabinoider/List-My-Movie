const { addUser } = require('./service');

module.exports.getHome = (req, res) => {
    res.send("Hello vashisht");
};

module.exports.signup = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const value = await addUser(userName, email, password);
        if (value === "error") {
            res.status(404).send("Error adding details");
        } else {
            res.send("Details Added");
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
};
