# Book E-commerce Backend API

Backend API cho ứng dụng bán sách trực tuyến.

## Cài đặt

1. Clone repository:
```bash
git clone https://github.com/ngocnwx225/tiemsachnhaem_BE.git
cd tiemsachnhaem_BE
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file .env và cấu hình các biến môi trường:
```
PORT=3000
SERVER_URI_MONGODB=your_mongodb_connection_string
```

4. Khởi động server:
```bash
npm start
```

## API Documentation

API documentation có sẵn tại: http://localhost:3000/api-docs

## Các API Endpoints

### Catalog
- GET `/api/catalogs`: Lấy tất cả catalog
- GET `/api/catalogs/:id`: Lấy catalog theo ID
- POST `/api/catalogs`: Tạo catalog mới
- PUT `/api/catalogs/:id`: Cập nhật catalog
- DELETE `/api/catalogs/:id`: Xóa catalog

### Order
- GET `/api/orders`: Lấy tất cả orders
- GET `/api/orders/:id`: Lấy order theo ID
- POST `/api/orders`: Tạo order mới
- PUT `/api/orders/:id`: Cập nhật order
- DELETE `/api/orders/:id`: Xóa order

### Review
- GET `/api/reviews`: Lấy tất cả reviews
- GET `/api/reviews/:id`: Lấy review theo ID
- POST `/api/reviews`: Tạo review mới
- PUT `/api/reviews/:id`: Cập nhật review
- DELETE `/api/reviews/:id`: Xóa review

## Công nghệ sử dụng

- Node.js
- Express.js
- MongoDB
- Mongoose
- Swagger/OpenAPI

## License

MIT 