<div align="center">

# 💼 Job Tracker — MERN Stack Job Portal

### *Connect Talent with Opportunity*

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux_Toolkit-7-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## 📖 Overview

**Job Tracker** is a full-stack MERN job portal where students can upload profiles/resumes and apply to jobs, while recruiters can register companies, post jobs, and manage applicants. Features Cloudinary file storage and Redux state persistence.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 👤 **Student Portal** | Register, upload profile & resume |
| 📄 **Resume Upload** | Cloudinary-powered file storage |
| 💼 **Job Browsing** | Search and filter jobs |
| 📝 **Job Applications** | Apply with cover letter |
| 🏢 **Recruiter Dashboard** | Post & manage jobs |
| 👥 **Applicant Tracking** | Accept/reject applicants |
| 🔄 **Redux Persistence** | State survives page refresh |
| 🎨 **ShadCN UI** | Beautiful Radix-based components |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **Vite 6** | Build tool |
| **React Router 7** | Routing |
| **Redux Toolkit + Persist** | State management |
| **Tailwind CSS v4** | Styling |
| **ShadCN / Radix UI** | UI components |
| **Axios** | HTTP client |
| **React Hot Toast / Sonner** | Notifications |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js + Express** | HTTP framework |
| **MongoDB + Mongoose** | Database |
| **JWT + bcryptjs** | Authentication |
| **Cloudinary + Multer** | File storage |
| **cookie-parser** | Cookie handling |

---

## 📁 Project Structure

```
job-tracker/
├── frontend/                          # 🎨 React Frontend
│   ├── src/
│   │   ├── components/                # UI components (ShadCN)
│   │   ├── pages/                     # Route pages
│   │   ├── store/                     # Redux store + slices
│   │   ├── hooks/                     # Custom hooks
│   │   ├── services/                  # API services
│   │   └── utils/                     # Utilities
│   └── package.json
│
├── backend/                           # ⚙️ Express Backend
│   ├── controllers/                   # Route handlers
│   ├── models/                        # Mongoose schemas
│   ├── routes/                        # API routes
│   ├── middleware/                     # Auth middleware
│   ├── config/                        # DB config
│   ├── utils/                         # Helpers
│   └── index.js
│
└── README.md
```

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/sojibahmedshorif25-ai/job-tracker.git

# Install Frontend
cd frontend && npm install

# Install Backend
cd ../backend && npm install

# Configure .env
cp .env.example .env

# Run
cd frontend && npm run dev
cd backend && npm run dev
```

---

## 👨‍💻 Author

**Sojib Ahmed**

[![GitHub](https://img.shields.io/badge/GitHub-sojibahmedshorif25--ai-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sojibahmedshorif25-ai)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sojib_Ahmed-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sojib-ahmed-shorif)

---

<div align="center">

**⭐ Star this repo if you find it impressive!**

</div>
