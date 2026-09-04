# 🛍️ Kroyshala E-Commerce API Documentation

A complete RESTful API for e-commerce platform with authentication, product management, cart, order, review, wishlist and dashboard analytics.

---

## 📋 API List

### 🔐 Authentication APIs (01-05)

| # | API Name | Method | Endpoint | Access |
|---|----------|--------|----------|--------|
| 01 | Register User | `POST` | `/api/user/register` | Public |
| 02 | Verify Email | `POST` | `/api/user/verify-email` | Public |
| 03 | Login | `POST` | `/api/auth/login` | Public |
| 04 | Refresh Access Token | `POST` | `/api/auth/refresh-token` | Public |
| 05 | Logout | `POST` | `/api/auth/logout` | Logged In |

---

### 👤 User Profile APIs (06-10)

| # | API Name | Method | Endpoint | Access |
|---|----------|--------|----------|--------|
| 06 | Get Current User | `GET` | `/api/user/me` | Logged In |
| 07 | Update Profile | `PUT` | `/api/user/profile` | Logged In |
| 08 | Change Password | `PUT` | `/api/user/change-password` | Logged In |
| 09 | Forgot Password | `POST` | `/api/user/forgot-password` | Public |
| 10 | Reset Password | `POST` | `/api/user/reset-password` | Public |

---

### 🛍️ Product APIs (11-15, 49-50)

| # | API Name | Method | Endpoint | Access |
|---|----------|--------|----------|--------|
| 11 | Create Product | `POST` | `/api/products` | Admin |
| 12 | Get Products | `GET` | `/api/products` | Public |
| 13 | Get Single Product | `GET` | `/api/products/:slug` | Public |
| 14 | Update Product | `PUT` | `/api/products/:id` | Admin |
| 15 | Delete Product | `DELETE` | `/api/products/:id` | Admin |
| 49 | Search & Filter | `GET` | `/api/products?search=&category=` | Public |
| 50 | Pagination | `GET` | `/api/products?page=&limit=` | Public |

---

### 📂 Category APIs (16-20)

| # | API Name | Method | Endpoint | Access |
|---|----------|--------|----------|--------|
| 16 | Create Category | `POST` | `/api/categories` | Admin |
| 17 | Get Categories | `GET` | `/api/categories` | Public |
| 18 | Get Single Category | `GET` | `/api/categories/:slug` | Public |
| 19 | Update Category | `PUT` | `/api/categories/:id` | Admin |
| 20 | Delete Category | `DELETE` | `/api/categories/:id` | Admin |

---

### ⭐ Review APIs (21-25)

| # | API Name | Method | Endpoint | Access |
|---|----------|--------|----------|--------|
| 21 | Create Review | `POST` | `/api/reviews/create` | Logged In |
| 22 | Get Product Reviews | `GET` | `/api/reviews/product/:productId` | Public |
| 23 | Get Single Review | `GET` | `/api/reviews/:id` | Public |
| 24 | Update Review | `PUT` | `/api/reviews/:id` | Owner |
| 25 | Delete Review | `DELETE` | `/api/reviews/:id` | Owner/Admin |

---

### 🛒 Cart APIs (26-29)

| # | API Name | Method | Endpoint | Access |
|---|----------|--------|----------|--------|
| 26 | Get Cart | `GET` | `/api/cart` | Logged In |
| 27 | Add To Cart | `POST` | `/api/cart/add` | Logged In |
| 28 | Update Quantity | `PUT` | `/api/cart/update` | Logged In |
| 29 | Remove From Cart | `DELETE` | `/api/cart/remove/:productId` | Logged In |

---

### 📦 Order APIs (30-36)

| # | API Name | Method | Endpoint | Access |
|---|----------|--------|----------|--------|
| 30 | Create Order | `POST` | `/api/orders/create` | Logged In |
| 31 | Get My Orders | `GET` | `/api/orders/my-orders` | Logged In |
| 32 | Get Single Order | `GET` | `/api/orders/:id` | Logged In |
| 33 | Cancel Order | `PUT` | `/api/orders/:id/cancel` | Logged In |
| 34 | Get All Orders | `GET` | `/api/orders/admin/all` | Admin |
| 35 | Update Order Status | `PUT` | `/api/orders/admin/:id/status` | Admin |
| 36 | Confirm Order | `PUT` | `/api/orders/:id/confirm` | Logged In |

---

### 📊 Dashboard Analytics APIs (37-45)

| # | API Name | Method | Endpoint | Access |
|---|----------|--------|----------|--------|
| 37 | Dashboard Overview | `GET` | `/api/dashboard/overview` | Admin |
| 38 | Monthly Sales | `GET` | `/api/dashboard/monthly-sales` | Admin |
| 39 | Order Statistics | `GET` | `/api/dashboard/order-statistics` | Admin |
| 40 | Revenue Statistics | `GET` | `/api/dashboard/revenue-statistics` | Admin |
| 41 | Sales Analytics | `GET` | `/api/dashboard/sales-analytics?period=month` | Admin |
| 42 | Revenue Analytics | `GET` | `/api/dashboard/revenue-analytics?period=week` | Admin |
| 43 | Product Performance | `GET` | `/api/dashboard/product-performance` | Admin |
| 44 | Customer Analytics | `GET` | `/api/dashboard/customer-analytics` | Admin |
| 45 | Order Status Analytics | `GET` | `/api/dashboard/order-status-analytics` | Admin |

---

### 👥 User Management APIs (Extra)

| API Name | Method | Endpoint | Access |
|----------|--------|----------|--------|
| Get All Users | `GET` | `/api/dashboard/users?page=1&limit=10&search=admin` | Admin |
| Delete User | `DELETE` | `/api/dashboard/users/:id` | Admin |
| Ban User | `PUT` | `/api/dashboard/users/:id/ban` | Admin |
| Unban User | `PUT` | `/api/dashboard/users/:id/unban` | Admin |

---

### 💝 Wishlist APIs (46-48)

| # | API Name | Method | Endpoint | Access |
|---|----------|--------|----------|--------|
| 46 | Add To Wishlist | `POST` | `/api/wishlist/add` | Logged In |
| 47 | Get Wishlist | `GET` | `/api/wishlist` | Logged In |
| 48 | Remove From Wishlist | `DELETE` | `/api/wishlist/remove/:productId` | Logged In |

---

### 🌱 Seed APIs

| API Name | Method | Endpoint | Access |
|----------|--------|----------|--------|
| Seed Users | `GET` | `/api/seed/users` | Public |
| Seed Categories | `GET` | `/api/seed/categories` | Public |
| Seed Products | `GET` | `/api/seed/products` | Public |

---

## 🔑 Seed Users Login Info

| User | Email | Password | Role |
|------|-------|----------|------|
| Admin | admin@example.com | Password123 | admin |
| Manager | manager@example.com | Password123 | manager |
| Customer | customer@example.com | Password123 | customer |

---

## 📊 Order Status Flow
