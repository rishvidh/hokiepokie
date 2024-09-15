import express from 'express'
import mongoose from 'mongoose'
const router = express.Router();
import Professor from "../models/Professor.js"

router.get('/:name', async (req, res) => {
    const { name } = req.params;
    try {
      const professor = await Professor.findOne({ name });
      if (professor == null) {
        return res.status(404).json({ message: 'Professor not found' });
      }
      res.json(professor);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  export default router;