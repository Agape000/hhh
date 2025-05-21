import express from 'express';
import  db  from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM PAYMENT');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { AmountPaid, RecordNumber } = req.body;
    const [result] = await db.execute(
      'INSERT INTO PAYMENT (AmountPaid, RecordNumber) VALUES (?, ?)',
      [AmountPaid, RecordNumber]
    );
    res.status(201).json({ message: 'Payment recorded', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
