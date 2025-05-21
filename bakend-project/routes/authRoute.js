import express from 'express';
import bcrypt from 'bcrypt';
import  pool  from '../db.js'; 

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const [users] = await pool.execute(
            'SELECT * FROM USER WHERE Username = ?',
            [username]
        );

        if (users.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await pool.execute(
            'INSERT INTO USER (Username, Password) VALUES (?, ?)',
            [username, hashedPassword]
        );

        res.status(201).json({ 
            message: 'User registered successfully',
            userId: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const [users] = await pool.execute(
            'SELECT * FROM USER WHERE Username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        req.session.user = {
            userId: user.UserID,
            username: user.Username
        };

        res.json({ 
            message: 'Login successful',
            user: {
                userId: user.UserID,
                username: user.Username
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out, please try again' });
        }
        res.clearCookie('crpms_session');
        res.json({ message: 'Logout successful' });
    });
});

router.get('/check', (req, res) => {
    if (req.session.user) {
        res.json({ 
            isAuthenticated: true,
            user: req.session.user
        });
    } else {
        res.json({ isAuthenticated: false });
    }
});

export default router;

