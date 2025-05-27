const User = require('../models/user');
const Order = require('../models/order');

// Lấy danh sách user (chỉ cho admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // Lấy tổng số đơn hàng và tổng chi tiêu cho từng user
    const result = await Promise.all(users.map(async (user) => {
      // Populate orders
      await user.populate('orders');
      const totalOrders = user.orders.length;
      const totalSpent = user.orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      return {
        id: user._id,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        status: user.status,
        totalOrders,
        totalSpent
      };
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy user theo id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('orders');
    if (!user) return res.status(404).json({ error: 'Không tìm thấy user' });
    const totalOrders = user.orders.length;
    const totalSpent = user.orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    res.json({
      id: user._id,
      fullName: user.fullName,
      status: user.status,
      totalOrders,
      totalSpent,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      role: user.role,
      orders: user.orders.map(order => ({
        id: order._id,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
        items: order.items
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'Không tìm thấy user' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xóa user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Không tìm thấy user' });
    res.json({ message: 'Đã xóa user' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 