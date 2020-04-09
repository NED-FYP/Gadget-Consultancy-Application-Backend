const express = require('express');
const router = express.Router();
const conn = require('../config/Database');

  //edit a question

 router.put('/question/:id',(req,res)=>{
    var question_title=req.body.title
    var question_body=req.body.body
    var question_id = req.params.id
  conn.query(`UPDATE questions SET question_title = '${question_title}' ,  question_body = '${question_body}' 
   WHERE id = '${question_id}'` ,
    function (err, result) {
        if(err){
          res.json({ msg: err.message });
        }else{

      var tags = req.body.tags
      conn.query(`DELETE FROM tags Where question_id=${question_id}`
      ,
         function (err, result) {
                    if (err){
                      res.json({ msg: err.message });
                    }
              	});
			//var question_id = result.insertId;
        tags.forEach(element => {
        conn.query( `Insert into tags(tag_name, question_id) Values('${element.tag}', '${question_id}' )`	,
         function (err, result) {
                    if (err){
                      res.json({ msg: err.message });
                    }
              	});
			});
			res.json(result)
		}
	});
});

  //get all questions
router.get('/questions',(req,res)=>{
    conn.query("SELECT * FROM questions",(err,result)=>
    {
        if(err) throw err;
        res.json(result)
        console.log(result);
    });
  })
  
  
  //get question by user_id
  router.get('/questions/user/:user_id',(req,res)=>{
    const user_id = req.params.user_id
    conn.query(`SELECT * FROM questions where user_id= '${user_id}'`,(err,result)=>
    {
        if(err) throw err;
        res.json(result)
        console.log(result);
    });
  })
  
  //get question by id
  router.get('/question/:id',(req,res)=>{
      const question_id = req.params.id
      conn.query(`SELECT * FROM questions where id= '${question_id}'`,(err,result)=>
      {
          if(err) throw err;
          res.json(result[0])
          console.log(result[0]);
      });
    })
  
  //delete question
  router.delete('/question/:id', (req, res) => {
      let question_id = req.params.id
      conn.query(`DELETE FROM questions Where id=${question_id}`, function (err, result, fields) {
        if (err)
          res.json({ msg: err.message });;
        res.json(result)
    
      });
    })
    

//add a question

router.post('/question',(req,res)=>{
    var question_title=req.body.title
    var question_body=req.body.body
    var user_id = req.body.user_id
    conn.query(`Insert into questions(question_title, question_body, user_id) 
    Values('${question_title}' ,'${question_body}' ,'${user_id}' )` ,
    function (err, result) {
        if(err){
          res.json({ msg: err.message });
        }else{
			var tags = req.body.tags
			var question_id = result.insertId;
            tags.forEach(element => {
				conn.query( `Insert into tags(tag_name, question_id) Values('${element.tag}', '${question_id}' )`
				, function (err, result) {
                    if (err){
                        res.json({ msg: err.message });
                    }
              	});
			});
			res.json(result)
		}
	});
});
module.exports=router;
