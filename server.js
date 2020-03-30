const express=require('express');
const con =require('./config/Database');
const Routes=require('./routes/signup');
const Routes2=require('./routes/authentication.js');
const Routes3=require('./routes/forgot_password.js');
const bodyParser=require('body-parser');
const app=express();





const cors= require('cors');
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
  app.use(cors(corsOptions))

  
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
app.use('/gadgetconsultancy.com', Routes)
app.use('/gadgetconsultancy.com', Routes2)
app.use('/gadgetconsultancy.com', Routes3)
app.use('/gadgetconsultancy.com', Routes4)


const port=4000;
app.listen(port,console.log(`listening server on port ${port}`));

