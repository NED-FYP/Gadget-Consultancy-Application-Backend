var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:'gadgetconsultancy'
});
module.exports = con

/** 
var con = mysql.createConnection({
  host: "192.185.157.181",
  user: "bazarist_gadget",
  password: "gadget123@#",
  database:'bazarist_gadget'
});
*/