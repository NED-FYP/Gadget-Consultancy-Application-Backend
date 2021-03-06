const express = require('express');
const router = express.Router();
const conn = require('../config/Database');

//Post a question
  router.post('/question',(req,res)=>{
    var question_title=req.body.title
    var question_body=req.body.body
    var user_id = req.body.user_id

    conn.query(`Insert into questions(question_title, question_body, user_id ) 
                Values('${question_title}' ,'${question_body}' ,'${user_id}'  )` ,
      function (err, result)
      {
        if(err)
        {
          res.json({ msg: 'error' });
        }
        /*
        else
        {
          var tags = req.body.tags
          var question_id = result.insertId;

          tags.forEach(element => {
            conn.query( `Insert into tags(tag_name, question_id) Values('${element.tag}', '${question_id}' )`,
            function (err, res) 
              {
                  if (err)
                  {
                      res.json({ msg: 'Error of tag' });
                  }
              });
          }); 

          
        }**/
        else{
        res.send({ msg: 'Question Posted Successfully'});
            }
      });
  });

//edit a question
  router.put('/question/:id',(req,res)=>{
    var question_title=req.body.title
    var question_body=req.body.body
    var question_id = req.params.id

  conn.query(`UPDATE questions SET question_title = '${question_title}' ,  question_body = '${question_body}' 
              WHERE id = '${question_id}'` ,
      function (err, result) 
      {
        if(err)
        {
          res.json({ msg: err.message });
        }
        else
        {
          var tags = req.body.tags

          conn.query(`DELETE FROM tags Where question_id=${question_id}`,
          function (err, result)
           {
              if (err)
              {
                res.json({ msg: err.message });
              }
           });
		
          tags.forEach(element => 
          {
          conn.query( `Insert into tags(tag_name, question_id) Values('${element.tag}', '${question_id}' )`	,
          function (err, result) 
           {
              if (err)
              {
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
  router.get('/question/user/:user_id',(req,res)=>{
    const user_id = req.params.user_id
    conn.query(`SELECT * FROM questions where user_id= '${user_id}'`,(err,result)=>
    {
        if(err) throw err;
        res.json(result)
        console.log(result);
    });
  })
  //get answer by user_id
  router.get('/answer/user/:user_id',(req,res)=>{
    const user_id = req.params.user_id
    conn.query(`SELECT * FROM answers where user_id= '${user_id}'`,(err,result)=>
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
      conn.query(`DELETE FROM questions Where id=${question_id}`, function (err, result) 
      {
        if (err)
          res.json({ msg: err.message });;
        res.json(result)
    
      });
  })
  
  //get answers by user_id and question_id
router.get('/answer/question/user/:question_id/',(req,res)=>{
  //const user_id = req.params.user_id
  const question_id = req.params.question_id
  conn.query(`SELECT * FROM answers where question_id= '${question_id}' `,(err,result)=>
  {
      if(err) throw err;
      res.json(result)
      console.log(result);
  });
})
//Post answer
router.post('/answer',(req,res)=>{
  var reply=req.body.reply
  var question_id = req.body.question_id
  var user_id = req.body.user_id

  conn.query(`Insert into answers(reply, question_id, user_id) 
              Values('${reply}' ,'${question_id}' ,'${user_id}'  )` ,
    function (err, result)
    {
      if(err)
      {
        res.json({ msg: 'error' });
      }
    })
    })
module.exports=router;
