const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

// ✅ KẾT NỐI VỚI MONGODB ATLAS
mongoose.connect('mongodb+srv://data:data@cluster0.7hjpyh2.mongodb.net/webbansach?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Đã kết nối MongoDB Atlas'))
.catch((err) => console.error('❌ Lỗi kết nối MongoDB Atlas:', err));

// ⚙️ CẤU HÌNH MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret', // nên chuyển vào .env nếu deploy thật
    resave: false,
    saveUninitialized: true,
  })
);

app.set('view engine', 'ejs');
app.use(express.static('public'));

// GỬI SESSION QUA MỌI TEMPLATE EJS
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// ĐỊNH TUYẾN
app.use(authRoutes);

// CHUYỂN "/" VỀ "/login"
app.get('/', (req, res) => {
  res.redirect('/login');
});

// KHỞI ĐỘNG SERVER
app.listen(3000, () => {
  console.log('🚀 Server đang chạy tại http://localhost:3000');
});