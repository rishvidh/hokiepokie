import dotenv from "dotenv";
import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import Course from "../models/Course.js";
import Professor from "../models/Professor.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Helper function to calculate the average GPA
function calculateAverageGPA(totalGpa, numberOfSections, newGpa) {
  return (totalGpa * numberOfSections + newGpa) / (numberOfSections + 1);
}

// Helper function to update the grade distribution by averaging
function updateAverageGradeDistribution(current, newSection, numberOfSections) {
  const keys = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F", "withdraws"];
  keys.forEach(key => {
    current[key] = (current[key] * numberOfSections + newSection[key]) / (numberOfSections + 1); // Calculate the running average
  });
}

// Process the CSV file
const results = [];

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    results.push(row);
  })
  .on('end', async () => {
    const courseMap = {};
    const professorMap = {};

    for (const row of results) {
      const subject = row['Subject'];
      const courseNumber = parseInt(row['Course No.']);
      const courseTitle = row['Course Title'];
      const instructor = row['Instructor'];
      const gpa = parseFloat(row['GPA']);
      const enrollments = parseInt(row['Graded Enrollment']);
      const credits = parseInt(row['Credits']);

      const gradeDistribution = {
        A: parseFloat(row['A (%)']) || 0,
        AMinus: parseFloat(row['A- (%)']) || 0,
        BPlus: parseFloat(row['B+ (%)']) || 0,
        B: parseFloat(row['B (%)']) || 0,
        BMinus: parseFloat(row['B- (%)']) || 0,
        CPlus: parseFloat(row['C+ (%)']) || 0,
        C: parseFloat(row['C (%)']) || 0,
        CMinus: parseFloat(row['C- (%)']) || 0,
        DPlus: parseFloat(row['D+ (%)']) || 0,
        D: parseFloat(row['D (%)']) || 0,
        DMinus: parseFloat(row['D- (%)']) || 0,
        F: parseFloat(row['F (%)']) || 0,
        withdraws: parseFloat(row['Withdraws (%)']) || 0
      };

      // Aggregate data into courseMap
      const courseKey = `${subject}-${courseNumber}`;
      if (!courseMap[courseKey]) {
        courseMap[courseKey] = {
          subject,
          courseNumber,
          courseTitle,
          averageGpa: gpa,
          totalEnrollments: enrollments,
          credits,
          gradeDistribution: { ...gradeDistribution },
          professors: {},
          sectionsTaught: 1
        };
      } else {
        const course = courseMap[courseKey];
        course.averageGpa = calculateAverageGPA(course.averageGpa, course.sectionsTaught, gpa);
        course.totalEnrollments += enrollments;
        updateAverageGradeDistribution(course.gradeDistribution, gradeDistribution, course.sectionsTaught);
        course.sectionsTaught += 1;
      }

      // Add/update professor data for the course
      const course = courseMap[courseKey];
      if (!course.professors[instructor]) {
        course.professors[instructor] = {
          name: instructor,
          averageGpa: gpa,
          sectionsTaught: 1
        };
      } else {
        const professorData = course.professors[instructor];
        professorData.averageGpa = calculateAverageGPA(professorData.averageGpa, professorData.sectionsTaught, gpa);
        professorData.sectionsTaught += 1;
      }

      // Add/update professorMap
      if (!professorMap[instructor]) {
        professorMap[instructor] = {};
      }

      if (!professorMap[instructor][courseKey]) {
        professorMap[instructor][courseKey] = {
          subject,
          courseNumber,
          averageGpa: gpa,
          sectionsTaught: 1
        };
      } else {
        const professorCourse = professorMap[instructor][courseKey];
        professorCourse.averageGpa = calculateAverageGPA(professorCourse.averageGpa, professorCourse.sectionsTaught, gpa);
        professorCourse.sectionsTaught += 1;
      }
    }

    // Insert data into MongoDB
    for (const courseKey in courseMap) {
      const course = courseMap[courseKey];
      const professorArray = Object.values(course.professors);
      await Course.updateOne(
        { subject: course.subject, courseNumber: course.courseNumber },
        {
          subject: course.subject,
          courseNumber: course.courseNumber,
          courseTitle: course.courseTitle,
          averageGpa: course.averageGpa,
          totalEnrollments: course.totalEnrollments,
          credits: course.credits,
          gradeDistribution: course.gradeDistribution,
          professors: professorArray
        },
        { upsert: true }
      );
    }

    for (const professorName in professorMap) {
      const professorCourses = Object.values(professorMap[professorName]);
      await Professor.updateOne(
        { name: professorName },
        {
          name: professorName,
          coursesTaught: professorCourses
        },
        { upsert: true }
      );
    }

    console.log('Data uploaded successfully');
    mongoose.disconnect();
  });
