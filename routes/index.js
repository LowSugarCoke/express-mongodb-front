const express = require('express');
const router = express.Router();

// 引入 Mongoose 模組
const mongoose = require("mongoose");

// 連接至 MongoDB 資料庫
mongoose.connect("mongodb://127.0.0.1/local", {
  useNewUrlParser: true, useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("連接成功");
  }
});

// 定義 User 模型
const userSchema = new mongoose.Schema({
  name: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// 處理 GET 請求，返回首頁
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 處理 GET 請求，處理登入邏輯
router.get('/api/login', (req, res) => {
  // 從請求的查詢字串中獲取使用者名稱和密碼
  const username = req.query.username;
  const password = req.query.password;

  console.log(username, password);

  try {
    // 在這裡處理登入邏輯，例如從資料庫中查詢使用者，驗證使用者證據等
    User.find({ name: username }, (err, users) => {
      if (err) {
        console.error('從 MongoDB 查詢使用者時出錯', err);
        res.status(401).json({ message: '登入失敗' });
        return;
      }

      if (users.length === 0 || users.password!=this.password) {
        res.status(401).json({ message: '登入失敗' });
        return;
      }

      console.log('找到使用者:', users);

      // 假設登入成功，返回 200 狀態碼和成功訊息
      res.status(200).json({ message: '登入成功' });
    });

  } catch (error) {
    // 處理登入失敗的情況，例如返回 401 狀態碼和錯誤訊息
    res.status(401).json({ message: '登入失敗' });
  }
});


// 處理 POST 請求，處理註冊邏輯
router.post('/api/register', (req, res) => {
  // 從請求的表單資料中獲取使用者名稱和密碼
  var username = req.body.username;
  var password = req.body.password;

  console.log("使用者名稱", username, "密碼", password);

  // 創建一個新的 User 物件，使用從表單獲取的使用者名稱和密碼
  const user = new User({
    name: username,
    password: password
  });

  // 將使用者資訊保存到 MongoDB 資料庫中
  user.save((err, result) => {
    if (err) {
      console.error('將使用者資訊保存到 MongoDB 時出錯', err);
      return;
    }
    console.log('使用者保存成功:', result);
    
    // 假設註冊成功，返回 200 狀態碼和成功訊息
    res.status(200).json({ message: '註冊成功' });
  });
});

module.exports = router;
