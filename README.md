# 🌐 Hansi-Trans — Full Stack Application

A **production-ready full‑stack web platform** built with **Next.js, Node.js, Express, and MongoDB**, designed for managing and showcasing professional content such as company information, testimonials, case studies, and influencers.

This repository documentation serves as a **complete, beginner‑friendly yet professional guide** to understand, set up, and run the entire Hansi‑Trans system.

---

## 🧭 Table of Contents

1. Project Overview
2. System Architecture
3. Tech Stack
4. Repositories
5. Application Features
6. Environment Setup
7. Backend Setup (Step‑by‑Step)
8. Frontend Setup (Step‑by‑Step)
9. Authentication Flow
10. API Communication Flow
11. Development Workflow
12. Best Practices
13. Deployment Notes

---

## 1 Project Overview

**Hansi‑Trans** is a modular content‑driven platform consisting of:

- A **Frontend** built with Next.js for both public pages and an admin dashboard
- A **Backend REST API** built with Express.js to handle data, authentication, and media

The system is designed to be:

- 🔐 Secure (JWT authentication)
- ⚡ Fast and scalable
- 🧩 Modular and maintainable
- 🌍 Production‑ready

---

## 2 System Architecture

```
[ Next.js Frontend ]  --->  [ Express API Server ]  --->  [ MongoDB ]
                                  |
                                  --->  [ Cloudinary ]
```

- Frontend communicates via REST APIs
- Backend handles authentication, business logic, and media uploads
- MongoDB stores structured data
- Cloudinary manages images

---

## 3 Tech Stack

### Frontend

- Next.js (App Router)
- React
- Tailwind CSS
- Fetch API

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary

---

## 4 Repositories

- **Frontend:** [https://github.com/rantu01/Hansi-Trans-](https://github.com/rantu01/Hansi-Trans-)
- **Backend:** [https://github.com/rantu01/Hansi-Trans-backend](https://github.com/rantu01/Hansi-Trans-backend)

---

## 5 Application Features

### 🌍 Public Features

- About Us page
- Testimonials 
- Featured Case Studies
- Influencers showcase
- Services page , service details , sub services, sub services details
- Case Studies , Case Studies details 
- Blog , Blog details 
- others more . . .

### 🔐 Admin Features

- Secure admin login
- Add / Edit / Delete content
- Image upload support
- Token‑protected routes
- Full control of this website 

---

## 6 Environment Setup

### Frontend `.env`

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### Backend `.env`

```
MONGO_URI=
JWT_SECRET=
PORT=5000
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

⚠️ Never commit `.env` files to GitHub.

---

## 7 Backend Setup (Tutorial)

### 1️⃣ Clone Backend Repository

```
git clone https://github.com/rantu01/Hansi-Trans-backend
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Configure `.env`

Add all required environment variables.

### 4️⃣ Start Backend Server

```
npm run dev
```

✅ Server will run at:

```
http://localhost:5000
```

---

## 8 Frontend Setup (Tutorial)

### 1️⃣ Clone Frontend Repository

```
git clone https://github.com/rantu01/Hansi-Trans-
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Configure `.env`

Set backend API base URL.

### 4️⃣ Start Frontend Server

```
npm run dev
```

✅ App will run at:

```
http://localhost:3000
```

---

## 9 Authentication Flow (How It Works)

1. Admin logs in via frontend
2. Backend validates credentials
3. Backend returns JWT token
4. Token stored in `localStorage`
5. Protected API requests include:

```
Authorization: Bearer <token>
```

6. Backend middleware verifies token

---

## 10 API Communication Flow

- Frontend sends requests using `NEXT_PUBLIC_API_BASE_URL`
- Public APIs are accessible without token
- Admin APIs require valid JWT token

Example:

```
GET /api/testimonials
POST /api/testimonials (protected)
```

---

## 11 Development Workflow

- Run backend first
- Run frontend second
- Use Thunder Client / Postman for API testing
- Use browser dev tools for frontend debugging

---

## 12 Best Practices Followed

- MVC‑style backend architecture
- Token‑based security
- Environment‑based configuration
- Clean folder structure
- Reusable components & controllers

---

## 13 Deployment Notes

- Frontend can be deployed on **Vercel**
- Backend can be deployed on **Render / VPS / Railway**
- MongoDB Atlas recommended for production
- Cloudinary required for image uploads

---

## 📄 License

This project is developed for **Hansi‑Trans** and intended for internal or commercial use.

---

✨ *This documentation is designed to help both beginners and professional developers understand and scale the Hansi‑Trans platform with confidence.*

