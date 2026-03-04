import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Students from "./pages/Students";
import Navbar from "./components/Navbar";

// Protected Route Component
function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        
        {/* Show Navbar only if logged in */}
        {localStorage.getItem("token") && <Navbar />}

        <Routes>

          {/* Login */}
          <Route path="/" element={<Login />} />

          {/* Teacher Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute role="teacher">
                <TeacherDashboard />
              </PrivateRoute>
            }
          />

          {/* Student Dashboard */}
          <Route
            path="/student-dashboard"
            element={
              <PrivateRoute role="student">
                <StudentDashboard />
              </PrivateRoute>
            }
          />

          {/* Manage Students (Teacher Only) */}
          <Route
            path="/students"
            element={
              <PrivateRoute role="teacher">
                <Students />
              </PrivateRoute>
            }
          />

          {/* Catch All */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;