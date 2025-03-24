const express = require('express');
const router = express.Router(); 
const connection = require('../config/db'); 

// POST endpoint to insert timetable data
router.post('/add', (req, res) => {
  const { session, department, semester, coursename, professorName, classroom, duration } = req.body;

  const query = `INSERT INTO timetable (session, department, semester, coursename, professorName, classroom, duration) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  connection.query(query, [session, department, semester, coursename, professorName, classroom, duration], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Failed to insert data into the database.' });
    }
    res.status(200).json({ message: 'Data inserted successfully', id: results.insertId });
  });
});

// GET endpoint to check if timetable entry already exists
router.get('/check', (req, res) => {
  const { session, department, semester } = req.query;

  const query = `SELECT COUNT(*) AS count FROM timetable WHERE session = ? AND department = ? AND semester = ?`;

  connection.query(query, [session, department, semester], (err, results) => {
    if (err) {
      console.error('Error checking data:', err);
      return res.status(500).json({ error: 'Failed to check data in the database.' });
    }
    const exists = results[0].count > 0;
    res.status(200).json({ exists });
  });
});

// Getting the latest Department, Session, and Semester from the DB
router.get('/latest', (req, res) => {
  console.log('Received request for /latest');
  const query = `SELECT session, department, semester FROM timetable ORDER BY id DESC LIMIT 1`;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Failed to fetch data from the database.' });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ error: 'No data found.' });
    }
  });
});

// Route to get Professors List
router.get('/professors', (req, res) => {
  const query = 'SELECT name, picture FROM professors';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching professors:', err);
      return res.status(500).json({ error: 'Failed to fetch professors from the database.' });
    }

    // Convert picture blob to Base64 string
    const professorsWithPictures = results.map(professor => {
      return {
        name: professor.name,
        picture: professor.picture ? `data:image/png;base64,${Buffer.from(professor.picture).toString('base64')}` : null
      };
    });

    res.status(200).json(professorsWithPictures);
  });
});


// Route to get Classes List
router.get('/classes', (req, res) => {
  const query = 'SELECT class_number, class_type FROM classes';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching classes:', err);
      return res.status(500).json({ error: 'Failed to fetch classes from the database.' });
    }
    res.status(200).json(results);
  });
});


// Route to get courses for the last inserted semester
router.get('/courses-for-last-semester', (req, res) => {
  // Step 1: Fetch the last inserted semester from the timetable table
  const getLastSemesterQuery = 'SELECT semester FROM timetable ORDER BY id DESC LIMIT 1';

  connection.query(getLastSemesterQuery, (err, results) => {
    if (err) {
      console.error('Error fetching last semester:', err);
      return res.status(500).json({ error: 'Failed to fetch last semester from the database.' });
    }

    const lastSemester = results[0]?.semester;
    if (!lastSemester) {
      return res.status(404).json({ error: 'No semester found.' });
    }

    // Step 2: Map the semester value to semester_id
    const semesterToIdMap = {
      '1st': 1,
      '2nd': 2,
      '3rd': 3,
      '4th': 4,
      '5th': 5,
      '6th': 6,
      '7th': 7,
      '8th': 8
    };

    const semesterId = semesterToIdMap[lastSemester];
    if (!semesterId) {
      return res.status(404).json({ error: 'No valid semester_id found for the given semester.' });
    }

    // Step 3: Fetch courses for the corresponding semester_id
    const getCoursesQuery = 'SELECT name FROM courses WHERE semester_id = ?';

    connection.query(getCoursesQuery, [semesterId], (err, courses) => {
      if (err) {
        console.error('Error fetching courses:', err);
        return res.status(500).json({ error: 'Failed to fetch courses from the database.' });
      }

      // If there are no courses, return an empty array
      if (courses.length === 0) {
        return res.status(200).json([]);
      }

      res.status(200).json(courses);
    });
  });
});

router.post('/save-timetable', async (req, res) => {
  const { department, session, semester, timetable } = req.body;

  // Fetch the existing timetable for this department, session, and semester
  const existingQuery = `
    SELECT * FROM clasher 
    WHERE department = ? AND session = ? AND semester = ?
  `;

  const existingTimetable = await new Promise((resolve, reject) => {
    connection.query(existingQuery, [department, session, semester], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });

  // Check if the incoming timetable matches the existing timetable
  const isSameTimetable = existingTimetable.length === Object.keys(timetable).length &&
    existingTimetable.every((entry) => {
      const key = `${entry.start_time} - ${entry.end_time}-${entry.day}`;
      const value = timetable[key];
      return (
        value &&
        value.course === entry.course &&
        value.professor === entry.professor &&
        value.className === entry.class_name
      );
    });

  if (isSameTimetable) {
    return res.status(200).send({ message: "No clashes found. Timetable already saved!" });
  }

  // Proceed with conflict checking if the timetable has changed
  const conflicts = [];
  for (const [key, value] of Object.entries(timetable)) {
    const [timeSlot, day] = key.split(/-(?=[^-]+$)/);
    const [startTime, endTime] = timeSlot.trim().split(" - ");
    const professor = value.professor;
    const className = value.className;

    // Check for teacher conflicts
    const conflictQuery = `
      SELECT * FROM clasher 
      WHERE professor = ? AND day = ? 
      AND (
        (start_time < ? AND end_time > ?) OR
        (start_time < ? AND end_time > ?)
      )
    `;

    const teacherResults = await new Promise((resolve, reject) => {
      connection.query(conflictQuery, [professor, day.trim(), endTime, startTime, startTime, endTime], (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });

    teacherResults.forEach((teacherConflict) => {
      const conflictIdentifier = `${professor}-${day.trim()}-${startTime}-${endTime}`;
      if (!conflicts.some((conflict) => conflict.identifier === conflictIdentifier)) {
        conflicts.push({
          identifier: conflictIdentifier,
          type: 'Teacher Conflict',
          professor,
          day: day.trim(),
          startTime,
          endTime,
          className: teacherConflict.class_name,
        });
      }
    });

    // Check for class conflicts
    const classConflictQuery = `
      SELECT * FROM clasher 
      WHERE class_name = ? AND day = ? 
      AND (
        (start_time < ? AND end_time > ?) OR
        (start_time < ? AND end_time > ?)
      )
    `;

    const classResults = await new Promise((resolve, reject) => {
      connection.query(classConflictQuery, [className, day.trim(), endTime, startTime, startTime, endTime], (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });

    classResults.forEach((classConflict) => {
      const conflictIdentifier = `${className}-${day.trim()}-${startTime}-${endTime}`;
      if (!conflicts.some((conflict) => conflict.identifier === conflictIdentifier)) {
        conflicts.push({
          identifier: conflictIdentifier,
          type: 'Class Conflict',
          className,
          day: day.trim(),
          startTime,
          endTime,
          professor: classConflict.professor,
        });
      }
    });
  }

  if (conflicts.length > 0) {
    return res.status(400).send({ message: "Conflicts detected", conflicts });
  }

  // Insert the new timetable
  const insertQuery = `
    INSERT INTO clasher (department, session, semester, course, professor, class_name, start_time, end_time, day)
    VALUES ?
  `;

  const timetableEntries = Object.entries(timetable).map(([key, value]) => {
    const [timeSlot, day] = key.split(/-(?=[^-]+$)/);
    const [startTime, endTime] = timeSlot.trim().split(" - ");
    return [
      department,
      session,
      semester,
      value.course,
      value.professor,
      value.className,
      startTime,
      endTime,
      day.trim(),
    ];
  });

  connection.query(insertQuery, [timetableEntries], (error, result) => {
    if (error) {
      console.error("Error saving timetable:", error);
      return res.status(500).send("Error saving timetable");
    }
    res.send({ message: "Timetable saved successfully" });
  });
});



module.exports = router;
