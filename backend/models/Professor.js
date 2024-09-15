import mongoose from 'mongoose'

const professorSchema = new mongoose.Schema({
  name: String,
  coursesTaught: [{
    subject: String,
    courseNumber: String,
    averageGpa: Number,
    sectionsTaught: Number
  }]
});

const Professor = mongoose.model('Professor', professorSchema);
export default Professor;
