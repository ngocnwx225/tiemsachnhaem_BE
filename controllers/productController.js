const Product = require('../models/product_book');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search products
exports.searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        const products = await Product.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get products by catalog
exports.getProductsByCatalog = async (req, res) => {
    try {
        const products = await Product.find({ catalogId: req.params.catalogId });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        res.json({ message: 'Đã xóa sản phẩm thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update stock
exports.updateStock = async (req, res) => {
    try {
        const { quantity } = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { $inc: { stock: quantity } },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 