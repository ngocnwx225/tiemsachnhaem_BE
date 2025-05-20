const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Catalog:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         name:
 *           type: string
 *           description: Tên catalog
 *         description:
 *           type: string
 *           description: Mô tả catalog
 */

/**
 * @swagger
 * /api/catalogs:
 *   get:
 *     summary: Lấy tất cả catalog
 *     tags: [Catalogs]
 *     responses:
 *       200:
 *         description: Danh sách catalog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Catalog'
 *       500:
 *         description: Lỗi server
 */
router.get('/', catalogController.getAllCatalogs);

/**
 * @swagger
 * /api/catalogs/{id}:
 *   get:
 *     summary: Lấy catalog theo ID
 *     tags: [Catalogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của catalog
 *     responses:
 *       200:
 *         description: Thông tin catalog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catalog'
 *       404:
 *         description: Không tìm thấy catalog
 *       500:
 *         description: Lỗi server
 */
router.get('/:id', catalogController.getCatalogById);

/**
 * @swagger
 * /api/catalogs:
 *   post:
 *     summary: Tạo catalog mới
 *     tags: [Catalogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catalog'
 *     responses:
 *       201:
 *         description: Catalog đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', catalogController.createCatalog);

/**
 * @swagger
 * /api/catalogs/{id}:
 *   put:
 *     summary: Cập nhật catalog
 *     tags: [Catalogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của catalog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catalog'
 *     responses:
 *       200:
 *         description: Catalog đã được cập nhật
 *       404:
 *         description: Không tìm thấy catalog
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.put('/:id', catalogController.updateCatalog);

/**
 * @swagger
 * /api/catalogs/{id}:
 *   delete:
 *     summary: Xóa catalog
 *     tags: [Catalogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của catalog
 *     responses:
 *       200:
 *         description: Catalog đã được xóa
 *       404:
 *         description: Không tìm thấy catalog
 *       500:
 *         description: Lỗi server
 */
router.delete('/:id', catalogController.deleteCatalog);

module.exports = router; 