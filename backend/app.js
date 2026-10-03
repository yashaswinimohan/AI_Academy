const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_PRIVATE_KEY) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    } else {
      // Running inside Cloud Functions/Cloud Run: use the attached service account.
      admin.initializeApp();
    }
    console.log('Firebase Admin Initialized');
  } catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
  }
}

const app = express();

app.use(cors());
app.use(express.json());

const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const projectRoutes = require('./routes/projectRoutes');
const projectMembershipRoutes = require('./routes/projectMembershipRoutes');
const projectMilestoneRoutes = require('./routes/projectMilestoneRoutes');
const projectTaskRoutes = require('./routes/projectTaskRoutes');
const projectMessageRoutes = require('./routes/projectMessageRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const gradebookRoutes = require('./routes/gradebookRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const userPointsRoutes = require('./routes/userPointsRoutes');

app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projectmemberships', projectMembershipRoutes);
app.use('/api/projectmilestones', projectMilestoneRoutes);
app.use('/api/projecttasks', projectTaskRoutes);
app.use('/api/projectmessages', projectMessageRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/grades', gradebookRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/userpointss', userPointsRoutes);

app.get('/', (req, res) => {
  res.send('Aivra Backend is running');
});

module.exports = app;
