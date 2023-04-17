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

app.use(function (req, res, next) {

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const usersRouter = require('./routes/users');
const componentsRouter = require('./routes/components');

app.use('/user', usersRouter);
app.use('/components', componentsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});