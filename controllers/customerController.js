const Customer = require('../models/customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new customer
exports.register = async (req, res) => {
    try {
        const { email, password, name, phone } = req.body;

        // Check if customer already exists
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new customer
        const customer = new Customer({
            email,
            password: hashedPassword,
            name,
            phone
        });

        const savedCustomer = await customer.save();
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find customer
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        // Generate token
        const token = jwt.sign(
            { id: customer._id, role: 'customer' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get customer profile
exports.getProfile = async (req, res) => {
    try {
        const customer = await Customer.findById(req.user.id).select('-password');
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update customer profile
exports.updateProfile = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.user.id,
            req.body,
            { new: true }
        ).select('-password');
        res.json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get customer orders
exports.getCustomerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customerId: req.user.id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get customer invoices
exports.getCustomerInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ customerId: req.user.id });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get customer coupons
exports.getCustomerCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({ customerId: req.user.id });
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all customers (admin only)
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().select('-password');
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get customer by ID (admin only)
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).select('-password');
        if (!customer) {
            return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete customer (admin only)
exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
        }
        res.json({ message: 'Đã xóa khách hàng thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 