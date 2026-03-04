import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 shadow-md">
      <div className="flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          RFID Attendance System
        </h1>

        {/* Menu */}
        <div className="flex gap-6 items-center">

          {role === "teacher" && (
            <>
              <Link
                to="/dashboard"
                className="hover:text-gray-200 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/students"
                className="hover:text-gray-200 transition"
              >
                Manage Students
              </Link>
            </>
          )}

          {role === "student" && (
            <Link
              to="/student-dashboard"
              className="hover:text-gray-200 transition"
            >
              My Attendance
            </Link>
          )}

          {/* Logout Button */}
          <button
            onClick={logout}
            className="bg-white text-blue-600 px-4 py-1 rounded-md font-medium hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}