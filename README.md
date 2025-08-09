# 📚 Pathchakro – Collaborative Study Platform  

[![Live Demo](https://img.shields.io/badge/View%20Live%20Project-00C853?style=for-the-badge&logo=google-chrome&logoColor=white)](https://pathchakro-a6827.web.app/)  

An online **group-study and assignment-sharing platform** that empowers students to **create**, **submit**, **review**, and **grade** assignments together.  
Built for learners who want **peer-to-peer feedback**, better collaboration, and an engaging study environment.  

![Pathchakro Screenshot](/banner1.png) <!-- Replace with actual screenshot path -->

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
```

**Backend**

```bash
npm install express mongodb jsonwebtoken cookie-parser cors dotenv
```
## 🚀 How to Run Locally
### 1️⃣ Clone the repository
```bash
git clone https://github.com/MdImranHossen01/A11-Pathchakro.git
cd A11-Pathchakro

```
### 2️⃣ Install dependencies
***Frontend:***
```bash
cd client
npm install

```
***Backend:***
```bash
cd server
npm install
```
### 3️⃣ Set up environment variables
- Create .env files in both client and server directories and add:
***For Client (client/.env):***

```bash
VITE_apiKey=your_api_key
VITE_authDomain=your_project_id.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id
VITE_serverUrl=http://localhost:5000
```

***For Server (server/.env):***
```bash
PORT=5000
DB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

```
### 4️⃣ Run the development servers

***Frontend:***
```bash
npm run dev

```

***Backend:***
```bash
npm start
```
### 5️⃣ Open in browser
Go to: http://localhost:5173

## 🤝 Contribution Guidelines
We welcome contributions!

Fork the repo

1.Create a new branch
2.Commit your changes
3.Open a Pull Request


### 🔗 Live Project
🌐  Live: [https://pathchakro-a6827.web.app](https://pathchakro-a6827.web.app)















































