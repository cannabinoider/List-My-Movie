const express = require("express");
const User = require("./Mongo");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Login route
app.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("fail");
  }
});

// Signup route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.json("exist");
    } else {
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.json("notexist");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("fail");
  }
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
