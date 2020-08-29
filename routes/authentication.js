const express = require('express');
const router = express.Router();
const conn = require('../config/Database');
var crypto = require('crypto');


//login
router.post('/login', function(request, response) {
	const email_address = request.body.email_address;
	const password = request.body.password;
	const hashedpassword = crypto.createHash('md5').update(password).digest('hex');

	if (email_address && hashedpassword) 
	{
		conn.query('SELECT email_address, password FROM users WHERE email_address = ? AND password = ?', [email_address,hashedpassword],
		function(error, results, fields) {
			if (results.length > 0) 
			{
				response.send({'success' :true ,'users': results[0].email_address});
			} 
			else 
			{
				response.send({'success' :false , 'message': 'Incorrect Username and/or Password!'});
			}			
		response.end();
		});
	}
	else 
    {
		response.send({'success' :false , 'message':'Please enter Username and Password!'});
		response.end();
	}


});

module.exports=router;