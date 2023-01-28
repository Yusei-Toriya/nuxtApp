require('dotenv').config();
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 5000
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const axios = require('axios');

app.use(cors())
app.use(bodyParser.json())


// const allowCrossDomain = function(req: any, res: any, next: any) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization, access_token'
//   )

//   // intercept OPTIONS method
//   if ('OPTIONS' === req.method) {
//     res.send(200)
//   } else {
//     next()
//   }
// }
// app.use(allowCrossDomain)

// DB接続情報
const connectionInfo = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});


connectionInfo.connect(function(error: any) {
  if (error) throw error;
  // connectionInfo.query("SELECT * FROM users", function (error: any, results: any) {
  //   console.log(results)
  // });
  console.log('Connected');
});

//ユーザー情報取得
app.get("/users", function (req: any, res: any, next: any) {
  connectionInfo.query("SELECT * FROM users", function (error: any, results: any) {
    if (error) {
      throw error;
    }
    res.status(200).json({
      data: results.rows[0],
    });
  });
});

//ユーザー情報登録
app.post("/auth/register", function (req: any, res: any, next: any) {
  console.log("登録処理")
  const insert = 'INSERT INTO USERS (name, email, password, del_flg) VALUES (?,?,?,?)'
  bcrypt.hash(req.body.password, saltRounds, (err: any, hash: any) => {
    connectionInfo.query(insert, [req.body.name, req.body.email, hash, 0],(err: any) => {
      if (err) {
        return res.status(400).json({"error":err.message});
      }
      return res.json({
        "message": "ユーザー登録に成功しました",
        "data": [req.body.name, req.body.email]
      })
    })
  })
});

//ユーザー情報削除(論理削除)
// app.delete("/delete/:id", function (req: any, res: any, next: any) {
//   const id = req.params.id;
//   const update = 'UPDATE USERS SET del_flg=1 WHERE user_id = ?'
//   connectionInfo.query(update, [id], function (
//     error: any,
//     results: any
//   ) {
//     if (error) {
//       res.status(500).json({
//         status: "500 Internal Server Error",  error: error,
//       });
//     }
//     if (results.rowCount === 0) {
//       res.status(400).json({
//         status: "400 Bad Request",
//         message: "データが存在しません。",
//       });
//     } else {
//       res.status(200).json({
//         status: "success",
//         message: "データを削除しました。",
//       });
//     }
//   });
// });

//ログイン
app.post("/auth/login", function (req: any, res: any, next: any) {
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;
  const select = 'select * from users where email = ?'
  // const params = [req.body.email]

  // console.log("params↓");
  // console.log(params);

  connectionInfo.query(select, inputEmail, function (error: any, user: any){
    // console.log("user↓")
    // console.log(user[0].email)
    // console.log(user[0].password)
    if (error) {
      res.status(400).json({
        status: "400 Bad Request",
        error: error,
      });
    }
    if (!user) {
      return res.json({
        message: "email not found",
      });
    }
    
    bcrypt.compare(inputPassword, user[0].password, function (error: any, results: any) {
      // console.log('aaaaaaaaaaa');
      // console.log(user[0].password)
      // console.log(inputPassword)
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
      // console.log('bbbbbbbbbbbbbbbb');
      // console.log(results);
      if (!results) {
        return res.json({
          message: "password is not correct",
        });
      }
      // console.log('cccccccccccc');
      // console.log("results.id↓"); //追記
      // console.log(results); //追記
      //Tokenの発行
      const payload = {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
      };
      const token = jwt.sign(payload, "secret");
      return res.json({ token });
    });
  });
});

//Token確認
app.get("/auth/user", (req: any, res: any) => {
  // const headers = req.headers;
  // return console.log(headers)
  const bearToken = req.headers["authorization"];
  const bearer = bearToken.split(" ");
  const token = bearer[1];
  jwt.verify(token,'secret',(err: any, user: any)=>{
    if(err){
      return res.sendStatus(403)
    }else{
      return res.json({
        user
      });
    }
  });
});

app.listen(port, () => { console.log(`${port}番のポートで待機中です...`);})

module.exports = app;