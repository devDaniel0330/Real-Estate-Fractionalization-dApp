const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const users = [];

// register route
app.post('/api/register', (req, res) => {
  const { username, password, walletAddress, isAdmin } = req.body;

  const user = {
    username, 
    password,
    walletAddress,
    isAdmin: !!isAdmin,
  };

  users.push(user);

  console.log('registered: ', user);
  res.status(200).json({ message: 'registration successful' });
});

// login route
app.post('/api/login', (req, res) => {
  const { walletAddress, password, isAdmin } = req.body;

  // Find user by wallet address
  const user = users.find(u => 
    u.walletAddress === walletAddress && u.isAdmin === !!isAdmin
  );

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.walletAddress !== walletAddress || user.password !== password) {
    return res.status(401).json({ message: 'Invalid wallet address or password' });
  }

  res.json({ message: 'Login successful', user });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});