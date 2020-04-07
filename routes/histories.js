const express = require('express');
const router = express.Router();
const conn = require('../config/Database');

//delete history by history id
router.delete('/history/:id', (req, res) => {
    let history_id = req.params.id
    conn.query(`DELETE FROM histories Where id=${history_id}`, function (err, result, fields) {
      if (err)
        res.json({ msg: err.message });;
      res.json(result)
  
    });
  })
  //delete all history by user id
  router.delete('/histories/user/:user_id', (req, res) => {
    let user_id = req.params.user_id
    conn.query(`DELETE FROM histories Where user_id=${user_id}`, function (err, result, fields) {
      if (err)
        res.json({ msg: err.message });;
      res.json(result)
  
    });
  })
  //get all history by user id
router.get('/histories/user/:user_id',(req,res)=>{
    const user_id = req.params.user_id
    conn.query(`SELECT * FROM histories where user_id= '${user_id}' ORDER BY created_at DESC`,(err,result)=>
    {
        if(err) throw err;
        res.json(result)
        console.log(result);
    });
  })
  module.exports=router;
