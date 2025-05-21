import express from 'express';
const router = express.Router();
import db from '../db.js';

router.post('/', async (req, res) => {
    try {
        const { PlateNumber, CarType, CarSize, DriverName, PhoneNumber } = req.body;
        const [result] = await db.execute(
            'INSERT INTO CAR (PlateNumber, CarType, CarSize, DriverName, PhoneNumber) VALUES (?, ?, ?, ?, ?)',
            [PlateNumber, CarType, CarSize, DriverName, PhoneNumber]
        );
        res.status(201).json({ message: 'Car created successfully', carId: PlateNumber });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM CAR');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;