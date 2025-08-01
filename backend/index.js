const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const users = []; // This should be shared with the register route

app.post('/api/register', (req, res) => {
  const { username, password, walletAddress } = req.body;
  users.push({ username, password, walletAddress });

  console.log('received: ', username, password, walletAddress);
  res.status(200).json({ message: 'registration successful' });
});

// Login route
app.post('/api/login', (req, res) => {
  const { walletAddress, password } = req.body;

  // Find user by wallet address
  const user = users.find(u => u.walletAddress === walletAddress);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  res.json({ message: 'Login successful', user });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});