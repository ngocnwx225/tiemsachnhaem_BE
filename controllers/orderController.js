const Order = require('../models/order');

// Lấy tất cả orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu orders' });
    }
};

// Lấy order theo ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Không tìm thấy order' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu order' });
    }
};

// Tạo order mới
exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ error: 'Lỗi khi tạo order' });
    }
};

// Cập nhật order
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ error: 'Không tìm thấy order' });
        }
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: 'Lỗi khi cập nhật order' });
    }
};

// Xóa order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Không tìm thấy order' });
        }
        res.json({ message: 'Đã xóa order thành công' });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi xóa order' });
    }
}; 