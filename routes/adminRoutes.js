const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         username:
 *           type: string
 *           description: Tên đăng nhập
 *         password:
 *           type: string
 *           description: Mật khẩu
 *         role:
 *           type: string
 *           description: Vai trò của admin
 */

/**
 * @swagger
 * /api/admins:
 *   get:
 *     summary: Lấy tất cả admin
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: Danh sách admin
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Lỗi server
 */
router.get('/', adminController.getAllAdmins);

/**
 * @swagger
 * /api/admins/{id}:
 *   get:
 *     summary: Lấy admin theo ID
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của admin
 *     responses:
 *       200:
 *         description: Thông tin admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Không tìm thấy admin
 *       500:
 *         description: Lỗi server
 */
router.get('/:id', adminController.getAdminById);

/**
 * @swagger
 * /api/admins:
 *   post:
 *     summary: Tạo admin mới
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Admin đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', adminController.createAdmin);

/**
 * @swagger
 * /api/admins/{id}:
 *   put:
 *     summary: Cập nhật admin
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Admin đã được cập nhật
 *       404:
 *         description: Không tìm thấy admin
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.put('/:id', adminController.updateAdmin);

/**
 * @swagger
 * /api/admins/{id}:
 *   delete:
 *     summary: Xóa admin
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của admin
 *     responses:
 *       200:
 *         description: Admin đã được xóa
 *       404:
 *         description: Không tìm thấy admin
 *       500:
 *         description: Lỗi server
 */
router.delete('/:id', adminController.deleteAdmin);

module.exports = router; 