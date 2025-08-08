# 📚 Pathchakro – Collaborative Study Platform  

[![Live Demo](https://img.shields.io/badge/View%20Live%20Project-00C853?style=for-the-badge&logo=google-chrome&logoColor=white)](https://pathchakro-a6827.web.app/)  

An online **group-study and assignment-sharing platform** that empowers students to **create**, **submit**, **review**, and **grade** assignments together.  
Built for learners who want **peer-to-peer feedback**, better collaboration, and an engaging study environment.  

![Pathchakro Screenshot](screenshot.png) <!-- Replace with actual screenshot path -->

---

## ✨ Features at a Glance  

### 🔐 Authentication & Security  
- **Firebase Authentication** with Email/Password & Google Sign-In  
- **JWT-based API authorization** for secure backend communication  

### 📝 Assignment Management  
- Create, Read, Update, Delete (**CRUD**) assignments  
- **Role-based permissions** (Only creator can edit/delete)  
- Filter by **difficulty level** (Easy, Medium, Hard)  

### 🎯 Peer Learning System  
- Submit work with **Google Docs links** and examiner notes  
- Dedicated **Pending Assignments** page for grading peers  
- Prevents self-grading to ensure fairness  

### 📊 Personalized Dashboard  
- Track **submitted assignments**, **grades**, and **feedback**  
- Quick profile menu for easy navigation  

### 🎨 Modern UI/UX  
- **Fully responsive** design for mobile, tablet, and desktop  
- **Light/Dark mode toggle**  
- Clean, modern styling with **Tailwind CSS** & **DaisyUI**  

---

## 🛠 Tech Stack  

### **Frontend**  
- React.js (Vite)  
- React Router DOM  
- TanStack Query (React Query)  
- Axios  
- Tailwind CSS + DaisyUI  
- React Icons  
- Framer Motion  
- SweetAlert2  
- React Hot Toast  

### **Backend**  
- Node.js  
- Express.js  
- MongoDB  
- JWT Authentication  
- Cookie Parser  
- CORS  
- Dotenv  

---

## 📦 Dependencies  

**Frontend:**  
```bash
npm install react-router-dom @tanstack/react-query axios tailwindcss daisyui react-icons framer-motion sweetalert2 react-hot-toast
