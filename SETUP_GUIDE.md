# Blog Platform - Setup & Deployment Guide

## ✅ Project Status: Complete

Your full-stack blog platform is ready to use with separate `/frontend` and `/backend` folders.

---

## 📁 Final Project Structure

```
blog-platform/
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # Navbar, Home, Login, Signup, Dashboard, PostPage, EditPost
│   │   ├── styles/            # CSS files for each component
│   │   ├── App.jsx            # Main app with routing
│   │   └── main.jsx           # Entry point
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── index.html
│   ├── .env                   # Pre-configured
│   └── eslint.config.js
│
├── backend/                    # Express API
│   ├── models/                # User.js, Post.js
│   ├── routes/                # auth.js, posts.js
│   ├── middleware/            # auth.js (JWT verification)
│   ├── server.js              # Express server
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Pre-configured (MongoDB Atlas)
│   └── .env.example
│
├── README.md
├── .gitignore
└── (old root-level src/ - can be deleted after verifying frontend/ works)
```

---

## 🚀 Getting Started

### Option 1: Quick Start (Recommended)

**Terminal 1 - Backend:**

```bash
cd backend
npm install
npm run dev
```

You'll see: `Server is running on http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm install
npm run dev
```

You'll see: `Local: http://localhost:3000` (or next available port)

### Option 2: Production Build

**Build Frontend:**

```bash
cd frontend
npm install
npm run build
```

Output: `frontend/dist/` (ready to deploy)

**Run Backend:**

```bash
cd backend
npm install
npm start
```

---

## 🔧 Configuration

### Backend `.env` (Already Configured)

```env
MONGODB_URI=mongodb+srv://ashutosh29704_db_user:Blog_123@cluster0.omlhxiu.mongodb.net/blog_platform
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
```

### Frontend `.env` (Already Configured)

```env
VITE_API_URL=http://localhost:5000
```

---

## 📝 Features Implemented

### Authentication

- ✅ Sign up with username, email, password
- ✅ Login with email and password
- ✅ JWT token generation and storage
- ✅ Password hashing with bcryptjs
- ✅ Protected routes for authenticated users

### Blog Operations

- ✅ Create blog posts (authenticated users only)
- ✅ Read all posts (public)
- ✅ View full post details (public)
- ✅ Edit own posts (author only)
- ✅ Delete own posts (author only)

### UI/UX

- ✅ Responsive grid (3 columns desktop → 2 tablet → 1 mobile)
- ✅ Professional color scheme with Indigo primary
- ✅ Smooth animations and hover effects
- ✅ Error and success messages
- ✅ Loading states
- ✅ Form validation

### Backend API

- ✅ JWT middleware for route protection
- ✅ CORS enabled
- ✅ Proper error handling
- ✅ MongoDB Atlas integration
- ✅ RESTful endpoint design

---

## 🌐 API Endpoints

### Authentication

```
POST   /api/auth/signup    - Register user
POST   /api/auth/login     - Login user
```

### Blog Posts

```
GET    /api/posts          - Get all posts (public)
GET    /api/posts/:id      - Get single post (public)
POST   /api/posts          - Create post (auth required)
PUT    /api/posts/:id      - Update post (auth + author required)
DELETE /api/posts/:id      - Delete post (auth + author required)
```

---

## 🎨 Color Scheme

| Element        | Color       | Hex     |
| -------------- | ----------- | ------- |
| Primary        | Indigo      | #4F46E5 |
| Secondary      | Amber       | #F59E0B |
| Background     | Light Gray  | #F9FAFB |
| Card           | White       | #FFFFFF |
| Text           | Dark Gray   | #111827 |
| Secondary Text | Medium Gray | #6B7280 |
| Error          | Red         | #DC2626 |

---

## 📦 Tech Stack

### Frontend

- **React 19** - UI library
- **React Router v6** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling with custom properties
- **Vite** - Build tool

### Backend

- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

---

## 🧪 Testing the Application

1. **Open Frontend**

   - Go to http://localhost:3000

2. **Sign Up**

   - Click "Sign Up"
   - Enter username, email, password
   - Click "Sign Up"

3. **Create Post**

   - Go to Dashboard
   - Click "Write New Post"
   - Enter title and content
   - Click "Publish Post"

4. **View Posts**

   - Dashboard shows all posts in grid
   - Click "Read Full Post" to view details
   - Authors can "Edit" or "Delete" their posts

5. **Logout**
   - Click "Logout" in navbar
   - Returns to home page

---

## 🐛 Troubleshooting

### Issue: MongoDB Connection Error

**Solution:**

- Verify MONGODB_URI in backend/.env
- Check MongoDB Atlas cluster is running
- Ensure your IP is whitelisted in MongoDB Atlas

### Issue: CORS Error

**Solution:**

- Ensure backend is running on port 5000
- Check frontend .env has correct API_URL
- Verify backend has CORS middleware enabled

### Issue: Frontend not loading

**Solution:**

- Check Node.js version (v14+)
- Delete frontend/node_modules and package-lock.json
- Run npm install again
- Clear browser cache

### Issue: Port Already in Use

**Solution:**

- Backend: Change PORT in backend/.env
- Frontend: Vite auto-selects next available port

---

## 📚 Project Structure Details

### Components (Frontend)

- **Navbar** - Navigation with auth status
- **Home** - Landing page with hero and features
- **Login** - Login form
- **Signup** - Registration form
- **Dashboard** - Main hub (create + view posts)
- **PostPage** - Full post view
- **EditPost** - Post editor

### Styles (Frontend)

- **global.css** - Color variables and common styles
- **Navbar.css** - Navigation styling
- **Home.css** - Landing page with animations
- **Auth.css** - Login/Signup forms
- **Dashboard.css** - Posts grid and form
- **PostPage.css** - Post details view
- **EditPost.css** - Post editor

### Models (Backend)

- **User** - username, email, password (hashed)
- **Post** - title, content, author, dates

### Routes (Backend)

- **auth.js** - Signup and login endpoints
- **posts.js** - CRUD operations with auth

### Middleware (Backend)

- **auth.js** - JWT token verification

---

## 🚀 Deployment Options

### Frontend

- **Vercel** (Recommended)

  ```bash
  npm i -g vercel
  cd frontend
  vercel
  ```

- **Netlify**
  ```bash
  npm run build
  # Upload 'dist' folder to Netlify
  ```

### Backend

- **Heroku/Railway/Render**
  - Use `npm start` command
  - Set environment variables on platform
  - Connect to MongoDB Atlas

---

## 📖 Key Features by Page

### Home Page

- Hero section with CTA buttons
- Features overview
- Call-to-action section
- Responsive navigation

### Dashboard

- Create post form
- Your posts section (filtered)
- All posts section
- Delete confirmation dialogs
- Success/error messages

### Post Detail

- Full post content
- Author and date info
- Edit/Delete buttons (if author)
- Back navigation

### Edit Post

- Pre-filled form
- Update title and content
- Authorization check
- Redirect after save

---

## ✨ Special Features

### Responsive Grid

```css
/* Desktop: 3 columns */
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

/* Tablet: adjusts to 2 */
/* Mobile: adjusts to 1 */
```

### Smooth Animations

- Fade-in on load
- Slide transitions for modals
- Hover lift effects on cards
- Button press feedback

### Error Handling

- Validation messages
- Network error alerts
- Authorization errors
- Form submission errors

---

## 🔒 Security Features

✅ JWT tokens with 7-day expiration
✅ Password hashing with 10 salt rounds
✅ Protected CRUD routes
✅ Author verification
✅ CORS enabled
✅ Environment variables for secrets

---

## 📞 Support

For issues:

1. Check backend console for errors
2. Check browser console for client errors
3. Verify MongoDB Atlas connection
4. Ensure both servers are running

---

**Your blog platform is ready to go! Happy blogging! 📝**
