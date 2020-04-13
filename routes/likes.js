const express = require('express');
const router = express.Router();
const conn = require('../config/Database');

router.post('/likes',(req,res)=>{
  var question_id=req.body.question_id
  var user_id = req.body.user_id
  conn.query(`select * from dislikes WHERE question_id = '${question_id}' and user_id = '${user_id}'`
  ,(err,result)=>
  {
          if (result.length > 0) 
          {
              if(result)
              {
                res.json('Already disliked!! cannot like the question');
              }
            
          } 
          else 
          {
              conn.query(  `Insert into likes(user_id, question_id) Values('${user_id}', '${question_id}')`
              , function (err, result) {
                        if(err) throw err;
                        res.json(result)
              });
          }			
  });
})
/** 
router.get('/likes',(req,res)=>{
    var question_id=req.body.question_id
    var user_id = req.body.user_id
    
    conn.query( `select * from dislikes WHERE question_id = '${question_id}' and user_id = '${user_id}'` ,
    function ( results , err ) { 
        if( results != null ){
          res.json({ msg: 'Already disliked a question, Cannot like.' });
        }
        else{
				conn.query(  `Insert into likes(user_id, question_id) Values('${user_id}', '${question_id}')`
				, function (err, result) {
                    if (err){
                        res.json({ msg: err.message });
                    res.json(result)  
                    }
              	});
		
			//res.json(results)
		}
  });

});*/



  

router.delete('/likes/:id', (req, res) => {
    let id = req.params.id
    conn.query(`DELETE FROM likes Where id=${id}`, function (err, result, fields) {
      if (err)
        res.json({ msg: err.message });
      res.json(result)
  
    });
  });

  module.exports=router;
 