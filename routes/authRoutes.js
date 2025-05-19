const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Trang đăng nhập
router.get('/login', (req, res) => {
  res.render('login');
});

// Xử lý đăng nhập
router.post('/login', async (req, res) => {
  const { adminName, password } = req.body;
  const admin = await Admin.findOne({ adminName, password });

  if (admin) {
    req.session.admin = admin;
    res.redirect('/dashboard');
  } else {
    res.send('❌ Sai tài khoản hoặc mật khẩu');
  }
});

// Trang dashboard sau khi đăng nhập
router.get('/dashboard', (req, res) => {
  if (!req.session.admin) return res.redirect('/login');
  res.render('dashboard');
});

// Đăng xuất
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;