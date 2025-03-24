const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const timetableRoutes = require('./routes/timetable');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/timetable', timetableRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
