const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - productId
 *         - userId
 *         - rating
 *         - comment
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         productId:
 *           type: string
 *           description: ID của sản phẩm
 *         userId:
 *           type: string
 *           description: ID của người dùng
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: Đánh giá (1-5 sao)
 *         comment:
 *           type: string
 *           description: Nội dung đánh giá
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo đánh giá
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Lấy tất cả reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Danh sách reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Lỗi server
 */
router.get('/', reviewController.getAllReviews);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Lấy review theo ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của review
 *     responses:
 *       200:
 *         description: Thông tin review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Không tìm thấy review
 *       500:
 *         description: Lỗi server
 */
router.get('/:id', reviewController.getReviewById);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Tạo review mới
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', reviewController.createReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Cập nhật review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review đã được cập nhật
 *       404:
 *         description: Không tìm thấy review
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.put('/:id', reviewController.updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Xóa review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của review
 *     responses:
 *       200:
 *         description: Review đã được xóa
 *       404:
 *         description: Không tìm thấy review
 *       500:
 *         description: Lỗi server
 */
router.delete('/:id', reviewController.deleteReview);

module.exports = router; 