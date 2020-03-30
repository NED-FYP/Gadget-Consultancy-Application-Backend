const express = require('express');
const router = express.Router();
const conn = require('../config/Database');





//Get all questions
router.get('/questions',(req,res)=>{
    conn.query("SELECT * FROM questions",(err,result)=>
    {
        if(err) throw err;
        res.json(result)
        console.log(result);
    });
})


//Get all questions by userid
router.get('/questions/:id',(req,res)=>{
    const id = req.params.id
    conn.query(`SELECT * FROM questions where uesr_id= '${id}'`,(err,result)=>
    {
        if(err) throw err;
        res.json(result[0])
        console.log(result[0]);
    });
  })
  

  //edit a question

router.put('/questions/:id/:userid', (req, res) => {
    let id = req.params.id
    const question_body =req.body.question_body;
    conn.query(`UPDATE questions SET question_body= '${question_body}' ,  WHERE id = '${id}' AND user_id= '${id}'`, function (err, hero) {
      if (err)
        res.json({ msg: err.message });
      res.json(question)
  
    });
  })








router.post('/addQuestion',(req,res)=>{
    var question_title=req.body.title
    var question_body=req.body.body
    var user_id = req.body.user_id
    conn.query(`Insert into questions(question_title, question_body, user_id) 
    Values('${question_title}' ,'${question_body}' ,'${user_id}' )` ,
    function (err, result) {
        if(err){
            res.json({ msg: err.message });
            

               }
        else{
            var tags = req.body.tags
            tags.forEach(element => {
                conn.query( `Insert into tags(tag_name, question_id) Values('${element.tag}', LAST_INSERT_ID() )`
             , function (err, result) {
                    if (err)
                        res.json({ msg: err.message });
                    res.json(result)
                                         });
        });

    }
            
    });


});
module.exports=router;
