import React from "react";
import { Link, useLocation } from "react-router";
import { FaPlus, FaTasks, FaUser } from "react-icons/fa";
import Logo from "../../components/Logo";

const UserDashboard = () => {
  const location = useLocation();

  const userLinks = [
    {
      path: "/user-dashboard",
      label: "My Profile",

      icon: <FaUser className="mr-2" />,
    },
    {
      path: "/user-dashboard/my-assignments",
      label: "My Assignments",
      icon: <FaTasks className="mr-2" />,
    },
    {
      path: "/user-dashboard/create-assignment",
      label: "Create Assignment",
      icon: <FaPlus className="mr-2" />,
    },
  ];

  return (
    <div className="space-y-2">
        <Logo></Logo>
      <h2 className="text-xl font-bold mb-4">Dashboard Menu</h2>
      {userLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            location.pathname === link.path
              ? "bg-primary text-primary-content"
              : "hover:bg-base-300"
          }`}
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default UserDashboard;
