const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')

// Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')


dotenv.config();


// connect to database
mongoose.connect(
    process.env.ATLAS_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to database')
);

 
// Middlewares
app.use(express.json());



//Route  middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);




app.listen(3000, () => console.log('Server running '));