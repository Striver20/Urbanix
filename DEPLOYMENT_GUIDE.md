# 🚀 Urbanix Deployment Guide (Vercel + Railway)

## Overview
- **Frontend**: Vercel (React app)
- **Backend**: Railway (Node.js API)  
- **Database**: MongoDB Atlas (Free tier)

---

## 📋 Prerequisites

1. **GitHub Account** (to connect repositories)
2. **MongoDB Atlas Account** (free)
3. **Vercel Account** (free)
4. **Railway Account** (free)

---

## 🗃️ Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with password
4. Whitelist all IP addresses (0.0.0.0/0) for development
5. Get your connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/urbanix?retryWrites=true&w=majority
   ```

---

## 🔧 Step 2: Environment Setup

### Backend (.env file)
Create `backend/.env` with:
```env
MONGO_URL=mongodb+srv://your-username:your-password@cluster.mongodb.net/urbanix?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-make-it-very-long-and-random-for-production
PORT=8000
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Frontend (.env file)
Create `frontend/.env` with:
```env
REACT_APP_API_URL=https://your-railway-app.railway.app
```

---

## 🚂 Step 3: Deploy Backend to Railway

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Railway**:
   - Go to [Railway](https://railway.app)
   - Sign up/Login with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Select the `backend` folder as root directory

3. **Environment Variables on Railway**:
   - Go to your project → Variables tab
   - Add all variables from backend/.env:
     - `MONGO_URL`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A long random string
     - `NODE_ENV`: production
     - `FRONTEND_URL`: (add after Vercel deployment)
     - `PORT`: 8000

4. **Get Railway URL**:
   - Copy your Railway app URL (e.g., `https://urbanix-backend-production.railway.app`)

---

## ⚡ Step 4: Deploy Frontend to Vercel

1. **Update Frontend .env**:
   ```env
   REACT_APP_API_URL=https://your-railway-url.railway.app
   ```

2. **Deploy on Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository
   - Set Root Directory to `frontend`
   - Add Environment Variable:
     - `REACT_APP_API_URL`: Your Railway backend URL

3. **Get Vercel URL**:
   - Copy your Vercel app URL (e.g., `https://urbanix.vercel.app`)

---

## 🔄 Step 5: Update CORS Settings

1. **Update Railway Environment**:
   - Go back to Railway → Variables
   - Update `FRONTEND_URL`: Your Vercel app URL
   - Redeploy if needed

---

## ✅ Step 6: Test Everything

1. **Test Backend**: Visit your Railway URL - should show API message
2. **Test Frontend**: Visit your Vercel URL - should load your app
3. **Test Full Flow**: 
   - Register a new user
   - Login
   - Add products to cart
   - Test checkout

---

## 📊 Final URLs for Resume

- **Live Website**: `https://urbanix.vercel.app`
- **API Endpoint**: `https://urbanix-backend.railway.app`
- **GitHub Repository**: `https://github.com/yourusername/urbanix`

---

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Error**: Make sure `FRONTEND_URL` matches your Vercel URL exactly
2. **Database Connection**: Check MongoDB Atlas connection string and IP whitelist
3. **Environment Variables**: Double-check all variables are set correctly
4. **Build Errors**: Make sure all dependencies are in package.json

### Debug Steps:
1. Check Railway logs for backend errors
2. Check Vercel logs for frontend build issues
3. Test API endpoints directly using Postman
4. Use browser dev tools to check network requests

---

## 🎯 Resume Points

✅ **Modern Full-Stack E-commerce Platform**  
✅ **React.js Frontend with Tailwind CSS**  
✅ **Node.js/Express.js RESTful API**  
✅ **MongoDB Database with Authentication**  
✅ **Deployed on Vercel + Railway (Cloud)**  
✅ **Professional UI/UX Design**  
✅ **Complete Shopping Cart & Checkout**  
✅ **Admin Dashboard & User Management**  

---

## 🚀 Next Steps After Deployment

1. Test all features thoroughly
2. Add your live URLs to resume
3. Consider adding these enhancements:
   - Payment gateway integration (Stripe/PayPal)
   - Email notifications
   - Product reviews system
   - Analytics dashboard

---

**Need Help?** Check the logs in Railway/Vercel dashboards or create an issue in your GitHub repository.
