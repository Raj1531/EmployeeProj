const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
  host:'sql6.freesqldatabase.com',
  user:'sql6683525',
  password:'Ar72pcHStF',
  database:'sql6683525',
  
})

module.exports=mysqlPool;