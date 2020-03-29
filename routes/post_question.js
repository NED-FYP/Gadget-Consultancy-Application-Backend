const express = require('express');
const router = express.Router();
const conn = require('../config/Database');
var crypto = require('crypto');



router.post('/postQuestion/:id',(req,res)=>{
    //const name =req.body.name;
    const {title_name}=req.body
    const {tag_name}=req.body
    const {ques_body}=req.body
    const {user_name}=req.body
    const user_id = req.params.id
    conn.query(`Insert into titles(title_name) Values('${title_name}') `,
                `Insert into tags(tag_name) Values('${tag_name}')` ,
                `Insert into questions(question_body, title_id ,tag_id ,user_id) 
                Values('${ques_body}', LAST_INSERT_ID() , LAST_INSERT_ID() ,
                (select user_id from users where user_id = '${user_id}') )`,(err,result)=>
    {
        if(err) throw err;
        res.json(result)
        console.log(result);
    });
})
module.exports=router;