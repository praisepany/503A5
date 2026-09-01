const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

const app = express();
app.use(express.json());

//Router files
const hospitals = require('./routes/hospitals');
// if the path is used, go to hospitals file
app.use('/api/v1/hospitals', hospitals);

const PORT = process.env.PORT || 5003;

// wait for request
const server = app.listen(PORT, console.log('Server running in', process.env.NODE_ENV, 'mode on port', PORT));

//Handle unhandles promise rejections
process.on('unhandledRejection', (err,promise) => {
    console.log(`Error: $(err.message)`);
    //Close server & exit process
    server.close(() => process.exitCode(1));
})