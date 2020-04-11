const express = require('express');
const router = express.Router();
const conn = require('../config/Database');



router.post('/dislikes',(req,res)=>{
    var question_id=req.body.question_id
    var user_id = req.body.user_id

    conn.query( `select * from likes WHERE question_id = '${question_id}' and user_id = '${user_id}'` ,
    function ( result) {
        if(result.length > 0){
          res.json({ msg: 'Already liked a question, Cannot dislike.' });
        }else{
				conn.query(  `Insert into dislikes(user_id, question_id) Values('${user_id}', '${question_id}')`
				, function (err, result) {
                    if (err){
                        res.json({ msg: err.message });
                    }
              	});
		
			res.json(result)
		}
	});
});


  

router.delete('/dislikes/:id', (req, res) => {
    let id = req.params.id
    conn.query(`DELETE FROM dislikes Where id=${id}`, function (err, result, fields) {
      if (err)
        res.json({ msg: err.message });
      res.json(result)
  
    });
  });

  module.exports=router;
 