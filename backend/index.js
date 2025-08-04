const mysql = require('mysql2/promise');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let db;

(async () => {
  try {
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'real_estate_dapp',
    });
    console.log('MySQL connected');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MySQL connection error:', err);
  }
})();

// register route
app.post('/api/register', async (req, res) => {
  const { username, password, walletAddress, isAdmin } = req.body;
  console.log('Register request body:', req.body); // Debug log

  try {
    // Check if user already exists
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE walletAddress = ?',
      [walletAddress]
    );
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Wallet already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      'INSERT INTO users (username, password, walletAddress, isAdmin) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, walletAddress, !!isAdmin]
    );

    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// login route
app.post('/api/login', async (req, res) => {
  const { walletAddress, password } = req.body;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE walletAddress = ?',
      [walletAddress]
    );

    const user = rows[0];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid wallet address or password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        walletAddress: user.walletAddress,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// lists all available properties for normal users
app.get('/api/properties', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM properties WHERE is_available = TRUE'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'error getting properties' });
  }
});

// add new properties, admin only
app.post('/api/properties', async (req, res) => {
  const { title, description, price } = req.body;

  try {
    await db.execute(
      'INSERT INTO properties (title, description, price, is_available) VALUES (?, ?, ?, ?)', 
      [title, description, price, true]
    );
    res.json({ message: 'property added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'error adding property' });
  }
});