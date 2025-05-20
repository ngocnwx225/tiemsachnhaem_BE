const AdminLogin = require('../models/adminlogin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng ký admin mới
exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Kiểm tra username đã tồn tại chưa
        const existingAdmin = await AdminLogin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Username đã tồn tại' });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo admin mới
        const admin = new AdminLogin({
            username,
            password: hashedPassword,
            role: role || 'admin'
        });

        await admin.save();

        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi đăng ký' });
    }
};

// Đăng nhập
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra username
        const admin = await AdminLogin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ error: 'Username không tồn tại' });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Mật khẩu không đúng' });
        }

        // Tạo JWT token
        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                role: admin.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi đăng nhập' });
    }
};

// Đăng xuất
exports.logout = async (req, res) => {
    try {
        // Trong trường hợp sử dụng JWT, chúng ta không cần xử lý gì ở phía server
        // Client sẽ tự xóa token
        res.json({ message: 'Đăng xuất thành công' });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi đăng xuất' });
    }
}; 