require('dotenv').config();
// console.log(process.env.HOST);
// console.log(process.env.USER);
// console.log(process.env.PASSWORD);
// console.log(process.env.DATABASE);
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const axios = require('axios');

const connectionInfo = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});


connectionInfo.connect(function(error: any) {
  if (error) throw error;
  console.log('Connected');
});

app.get('/', (request: any, response: { send: (arg0: any) => void; }) => {
  const sql = "select * from users"
  connectionInfo.query(sql, function (error: any, result: any, fields: any) {
  if (error) throw error;
  response.send(result)
  // console.log(result)
  });
});

// const sql = "INSERT INTO users(name,mail,password) VALUES('kevin','kevin','kevin1111')"

// connectionInfo.query(sql,function(error, result, fields){
// 	if (error) throw error;
// 	console.log(result)
// })
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (request, response) => response.sendFile(path.join(__dirname,'../pages/index.vue')))
// app.post('/', (request, response) => response.send(request.body))

app.listen(port, () => {})


module.exports = router;