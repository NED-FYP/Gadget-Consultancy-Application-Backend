const express=require('express');
const bodyParser=require('body-parser');
const con =require('./config/Database')
const Routes=require('./routes/gadgetconsultancy')
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
app.use('/api', Routes)

const port=3000;
app.listen(port,console.log(`listening server on port ${port}`));
