const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToMongo();

const users = client.db('user_auth').collection('users');

app.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if username or email already exists
    const existingUser = await users.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).send('Username or email already exists');
    }

    // Store user data in the MongoDB collection
    const result = await users.insertOne({
      username,
      password: hashedPassword,
      email
    });

    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Internal server error');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await users.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send('Invalid username or password');
    }

    res.status(200).json({ username: user.username, email: user.email });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
