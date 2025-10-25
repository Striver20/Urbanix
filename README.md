# 🛒 Urbanix - E-Commerce Platform

A modern, full-featured e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). Urbanix provides a seamless online shopping experience with complete user authentication, product management, shopping cart functionality, and secure payment integration using Razorpay.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### User Features
- 🔐 **User Authentication** - Secure registration and login system
- 🛍️ **Product Browsing** - Browse products by category
- 🔍 **Search Functionality** - Search for products across the platform
- 🛒 **Shopping Cart** - Add/remove items from cart
- 💳 **Secure Payments** - Integrated Razorpay payment gateway
- 📦 **Order Management** - Track order history and status
- 👤 **User Profile** - Manage personal information
- 📱 **Responsive Design** - Mobile-friendly interface

### Admin Features
- 📊 **Admin Dashboard** - Comprehensive admin panel
- ➕ **Product Management** - Create, read, update, and delete products
- 🏷️ **Category Management** - Manage product categories
- 👥 **User Management** - Monitor user activities
- 📈 **Order Tracking** - Track and manage all orders

## 🚀 Tech Stack

### Frontend
- **React** - UI framework
- **React Router DOM** - Client-side routing
- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Context API** - State management
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Formidable** - File upload handling
- **Razorpay** - Payment gateway integration

## 📁 Project Structure

```
Urbanix/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   └── productController.js
│   ├── helpers/
│   │   └── authHelper.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   └── categoryModel.js
│   ├── routes/
│   │   ├── authRoute.js
│   │   ├── categoryRoute.js
│   │   └── productRoute.js
│   ├── index.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── Admin/
    │   │   ├── AdminDashboard.js
    │   │   ├── CreateProduct.js
    │   │   ├── CreateCategory.js
    │   │   └── Products.js
    │   ├── Screens/
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── ProductDetails.js
    │   │   └── CartPage.js
    │   ├── components/
    │   ├── context/
    │   ├── Routes/
    │   └── App.js
    └── package.json
```

## 🔧 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/Striver20/Urbanix.git
cd Urbanix
```

2. Navigate to backend directory
```bash
cd backend
```

3. Install dependencies
```bash
npm install
```

4. Create a `.env` file in the backend directory
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

5. Start the backend server
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## ⚙️ Configuration

### MongoDB Setup
- Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or use a local MongoDB instance
- Copy the connection string and add it to your `.env` file

### Razorpay Setup
1. Create an account on [Razorpay](https://razorpay.com/)
2. Get your API keys from the dashboard
3. Add the keys to your `.env` file

## 🎯 Usage

1. **Registration**: Create a new account or login with existing credentials
2. **Browse Products**: Explore products by category or search
3. **Add to Cart**: Select products and add them to your cart
4. **Checkout**: Proceed to payment using Razorpay
5. **Track Orders**: View your order history in the dashboard

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/check-auth` - Verify authentication

### Products
- `GET /api/v1/product/get-products` - Get all products
- `GET /api/v1/product/get-product/:slug` - Get single product
- `POST /api/v1/product/create-product` - Create product (Admin)
- `PUT /api/v1/product/update-product/:pid` - Update product (Admin)
- `DELETE /api/v1/product/delete-product/:pid` - Delete product (Admin)

### Categories
- `GET /api/v1/category/get-category` - Get all categories
- `GET /api/v1/category/single-category/:slug` - Get single category
- `POST /api/v1/category/create-category` - Create category (Admin)
- `PUT /api/v1/category/update-category/:id` - Update category (Admin)
- `DELETE /api/v1/category/delete-category/:id` - Delete category (Admin)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Striver20**

- GitHub: [@Striver20](https://github.com/Striver20)
- Project Link: [https://github.com/Striver20/Urbanix](https://github.com/Striver20/Urbanix)

## 🙏 Acknowledgments

- Razorpay for payment gateway integration
- Ant Design for UI components
- React community for excellent documentation

---

⭐ Star this repo if you find it helpful!
