const express = require('express');
const router = express.Router();
const conn = require('../config/Database');

//get all activities by user id
router.get('/activities/user/:user_id',(req,res)=>{
  const user_id = req.params.user_id
  conn.query(`SELECT * FROM activities where user_id= '${user_id}'`,(err,result)=>
  {
      if(err) throw err;
      res.json(result)
      console.log(result);
  });
})
module.exports=router;