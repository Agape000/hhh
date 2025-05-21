import express from 'express';
import  db  from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM PACKAGE');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { PackageName, PackageDescription, PackagePrice } = req.body;
    const [result] = await db.execute(
      'INSERT INTO PACKAGE (PackageName, PackageDescription, PackagePrice) VALUES (?, ?, ?)',
      [PackageName, PackageDescription, PackagePrice]
    );
    res.status(201).json({ message: 'Package created successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;