import express from 'express'
import mongoose from 'mongoose'
const router = express.Router();
import Course from "../models/Course.js"

router.get('/:subject/:courseNumber', async (req, res) => {
    const { subject, courseNumber } = req.params;
    try {
      const course = await Course.findOne({ subject, courseNumber });
      if (course == null) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

export default router;