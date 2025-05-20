const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - customerId
 *         - products
 *         - totalAmount
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         customerId:
 *           type: string
 *           description: ID của khách hàng
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *         totalAmount:
 *           type: number
 *           description: Tổng tiền đơn hàng
 *         status:
 *           type: string
 *           enum: [pending, processing, completed, cancelled]
 *           description: Trạng thái đơn hàng
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo đơn hàng
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lấy tất cả orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Danh sách orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Lỗi server
 */
router.get('/', orderController.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Lấy order theo ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của order
 *     responses:
 *       200:
 *         description: Thông tin order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Không tìm thấy order
 *       500:
 *         description: Lỗi server
 */
router.get('/:id', orderController.getOrderById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Tạo order mới
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', orderController.createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Cập nhật order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order đã được cập nhật
 *       404:
 *         description: Không tìm thấy order
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.put('/:id', orderController.updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Xóa order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của order
 *     responses:
 *       200:
 *         description: Order đã được xóa
 *       404:
 *         description: Không tìm thấy order
 *       500:
 *         description: Lỗi server
 */
router.delete('/:id', orderController.deleteOrder);

module.exports = router; 