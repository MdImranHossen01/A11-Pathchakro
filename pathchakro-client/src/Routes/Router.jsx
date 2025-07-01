import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts.jsx";
import Home from "../pages/Home/Home.jsx";
import Assignments from "../pages/Assignments/Assignments.jsx";
import CreateAssignment from "../pages/CreateAssignment/CreateAssignment.jsx";
import MyAttemptedAssignments from "../pages/MyAttemptedAssignments/MyAttemptedAssignments.jsx";
import PendingAssignments from "../pages/PendingAssignments/PendingAssignments.jsx";
import ViewAssignment from "../pages/ViewAssignment/ViewAssignment.jsx";
import UpdateAssignment from "../pages/UpdateAssignment/UpdateAssignment.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import ContactUs from "../pages/ContactUs.jsx";
import FaqPage from "../pages/FaqPage.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx";
import TermsOfService from "../pages/TermsOfService.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/assignments", element: <Assignments /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/faq",
        element: <FaqPage />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
      },
      // --- Protected Routes ---
      {
        path: "/create-assignment",
        element: (
          <PrivateRoute>
            <CreateAssignment />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-assignments",
        element: (
          <PrivateRoute>
            <MyAttemptedAssignments />
          </PrivateRoute>
        ),
      },
      {
        path: "/pending-assignments",
        element: (
          <PrivateRoute>
            <PendingAssignments />
          </PrivateRoute>
        ),
      },
      {
        path: "/assignment/:id", // Dynamic route for viewing
        element: (
          <PrivateRoute>
            <ViewAssignment />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-assignment/:id", // Dynamic route for updating
        element: (
          <PrivateRoute>
            <UpdateAssignment />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
