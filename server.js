// index.js
require('dotenv').config(); // Load biến môi trường từ .env

const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.SERVER_URI_MONGODB;

// Import routes
const catalogRoutes = require('./routes/catalogRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');


// Kết nối MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ Đã kết nối MongoDB thành công!'))
.catch((err) => console.error('❌ Kết nối MongoDB thất bại:', err));

// Middleware
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));




// Route mẫu
app.get('/', (req, res) => {
  res.send('Hello World from Express with MongoDB!!!');
});

// Sử dụng routes
app.use('/api/catalogs', catalogRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
// Routes
app.use('/api/auth', authRoutes); 

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
});
