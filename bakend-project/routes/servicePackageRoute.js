import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all service packages
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM SERVICE_PACKAGE');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new service package record
router.post('/', async (req, res) => {
  try {
    const { PlateNumber, PackageNumber, SeviceDate } = req.body;

    if (!PlateNumber || !PackageNumber || !SeviceDate) {
      return res.status(400).json({ error: 'PlateNumber, PackageNumber and SeviceDate are required' });
    }

    const [result] = await db.execute(
      'INSERT INTO SERVICE_PACKAGE (PlateNumber, PackageNumber, SeviceDate) VALUES (?, ?, ?)',
      [PlateNumber, PackageNumber, SeviceDate]
    );

    res.status(201).json({ message: 'Service record created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update existing service package record by RecordNumber
router.put('/:id', async (req, res) => {
  try {
    const { PlateNumber, PackageNumber, SeviceDate } = req.body;
    const { id } = req.params;

    if (!PlateNumber || !PackageNumber || !SeviceDate) {
      return res.status(400).json({ error: 'PlateNumber, PackageNumber and SeviceDate are required' });
    }

    await db.execute(
      'UPDATE SERVICE_PACKAGE SET PlateNumber = ?, PackageNumber = ?, SeviceDate = ? WHERE RecordNumber = ?',
      [PlateNumber, PackageNumber, SeviceDate, id]
    );

    res.json({ message: 'Service record updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete service package by RecordNumber
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute('DELETE FROM SERVICE_PACKAGE WHERE RecordNumber = ?', [id]);
    res.json({ message: 'Service record deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
