const Order = require('../models/order');
const Product = require('../models/product_book');

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
    try {
        const order = await Order.findById(req.params.id)
            .populate('userId', 'fullName email phoneNumber address')
            .populate('items.bookId', 'title price');
            
        if (!order) {
            return res.status(404).json({ error: 'Không tìm thấy order' });
        }

        const formattedOrder = {
            id: order._id,
            customerInfo: {
                name: order.userId.fullName,
                email: order.userId.email,
                phoneNumber: order.userId.phoneNumber,
                address: order.userId.address
            },
            orderInfo: {
                createdAt: order.createdAt,
                totalAmount: order.totalAmount,
                status: order.status
            },
            items: order.items.map(item => ({
                bookId: item.bookId._id,
                title: item.bookId.title,
                price: item.bookId.price,
                quantity: item.quantity,
                subtotal: item.bookId.price * item.quantity
            }))
        };

        res.json(formattedOrder);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu order' });
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
        // Tổng số đơn hàng
        const totalOrders = await Order.countDocuments();
        
        // Tổng số đơn hàng với trạng thái pending
        const pendingOrders = await Order.countDocuments({ status: 'pending' });
        
        // Tổng doanh thu (tổng totalAmount của tất cả đơn hàng)
        const revenueResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalAmount' }
                }
            }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
        
        // Tổng số người dùng (có role = 'user')
        const User = require('../models/user');
        const totalUsers = await User.countDocuments({ role: 'user' });
        
        // 5 đơn hàng gần nhất
        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('userId', 'fullName email');
            
        // Format đơn hàng gần đây để có thông tin chi tiết hơn
        const formattedRecentOrders = recentOrders.map(order => ({
            id: order._id,
            totalAmount: order.totalAmount,
            status: order.status,
            orderDate: order.orderDate,
            customerName: order.userId ? order.userId.fullName : 'N/A',
            customerEmail: order.userId ? order.userId.email : 'N/A',
            productCount: order.products ? order.products.length : 0
        }));
        
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
            details: err.message 
        });
    }
}; 