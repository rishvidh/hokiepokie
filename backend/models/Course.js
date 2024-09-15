import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  subject: String,
  courseNumber: Number,
  courseTitle: String,
  averageGpa: Number,
  totalEnrollments: Number,
  credits: Number,
  gradeDistribution: {
    A: Number,
    AMinus: Number,
    BPlus: Number,
    B: Number,
    BMinus: Number,
    CPlus: Number,
    C: Number,
    CMinus: Number,
    DPlus: Number,
    D: Number,
    DMinus: Number,
    F: Number,
    withdraws: Number
  },
  professors: [{
    name: String,
    averageGpa: Number,
    sectionsTaught: Number
  }]
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
