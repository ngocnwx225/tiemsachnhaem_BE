const AdminLogin = require('../models/adminlogin');
const bcrypt = require('bcryptjs');

// Đăng ký admin mới
exports.register = async (req, res) => {
    try {
        const { adminName, password } = req.body;

        // Kiểm tra adminName đã tồn tại chưa
        const existingAdmin = await AdminLogin.findOne({ adminName });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Tên admin đã tồn tại' });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo admin mới
        const admin = new AdminLogin({
            adminName,
            password: hashedPassword
        });

        await admin.save();

        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (err) {
        console.error('Lỗi đăng ký:', err);
        res.status(500).json({ error: 'Lỗi khi đăng ký' });
    }
};

// Đăng nhập
exports.login = async (req, res) => {
    try {
        const { adminName, password } = req.body;
        
        // Kiểm tra adminName
        const admin = await AdminLogin.findOne({ adminName });
        if (!admin) {
            return res.status(400).json({ error: 'Tên admin không tồn tại' });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Mật khẩu không đúng' });
        }

        // Trả về thông tin admin (không bao gồm password)
        res.json({
            admin: {
                id: admin._id,
                adminName: admin.adminName
            }
        });
    } catch (err) {
        console.error('Lỗi đăng nhập:', err);
        res.status(500).json({ error: 'Lỗi khi đăng nhập' });
    }
};

// Đăng xuất
exports.logout = (req, res) => {
    try {
        res.json({ message: 'Đăng xuất thành công' });
    } catch (err) {
        console.error('Lỗi đăng xuất:', err);
        res.status(500).json({ error: 'Lỗi khi đăng xuất' });
    }
}; 