const Order = require('../models/order');
const Product = require('../models/product_book');
const mongoose = require('mongoose');

// Lấy tất cả orders
exports.getAllOrders = async (req, res) => {
    try {
        // Log để kiểm tra
        console.log('Fetching orders...');
        
        const orders = await Order.find();
        console.log('Found orders:', orders.length);
        
        if (!orders || orders.length === 0) {
            return res.json([]); // Trả về mảng rỗng nếu không có orders
        }

        // Populate thông tin user cho từng order
        const formattedOrders = await Promise.all(orders.map(async (order) => {
            try {
                // Populate thông tin user
                await order.populate('userId', 'fullName email');
                // await order.populate('products.productId', 'title price');
                
                return {
                    id: order._id,
                    customerName: order.userId ? order.userId.fullName : 'N/A',
                    customerEmail: order.userId ? order.userId.email : 'N/A',
                    createdAt: order.createdAt,
                    totalAmount: order.totalAmount || 0,
                    status: order.status || 'pending'
                };
            } catch (populateError) {
                console.error('Error populating order:', order._id, populateError);
                // Trả về thông tin cơ bản nếu không populate được
                return {
                    id: order._id,
                    customerName: 'N/A',
                    customerEmail: 'N/A',
                    createdAt: order.createdAt,
                    totalAmount: order.totalAmount || 0,
                    status: order.status || 'pending'
                };
            }
        }));

        console.log('Formatted orders successfully');
        res.json(formattedOrders);
    } catch (err) {
        console.error('Error in getAllOrders:', err);
        res.status(500).json({ 
            error: 'Lỗi khi lấy dữ liệu orders',
            details: err.message 
        });
    }
};

// Lấy order theo ID
exports.getOrderById = async (req, res) => {
    console.log('Fetching order by ID:', req.params.id);
    try {
        // Kiểm tra xem ID có đúng định dạng MongoDB không
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.log('Invalid MongoDB ID format:', req.params.id);
            return res.status(400).json({ error: 'ID đơn hàng không hợp lệ' });
        }

        // Thử lấy đơn hàng trước khi populate để kiểm tra
        const orderExists = await Order.findById(req.params.id);
        console.log('Order exists check:', !!orderExists);
        
        if (!orderExists) {
            return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
        }

        // Nếu đơn hàng tồn tại, thực hiện populate
        const order = await Order.findById(req.params.id);
        
        console.log('Order raw data:', JSON.stringify(order));
        console.log('Order userId:', order.userId);
        console.log('Order products:', order.products);

        // Populate thủ công để tránh lỗi khi không có reference
        let userData = null;
        if (order.userId) {
            const User = require('../models/user');
            try {
                userData = await User.findById(order.userId);
                console.log('User data found:', !!userData);
            } catch (userErr) {
                console.error('Error fetching user data:', userErr);
            }
        }

        // Populate thông tin sản phẩm
        const populatedProducts = [];
        if (order.products && order.products.length > 0) {
            for (const item of order.products) {
                try {
                    const product = await Product.findById(item.productId);
                    if (product) {
                        populatedProducts.push({
                            product,
                            quantity: item.quantity,
                            price: item.price || product.price
                        });
                    } else {
                        console.log('Product not found for ID:', item.productId);
                        populatedProducts.push({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.price,
                            productNotFound: true
                        });
                    }
                } catch (productErr) {
                    console.error('Error fetching product:', productErr);
                }
            }
        }
        
        console.log('Populated products count:', populatedProducts.length);

        // Tạo response object một cách an toàn
        const formattedOrder = {
            id: order._id,
            orderInfo: {
                createdAt: order.createdAt,
                totalAmount: order.totalAmount,
                status: order.status,
                orderDate: order.orderDate,
                paymentMethod: order.paymentMethod,
                shippingAddress: order.shippingAddress
            }
        };

        // Thêm thông tin khách hàng nếu có
        if (userData) {
            formattedOrder.customerInfo = {
                id: userData._id,
                name: userData.fullName,
                email: userData.email,
                phoneNumber: userData.phoneNumber || 'N/A',
                address: userData.address || 'N/A'
            };
        } else {
            formattedOrder.customerInfo = {
                id: order.userId,
                name: 'N/A',
                email: 'N/A',
                phoneNumber: 'N/A',
                address: 'N/A'
            };
        }

        // Thêm thông tin sản phẩm
        formattedOrder.items = populatedProducts.map(item => {
            if (item.productNotFound) {
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price || 0,
                    subtotal: (item.price || 0) * item.quantity,
                    productNotFound: true
                };
            }
            
            return {
                productId: item.product._id,
                ISBN: item.product.ISBN,
                title: item.product.bookTitle,
                author: item.product.author,
                price: item.price || item.product.price,
                imageUrl: item.product.imageUrl,
                quantity: item.quantity,
                subtotal: (item.price || item.product.price) * item.quantity
            };
        });

        console.log('Formatted response successfully');
        res.json(formattedOrder);
    } catch (err) {
        console.error('Error in getOrderById:', err);
        res.status(500).json({ 
            error: 'Lỗi khi lấy dữ liệu đơn hàng', 
            details: err.message,
            stack: err.stack
        });
    }
};

// Tạo order mới
exports.createOrder = async (req, res) => {
    try {
        // Lấy userId từ request body
        const { userId } = req.body;
        
        if (!userId) {
            return res.status(400).json({ error: 'userId là bắt buộc' });
        }
        
        // Tạo đơn hàng với dữ liệu từ người dùng
        const orderData = {
            ...req.body,
            orderDate: new Date().toISOString(),
            status: "pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Tính toán tổng tiền từ sản phẩm
        let totalAmount = 0;
        if (orderData.products && orderData.products.length > 0) {
            orderData.products.forEach(item => {
                totalAmount += item.price * item.quantity;
            });
        }
        orderData.totalAmount = totalAmount;
        
        // Kiểm tra số lượng tồn kho trước khi tạo đơn hàng
        if (orderData.products && orderData.products.length > 0) {
            for (const item of orderData.products) {
                const product = await Product.findById(item.productId);
                if (!product) {
                    return res.status(400).json({ 
                        error: 'Sản phẩm không tồn tại', 
                        productId: item.productId 
                    });
                }
                
                if (product.stock < item.quantity) {
                    return res.status(400).json({ 
                        error: 'Số lượng sản phẩm trong kho không đủ', 
                        product: product.bookTitle,
                        requested: item.quantity,
                        available: product.stock
                    });
                }
            }
        }
        
        const order = new Order(orderData);
        const savedOrder = await order.save();
        
        // Cập nhật soldCount và giảm stock cho từng sản phẩm trong đơn hàng
        if (savedOrder.products && savedOrder.products.length > 0) {
            const updatePromises = savedOrder.products.map(async (item) => {
                // Tăng soldCount và giảm stock của sản phẩm theo số lượng mua
                return Product.findByIdAndUpdate(
                    item.productId,
                    { 
                        $inc: { 
                            soldCount: item.quantity,
                            stock: -item.quantity 
                        } 
                    },
                    { new: true }
                );
            });
            
            // Chờ tất cả các thao tác cập nhật hoàn tất
            await Promise.all(updatePromises);
            console.log('Updated product data for all products in the order');
        }
        
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(400).json({ error: 'Lỗi khi tạo order', details: err.message });
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

// Lấy thống kê về đơn hàng, doanh thu và user
exports.getOrderStatistics = async (req, res) => {
    try {
        console.log('Fetching order statistics...');
        
        // Tổng số đơn hàng
        const totalOrders = await Order.countDocuments();
        console.log('Total orders count:', totalOrders);
        
        // Tổng số đơn hàng với trạng thái pending
        const pendingOrders = await Order.countDocuments({ status: 'pending' });
        console.log('Pending orders count:', pendingOrders);
        
        // Tổng doanh thu (tổng totalAmount của tất cả đơn hàng)
        let totalRevenue = 0;
        try {
            const revenueResult = await Order.aggregate([
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$totalAmount' }
                    }
                }
            ]);
            totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
            console.log('Total revenue calculated:', totalRevenue);
        } catch (revenueErr) {
            console.error('Error calculating revenue:', revenueErr);
            // Continue with zero revenue
        }
        
        // Tổng số người dùng (có role = 'user')
        let totalUsers = 0;
        try {
            const User = require('../models/user');
            totalUsers = await User.countDocuments({ role: 'user' });
            console.log('Total users count:', totalUsers);
        } catch (userErr) {
            console.error('Error counting users:', userErr);
            // Continue with zero users
        }
        
        // 5 đơn hàng gần nhất
        let recentOrders = [];
        try {
            recentOrders = await Order.find()
                .sort({ createdAt: -1 })
                .limit(5);
            console.log('Recent orders fetched:', recentOrders.length);
        } catch (recentErr) {
            console.error('Error fetching recent orders:', recentErr);
            // Continue with empty orders
        }
            
        // Format đơn hàng gần đây để có thông tin chi tiết hơn
        const formattedRecentOrders = await Promise.all(recentOrders.map(async (order) => {
            try {
                // Lấy thông tin người dùng nếu có userId
                let customerName = 'N/A';
                let customerEmail = 'N/A';
                
                if (order.userId) {
                    try {
                        const User = require('../models/user');
                        const user = await User.findById(order.userId);
                        if (user) {
                            customerName = user.fullName || 'N/A';
                            customerEmail = user.email || 'N/A';
                        }
                    } catch (userErr) {
                        console.error(`Error fetching user for order ${order._id}:`, userErr);
                    }
                }
                
                return {
                    id: order._id,
                    totalAmount: order.totalAmount || 0,
                    status: order.status || 'pending',
                    orderDate: order.orderDate || order.createdAt,
                    customerName,
                    customerEmail,
                    productCount: order.products ? order.products.length : 0
                };
            } catch (orderErr) {
                console.error(`Error formatting order ${order._id}:`, orderErr);
                return {
                    id: order._id,
                    totalAmount: 0,
                    status: 'unknown',
                    orderDate: order.createdAt,
                    customerName: 'Error',
                    customerEmail: 'Error',
                    productCount: 0
                };
            }
        }));
        
        console.log('Formatted recent orders successfully');
        
        res.json({
            totalOrders,
            pendingOrders,
            totalRevenue,
            totalUsers,
            recentOrders: formattedRecentOrders
        });
    } catch (err) {
        console.error('Error getting order statistics:', err);
        res.status(500).json({ 
            error: 'Lỗi khi lấy thống kê đơn hàng',
            details: err.message,
            stack: err.stack
        });
    }
}; 