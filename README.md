# 🚀 Lead Manager — Full-Stack Lead Management System
<p align="center">
  <img src="screenshots/loginpage.png" width="90%" alt="Lead Manager Dashboard" />
</p>
<p align="center">
  **A simple, secure and modern CRM application to manage leads efficiently.**
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Firebase-Authentication-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
</p>

---

## 📌 Table of Contents

1. [Introduction](#-introduction)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Project Structure](#-project-structure)
5. [Getting Started](#-getting-started)
6. [Environment Configuration](#-environment-configuration)
7. [API Documentation](#-api-documentation)
8. [Security](#-security)
9. [Future Improvements](#-future-improvements)
10. [Author](#-author)

---

## 🎯 Introduction

Lead Manager is a full-stack web application designed to help users organize and manage their business leads from a single dashboard.

Users can securely sign in with Google, add new leads, view and update lead information, track lead statuses, and delete records when they are no longer needed.

The application provides a clean dashboard with search, filtering and status-based statistics to make lead management easier and more organized.

This project was developed as a practical full-stack development assignment to demonstrate frontend development, REST API integration, database operations and authentication.

---

## ✨ Features

### 🔐 Authentication
- Google Sign-In using Firebase Authentication.
- Secure logout functionality.
- Protected backend API routes.
- Each user can access only their own leads.

### 📋 Lead Management
- Add leads with name, email, phone, company and source.
- View all saved leads in a dashboard.
- Edit existing lead information.
- Update lead status.
- Delete leads with confirmation.

### 🔎 Search & Filtering
- Search leads by name.
- Filter leads by status.
- Organize leads by their current progress.

### 📊 Dashboard
- Overview of total leads.
- Status-based lead counts.
- Clear visual indicators for lead statuses.

### 🎨 User Interface
- Modern dashboard layout.
- Dark and light theme support.
- Responsive design for different screen sizes.
- Clear forms, tables and status indicators.

### ✅ Validation
- Required field validation.
- Email format validation.
- Backend validation using Mongoose schema rules.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend |
| CSS | Styling and responsive UI |
| Node.js | Backend runtime |
| Express.js | REST API |
| MongoDB Atlas | Database |
| Mongoose | Database modeling and validation |
| Firebase Authentication | Google Sign-In |
| Firebase Admin SDK | Backend token verification |
| Git & GitHub | Version control |

---

## 📁 Project Structure

```text
lead-manager/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── firebase.js
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── middleware/
│   │   └── verifyToken.js
│   ├── models/
│   │   └── Lead.js
│   ├── routes/
│   │   └── leads.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Firebase Console](https://console.firebase.google.com/)

### 2. Clone the Repository

```bash
git clone https://github.com/Subrata-Dutta/lead-manager.git
```

```bash
cd lead-manager
```

### 3. Backend Setup

Open a terminal:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Place your Firebase Admin service account JSON file inside the `backend` folder, named:

```text
serviceAccountKey.json
```

Start the backend:

```bash
node server.js
```

The API will run at:

```text
http://localhost:5000
```

### 4. Frontend Setup

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

Configure your Firebase web application credentials in:

```text
frontend/src/firebase.js
```

Enable Google Sign-In in Firebase Authentication and add `localhost` to the authorized domains.

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

---

## 🔑 Environment Configuration

Keep all private credentials out of GitHub.

| Variable / File | Purpose |
|---|---|
| `backend/.env` | MongoDB connection string and server port |
| `backend/serviceAccountKey.json` | Firebase Admin credentials |
| `frontend/src/firebase.js` | Firebase web app configuration |

**Never commit your real MongoDB URI or Firebase service account private key.**

---

## 🔌 API Documentation

Base URL:

```text
http://localhost:5000/api/leads
```

All lead endpoints require a valid Firebase ID token in the request header:

```http
Authorization: Bearer YOUR_FIREBASE_ID_TOKEN
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/leads` | Get logged-in user's leads |
| POST | `/api/leads` | Create a new lead |
| PUT | `/api/leads/:id` | Update an existing lead |
| DELETE | `/api/leads/:id` | Delete a lead |

### Lead Data Structure

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "company": "Example Technologies",
  "source": "Website",
  "status": "New"
}
```

### Available Lead Sources

- Website
- Referral
- LinkedIn
- Other

### Available Lead Statuses

- New
- Contacted
- Qualified
- Lost

---

## 🔒 Security

- Firebase Authentication for user login.
- Firebase Admin SDK verifies authentication tokens on the backend.
- Protected API endpoints.
- User-specific lead ownership.
- Mongoose validation for incoming lead data.
- Private environment variables and service account credentials excluded from version control.

---

## 🔮 Future Improvements

- Pagination and sorting.
- Advanced lead analytics.
- Lead export to CSV.
- Improved automated API testing.
- Live deployment with a public demo.

---

## 👨‍💻 Author

**Subrata Dutta**

B.Tech — Electronics & Computer Science

- GitHub: [Your GitHub Profile](https://github.com/Subrata-Dutta)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/subrata-dutta-2a238b403/)

---

<p align="center">
  ⭐ If you find this project interesting, consider giving it a star!
</p>

<p align="center">
  **Built with ❤️ as a Full-Stack Development Project**
</p>