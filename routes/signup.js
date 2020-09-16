const express = require('express');
const router = express.Router();
const conn = require('../config/Database');
var crypto = require('crypto');
const app=express();
var session = require('express-session');

//Get all users
  router.get('/users',(req,res)=>{
    conn.query("SELECT * FROM users",(err,result)=>
    {
        if(err) throw err;
        res.json(result)
        console.log(result);
    });
  })

//Register User
  router.post('/signup',(req,res)=>{
    const {user_name}=req.body
    const {email_address}=req.body
    const password =req.body.password
    const hashedpassword = crypto.createHash('md5').update(password).digest('hex');

    conn.query(`Insert into users(user_name,email_address, password ) 
                Values ('${user_name}', '${email_address}', '${hashedpassword}')`,
    (err)=>
    {
       if (err)
       {
          res.json({ msg: err.message });
       }
      res.send({ 'message': 'Successfully Regestered'});
    });

  })

module.exports=router;









