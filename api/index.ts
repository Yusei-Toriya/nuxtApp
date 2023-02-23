/*
Express起動
npx ts-node api/index.ts
*/
require("dotenv").config();
// const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;
const mysql = require("mysql");
// const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
// const axios = require("axios");

app.use(cors());
app.use(bodyParser.json());

// DB接続情報
const connectionInfo = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// ユーザー情報登録
app.post("/auth/register", function (request: any, response: any) {
  // ユーザー存在確認(emailの存在確認)
  const inputEmail: string = request.body.email;
  const select = "SELECT * FROM users WHERE email = ?";
  connectionInfo.query(select, inputEmail, function (error: any, user: any) {
    if (error) {
      return response.status(400).json({
        error,
      });
    } else if (user.length !== 0) {
      return response.status(401).json({
        message: "このメールアドレスは既に登録されています",
      });
    }
    // emailがDBに存在しない場合はユーザー登録処理を行う
    else if (!user || user.length === 0) {
      const insert =
        "INSERT INTO USERS (name, email, password, del_flg) VALUES (?,?,?,?)";
      bcrypt.hash(request.body.password, saltRounds, (hash: any) => {
        connectionInfo.query(
          insert,
          [request.body.name, request.body.email, hash, 0],
          (error: any) => {
            if (error) {
              return response.status(400).json({
                error,
              });
            }
          }
        );
      });
    }
  });
});

// ユーザー情報削除(論理削除)
// app.delete("/delete/:id", function (request: any, response: any, next: any) {
//   const id = request.params.id;
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

// ログイン
app.post("/auth/login", function (request: any, response: any) {
  const inputEmail: string = request.body.email;
  const inputPassword: string = request.body.password;
  const select = "SELECT * FROM users WHERE email = ?";
  connectionInfo.query(select, inputEmail, function (error: any, user: any) {
    if (error) {
      return response.status(400).json({
        error,
      });
    } else if (!user || user.length === 0) {
      return response.status(401).json({
        message: "メールアドレスが間違っています。",
      });
    } else {
      bcrypt.compare(
        inputPassword,
        user[0].password,
        function (error: any, results: any) {
          if (error) {
            return response.status(400).json({
              error: error.message,
            });
          }
          if (!results) {
            return response.status(401).json({
              message: "パスワードが間違っています。",
            });
          }
          // Tokenの発行
          const payload = {
            id: user[0].user_id,
            name: user[0].name,
            email: user[0].email,
          };
          const token = jwt.sign(payload, "secret");
          return response.json({
            token,
            message: "ログインしました",
          });
        }
      );
    }
  });
});

// Token確認
app.get("/auth/user", (request: any, response: any) => {
  const bearToken = request.headers.authorization;
  const bearer = bearToken.split(" ");
  const token = bearer[1];
  jwt.verify(token, "secret", (error: any, user: any) => {
    if (error) {
      return response.sendStatus(403);
    } else {
      return response.json({
        user,
      });
    }
  });
});

// ログインユーザーのメモ一覧取得
app.get("/memo/getAllMemos", function (request: any, response: any) {
  const bearToken = request.headers.authorization;
  const bearer = bearToken.split(" ");
  const token = bearer[1];
  const decodedToken = jwt.verify(token, "secret");
  const user_id = decodedToken.id;
  const select =
    "SELECT memo_id, memo_title, memo_detail, created_date FROM memo WHERE user_id = ? AND del_flg = 0 ORDER BY memo_id DESC";
  connectionInfo.query(select, user_id, function (error: any, results: any) {
    if (error) {
      return response.status(400).json({
        error,
      });
    }
    if (results) {
      const memo_count: number = results.length;
      return response.status(200).json({
        results,
        memo_count,
      });
    }
  });
});

// ログインユーザーのメモ取得(1件)
app.get("/memo/:id", function (request: any, response: any) {
  const bearToken = request.headers.authorization;
  const bearer = bearToken.split(" ");
  const token = bearer[1];
  const decodedToken = jwt.verify(token, "secret");
  const user_id: number = decodedToken.id;
  const memo_id: number = request.params.id;

  const select =
    "SELECT memo_id, user_id, memo_title, memo_detail FROM memo WHERE user_id = ? AND memo_id = ? AND del_flg = 0";
  connectionInfo.query(
    select,
    [user_id, memo_id],
    function (error: any, results: any) {
      if (error) {
        return response.status(400).json({
          error,
        });
      }
      return response.status(200).json({
        results,
      });
    }
  );
});

// メモ新規作成
app.post("/memo/createMemo", function (request: any, response: any) {
  const bearToken: string = request.headers.authorization;
  const bearer: any = bearToken.split(" ");
  const token: any = bearer[1];
  const decodedToken: any = jwt.verify(token, "secret");
  const user_id: number = decodedToken.id;
  const memo_title: string = request.body.memo_title;
  const memo_detail: string = request.body.memo_detail;
  const del_flg: number = 0;
  const insert: string =
    "INSERT INTO MEMO (user_id, memo_title, memo_detail, del_flg) VALUES (?,?,?,?)";
  connectionInfo.query(
    insert,
    [user_id, memo_title, memo_detail, del_flg],
    (error: any) => {
      if (error) {
        return response.status(400).json({ error: error.message });
      }
      return response.json({
        message: "メモの登録に成功しました",
      });
    }
  );
});

// メモ編集
app.post("/memo/editMemo", function (request: any, response: any) {
  const bearToken: string = request.headers.authorization;
  const bearer: any = bearToken.split(" ");
  const token: any = bearer[1];
  const decodedToken: any = jwt.verify(token, "secret");
  const memo_title: string = request.body.memo_title;
  const memo_detail: string = request.body.memo_detail;
  const memo_id: number = request.body.memo_id;
  const user_id: number = decodedToken.id;
  const update: string =
    "UPDATE memo SET memo_title = ?, memo_detail = ? WHERE memo_id = ? AND user_id = ?";
  connectionInfo.query(
    update,
    [memo_title, memo_detail, memo_id, user_id],
    (error: any) => {
      if (error) {
        return response.status(400).json({
          error,
        });
      }
      return response.json({
        message: "メモの更新に成功しました",
      });
    }
  );
});

// メモ削除
app.post("/memo/deleteMemo", function (request: any, response: any) {
  const bearToken: string = request.headers.authorization;
  const bearer: any = bearToken.split(" ");
  const token: any = bearer[1];
  const decodedToken: any = jwt.verify(token, "secret");
  const memo_id: any = request.body.memoId;
  const user_id: number = decodedToken.id;
  const update: string =
    "UPDATE memo SET del_flg = 1 WHERE memo_id = ? AND user_id = ?";
  connectionInfo.query(update, [memo_id, user_id], (error: any) => {
    if (error) {
      return response.status(400).json({
        error,
      });
    }
    return response.json({
      message: "メモの削除に成功しました",
    });
  });
});

app.listen(port, () => {
  console.log(`${port}番のポートで待機中です...`);
});

module.exports = app;
