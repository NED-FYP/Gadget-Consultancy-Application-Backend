const express = require('express');
const router = express.Router();
const conn = require('../config/Database');
var crypto = require('crypto');



                               /*USERS*/

//Get all users
router.get('/signup/users',(req,res)=>{
    conn.query("SELECT * FROM users",(err,result)=>
    {
        if(err) throw err;
        res.json(result)
        console.log(result);
    });
})
//signing up

router.post('/signup/users',(req,res)=>{
    //const name =req.body.name;
    const {user_name}=req.body
    const {email_address}=req.body
    const password =req.body.password
    const hashedpassword = crypto.createHash('md5').update(password).digest('hex');
    conn.query(`Insert into users(user_name,email_address, password ) Values ('${user_name}', '${email_address}', '${hashedpassword}')`
    ,(err,result)=>
    {
        if(err) throw err;
        res.json(result)
        console.log(result);
    });
})
//login in

app.post('/login', (req, res) => {
  let {email_address, password} = req.body;
    User.findOne({email_address: email_address}, 'username email password', (err, userData) => {
    	if (!err) {
        	let passwordCheck = bcrypt.compareSync(password, userData.password);
        	if (passwordCheck) { // we are using bcrypt to check the password hash from db against the supplied password by user
                req.session.user = {
                  email: userData.email,
                  username: userData.username
                  id: userData._id
                }; // saving some user's data into user's session
                req.session.user.expires = new Date(
                  Date.now() + 3 * 24 * 3600 * 1000; // session expires in 3 days
                );
                res.status(200).send('You are logged in, Welcome!');
            } else {
            	res.status(401).send('incorrect password');
            }
        } else {
        	res.status(401).send('invalid login credentials')
        }
    })
})




//Get all users by id
router.get('/heroes/:id',(req,res)=>{
  const id = req.params.id
  conn.query(`SELECT * FROM heroes where id= '${id}'`,(err,result)=>
  {
      if(err) throw err;
      res.json(result[0])
      console.log(result[0]);
  });
})
/

//delete a user

router.delete('/heroes/:id', (req, res) => {
    let id = req.params.id
    conn.query(`DELETE FROM heroes Where id=${id}`, function (err, hero, fields) {
      if (err)
        res.json({ msg: err.message });;
      res.json(hero)
  
    });
  })

//update a user

router.put('/heroes/:id', (req, res) => {
    let id = req.params.id
    const name =req.body.name;
    conn.query(`UPDATE heroes SET name = '${name}' WHERE id = '${id}'`, function (err, hero) {
      if (err)
        res.json({ msg: err.message });;
      res.json(hero)
  
    });
  })

module.exports=router;









