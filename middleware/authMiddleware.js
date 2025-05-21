const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware xác thực người dùng thông qua JWT token
 */
const authMiddleware = async (req, res, next) => {
    try {
        // Lấy token từ header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Không tìm thấy token xác thực' });
        }

        // Tách token từ header
        const token = authHeader.split(' ')[1];

        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Tìm user trong database
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Người dùng không tồn tại' });
        }

        // Thêm thông tin user vào request
        req.user = {
            id: user._id,
            email: user.email,
            username: user.username
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token không hợp lệ' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token đã hết hạn' });
        }
        return res.status(500).json({ message: 'Lỗi xác thực' });
    }
};

module.exports = authMiddleware; 