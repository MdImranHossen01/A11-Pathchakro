Pathchakro - A Collaborative Study Platform
An online group-study web application where users can create, share, complete, and grade assignments among friends. This platform is designed to foster a collaborative learning environment through peer-to-peer feedback and shared goals.

Live Site URL
https://pathchakro-your-site.web.app (Replace with your actual deployed URL)

Key Features
Full User Authentication: Secure user registration and login system using Firebase Authentication, with JWT (JSON Web Tokens) for authorizing API requests. Includes both email/password and Google social login options.
Assignment CRUD Operations: Authenticated users can Create, Read, Update, and Delete assignments.
Creator-Only Controls: Users can only update or delete assignments that they have personally created.
Interactive Assignment Submission: Users can take any assignment by submitting a Google Docs link and adding a quick note for the examiner.
Peer Grading System: A unique "Pending Assignments" page where users can review and grade submissions from their peers (but are restricted from grading their own). Graders can provide marks and constructive feedback.
Personalized Dashboards:
My Attempted Assignments: A dedicated page for users to track the status, marks, and feedback for all their own submissions.
Profile Dropdown: Quick access to create assignments, view submissions, and log out.
Dynamic Filtering: The main assignments page allows users to filter the list of all available assignments by difficulty level (Easy, Medium, Hard).
Modern & Responsive UI: The entire application is built with a clean, modern aesthetic and is fully responsive for optimal use on desktops, tablets, and mobile devices.
Theme Customization: A theme toggler allows users to instantly switch between a comfortable light mode and a sleek dark mode.
Secure API & Credentials: All sensitive credentials (MongoDB URI, Firebase Keys, JWT Secret) are kept secure using environment variables (.env).
Technologies & NPM Packages Used
Frontend (Client-Side)
Framework/Library: React.js
Routing: react-router-dom
Data Fetching & State Management: axios, @tanstack/react-query
Authentication: firebase
Styling: tailwindcss, daisyui
Forms: react-hook-form
UI Components & UX: react-datepicker, sweetalert2 (for modals), react-hot-toast (for notifications)
Animations: framer-motion
Icons: react-icons
Backend (Server-Side)
Framework: Node.js, Express.js
Database: MongoDB (with mongodb driver)
Authentication: jsonwebtoken (for JWT), cookie-parser (for handling cookies)
Middleware: cors (for handling cross-origin requests)
Environment Variables: dotenv