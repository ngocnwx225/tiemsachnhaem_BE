const UserLog = require('../models/user_log');

// Lấy tất cả user logs
exports.getAllUserLogs = async (req, res) => {
  try {
    const logs = await UserLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy user log theo ID
exports.getUserLogById = async (req, res) => {
  try {
    const log = await UserLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: 'Không tìm thấy user log' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo user log mới
exports.createUserLog = async (req, res) => {
  try {
    const newLog = new UserLog(req.body);
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật user log
exports.updateUserLog = async (req, res) => {
  try {
    const updatedLog = await UserLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLog) return res.status(404).json({ message: 'Không tìm thấy user log' });
    res.json(updatedLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa user log
exports.deleteUserLog = async (req, res) => {
  try {
    const deletedLog = await UserLog.findByIdAndDelete(req.params.id);
    if (!deletedLog) return res.status(404).json({ message: 'Không tìm thấy user log' });
    res.json({ message: 'Đã xóa user log' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 