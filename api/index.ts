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
  connectionInfo.query(select, inputEmail, function (error: any, user: any){
    console.log(user)
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
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
      if (!results) {
        return res.json({
          message: "password is not correct",
        });
      }
      //Tokenの発行
      const payload = {
        id: user[0].user_id,
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

// ログインユーザーのメモ一覧取得
app.get("/memo/getAllMemos", function (req: any, res: any, next: any) {
  // const bearToken = req.headers;
  const bearToken = req.headers["authorization"];
  console.log(bearToken);
  const bearer = bearToken.split(" ");
  const token = bearer[1];
  const decodedToken = jwt.verify(token,'secret');
  const user_id = decodedToken.id;
  const select = 'SELECT memo_id, memo_title, memo_detail FROM memo WHERE user_id = ? AND del_flg = 0'
  connectionInfo.query(select, user_id, function (error: any, results: any) {
    if (error) {
      throw error;
    }
    return res.status(200).json({
      results
    });
  });
});

// ログインユーザーのメモ取得(1件)
// app.get("/memo/getOneMemo", function (req: any, res: any, next: any) {
app.get("/memo/:id", function (req: any, res: any, next: any) {
  console.log('AAA');
  const bearToken = req.headers["authorization"];
  // const bearToken = req.headers;
  // console.log(bearToken);
  const bearer = bearToken.split(" ");
  const token = bearer[1];
  console.log(token);
  const decodedToken = jwt.verify(token,'secret');
  const user_id = decodedToken.id;
  const memo_id: number = req.params.id;
  // const memo_id: number = req.body.id;
  console.log(memo_id)

  const select = 'SELECT memo_id, user_id, memo_title, memo_detail FROM memo WHERE user_id = ? AND memo_id = ? AND del_flg = 0'
  // const select = 'SELECT memo_id, memo_title, memo_detail FROM memo WHERE memo_id = ? AND del_flg = 0'
  // connectionInfo.query(select, [user_id, memo_id], function (error: any, results: any) {
  connectionInfo.query(select, [user_id, memo_id], function (error: any, results: any, fields: any) {
  // connectionInfo.query(select, memo_id, function (error: any, results: any) {
    // if (error) throw error;
    // console.log('The solution is: ', results[0].solution);
  // const data = {
  //     title: 'Memo Title',
  //     body: 'Memo Body'
  //   }
    // res.json(results)
    // res.send(results)
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    console.log(results[0]);
    return res.status(200).json({
      results
    });
    // if (error) {
    //   throw error;
    // }
    // console.log(results[0]);
    // return res.status(200).json({
    //   results
    // });
  });
  // connectionInfo.query(select, user_id, memo_id, (error: any, results: any, fields: any) => {
  //   if (error) throw error;
  //   console.log('The solution is: ', results[0].solution);
  // });
});

// メモ新規作成
app.post("/memo/createMemo", function (req: any, res: any, user: any) {
  const bearToken: string = req.headers["authorization"];
  const bearer: any = bearToken.split(" ");
  const token: any = bearer[1];
  const decodedToken: any = jwt.verify(token,'secret');
  console.log('decodedToken↓');
  console.log(decodedToken);
  const user_id: number = decodedToken.id;
  const memo_title: string = req.body.memo_title;
  const memo_detail: string = req.body.memo_detail;
  const del_flg: number = 0;
  const insert: string = 'INSERT INTO MEMO (user_id, memo_title, memo_detail, del_flg) VALUES (?,?,?,?)';
  connectionInfo.query(insert, [user_id, memo_title, memo_detail, del_flg],(err: any) => {
    if (err) {
      return res.status(400).json({"error":err.message});
    }
    return res.json({
      "message": "メモの登録に成功しました",
      "data": [req.body.memo_title, req.body.memo_detail]
    })
  })
});


// メモ編集
app.post("/memo/editMemo", function (req: any, res: any, user: any) {
  const bearToken: string = req.headers["authorization"];
  const bearer: any = bearToken.split(" ");
  const token: any = bearer[1];
  const decodedToken: any = jwt.verify(token,'secret');
  console.log('editMemo-decodedToken↓');
  console.log(decodedToken);
  const memo_title: string = req.body.memo_title;
  const memo_detail: string = req.body.memo_detail;
  const memo_id: number = req.body.memo_id;
  const user_id: number = decodedToken.id;
  // const del_flg: number = 0;
  const update: string = 'UPDATE memo SET memo_title = ?, memo_detail = ? WHERE memo_id = ? AND user_id = ?';
  connectionInfo.query(update, [memo_title, memo_detail, memo_id, user_id],(err: any) => {
    if (err) {
      return res.status(400).json({"error":err.message});
    }
    return res.json({
      "message": "メモの更新に成功しました",
      "data": [req.body.memo_title, req.body.memo_detail]
    })
  })
});

// メモ削除
app.post("/memo/deleteMemo", function (req: any, res: any, user: any) {
  const bearToken: string = req.headers["authorization"];
  const bearer: any = bearToken.split(" ");
  const token: any = bearer[1];
  const decodedToken: any = jwt.verify(token,'secret');
  // console.log('decodedToken↓');
  // console.log(decodedToken);
  // const memo_id: number = req.body;
  const memo_id: any = req.body.memoId;
  // console.log('memo_id↓');
  // console.log(memo_id);
  const user_id: number = decodedToken.id;
  // const memo_title: string = req.body.memo_title;
  // const memo_detail: string = req.body.memo_detail;
  // const del_flg: number = 0;
  const update: string = 'UPDATE memo SET del_flg = 1 WHERE memo_id = ? AND user_id = ?';
  connectionInfo.query(update, [memo_id, user_id], (err: any) => {
    if (err) {
      return res.status(400).json({"error":err.message});
    }
    return res.json({
      "message": "メモの削除に成功しました",
      // "data": [req.body.memo_title, req.body.memo_detail]
    })
  })
});

app.listen(port, () => { console.log(`${port}番のポートで待機中です...`);})

module.exports = app;