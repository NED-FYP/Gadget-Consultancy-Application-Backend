const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const con =require('./config/Database');
const signup=require('./routes/signup');
const authentication=require('./routes/authentication.js');
const questions=require('./routes/questions.js');
const activities =require('./routes/activities.js')
const histories=require('./routes/histories.js');
const likes=require('./routes/likes.js');
const dislikes=require('./routes/dislikes.js');

const cors= require('cors');
var corsOptions = {
                  origin: 'http://localhost:4200',
                  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
                  }
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

con.connect(function(err) 
    {
        if (err) throw err;
        console.log("Connected!");
    });

app.use('/api', signup)
app.use('/api', authentication)
app.use('/api', questions)
app.use('/api', histories)
app.use('/api', activities)
app.use('/api', likes)
app.use('/api', dislikes)

const port=4000;
app.listen(port,console.log(`listening server on port ${port}`));

