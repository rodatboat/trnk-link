const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL

// const whitelist = ['http://localhost:3000','http://localhost:5173', 'http://example2.com'];
// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     if(whitelist.includes(origin))
//       return callback(null, true)

//       callback(new Error('Not allowed by CORS'));
//   }
// }

app.use(cors()); // cors(corsOptions)
app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose.connect(mongoUrl)
    .then(() => console.log("Connected to database"))
    .catch((e) => console.log(e))
mongoose.set('strictQuery', true);

const usersRouter = require('./routes/users');
const componentsRouter = require('./routes/components');

app.use('/user', usersRouter);
app.use('/components', componentsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});