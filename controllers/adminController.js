const AdminLogin = require('../models/adminlogin');

// Lấy tất cả admin
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminLogin.find();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu admin' });
    }
};

// Lấy admin theo ID
exports.getAdminById = async (req, res) => {
    try {
        const admin = await AdminLogin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: 'Không tìm thấy admin' });
        }
        res.json(admin);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu admin' });
    }
};

// Tạo admin mới
exports.createAdmin = async (req, res) => {
    try {
        const admin = new AdminLogin(req.body);
        const savedAdmin = await admin.save();
        res.status(201).json(savedAdmin);
    } catch (err) {
        res.status(400).json({ error: 'Lỗi khi tạo admin' });
    }
};

// Cập nhật admin
exports.updateAdmin = async (req, res) => {
    try {
        const admin = await AdminLogin.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!admin) {
            return res.status(404).json({ error: 'Không tìm thấy admin' });
        }
        res.json(admin);
    } catch (err) {
        res.status(400).json({ error: 'Lỗi khi cập nhật admin' });
    }
};

// Xóa admin
exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await AdminLogin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: 'Không tìm thấy admin' });
        }
        res.json({ message: 'Đã xóa admin thành công' });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi xóa admin' });
    }
}; 