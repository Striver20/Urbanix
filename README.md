# 🛍️ Urbanix - Modern E-commerce Platform

A full-stack e-commerce web application built with React.js and Node.js, featuring a modern UI, complete shopping experience, and admin dashboard.

## 🌐 Live Demo

- **🌐 Website**: [https://urbanix-8uczmsw2r-ashit-s-projects-37a24e1a.vercel.app/](https://urbanix-8uczmsw2r-ashit-s-projects-37a24e1a.vercel.app/)
- **🔗 API Backend**: [https://urbanix-production.up.railway.app/](https://urbanix-production.up.railway.app/)

### 🧪 Test Live Features:
- Browse products and categories
- User registration and login
- Shopping cart and checkout
- Admin dashboard (register with role: "admin")
- Search and filter functionality

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

### 🛒 Customer Features

- **Product Browsing**: Browse products by categories with modern grid/list views
- **Search & Filter**: Advanced product search and filtering capabilities
- **Shopping Cart**: Add/remove products with quantity management
- **User Authentication**: Secure login/register with JWT tokens
- **Order Management**: Complete checkout process and order history
- **Responsive Design**: Mobile-first design with Tailwind CSS

### 👨‍💼 Admin Features

- **Dashboard**: Comprehensive admin dashboard with analytics
- **Product Management**: Add, edit, delete products with image uploads
- **Category Management**: Manage product categories
- **Order Management**: View and update order statuses
- **User Management**: View registered users and their details

### 🔧 Technical Features

- **Modern Stack**: React.js, Node.js, Express.js, MongoDB
- **Authentication**: JWT-based secure authentication system
- **File Upload**: Multer for handling product images
- **Responsive UI**: Tailwind CSS with modern design patterns
- **API Security**: Protected routes with middleware
- **Cloud Deployment**: Vercel (Frontend) + Railway (Backend)

## 🛠️ Tech Stack

**Frontend:**

- React.js 18
- Tailwind CSS
- Ant Design components
- Axios for API calls
- React Router for navigation

**Backend:**

- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Multer for file uploads
- CORS enabled

**Deployment:**

- Frontend: Vercel
- Backend: Railway
- Database: MongoDB Atlas

## 📁 Project Structure

```
urbanix/
├── frontend/                 # React.js frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── screens/         # Page components
│   │   ├── admin/           # Admin dashboard
│   │   ├── context/         # React context providers
│   │   └── config/          # Configuration files
│   └── public/
└── backend/                 # Node.js backend
    ├── controllers/         # Route controllers
    ├── models/             # MongoDB models
    ├── routes/             # API routes
    ├── middlewares/        # Custom middlewares
    └── config/             # Database configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/urbanix.git
   cd urbanix
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install

   # Create .env file with your configurations
   cp .env.example .env

   # Start backend server
   npm run dev
   ```

3. **Setup Frontend**

   ```bash
   cd frontend
   npm install

   # Create .env file
   cp .env.example .env

   # Start frontend development server
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 🔑 Environment Variables

### Backend (.env)

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:8000
```

## 📋 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/profile` - Get user profile
- `PUT /api/v1/auth/profile` - Update user profile

### Products

- `GET /api/v1/product` - Get all products
- `POST /api/v1/product` - Create product (Admin)
- `PUT /api/v1/product/:id` - Update product (Admin)
- `DELETE /api/v1/product/:id` - Delete product (Admin)

### Categories

- `GET /api/v1/category` - Get all categories
- `POST /api/v1/category` - Create category (Admin)
- `PUT /api/v1/category/:id` - Update category (Admin)

### Orders

- `POST /api/v1/order/create-order` - Create new order
- `GET /api/v1/order/user-orders` - Get user orders
- `GET /api/v1/order/all-orders` - Get all orders (Admin)

## 🚀 Deployment

✅ **Successfully Deployed!**

- **Frontend**: Deployed on [Vercel](https://vercel.com) - Automatic deployments from GitHub
- **Backend**: Deployed on [Railway](https://railway.app) - Container-based deployment  
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud database

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## 🎯 Resume Highlights

- **Full-Stack Development**: Complete MERN stack implementation
- **Modern UI/UX**: Professional design with Tailwind CSS
- **Authentication & Security**: JWT-based secure authentication
- **Database Design**: Well-structured MongoDB schemas
- **API Development**: RESTful API with proper error handling
- **Cloud Deployment**: Production deployment on modern platforms
- **Responsive Design**: Mobile-first responsive web design

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

⭐ **Star this repository if you found it helpful!**
