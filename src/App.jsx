import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import TodoPage from "./components/Todo/TodoPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Cookies from "js-cookie";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
function PrivateRoute({ children }) {
  const token = Cookies.get("token");
  return token ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const token = Cookies.get("token");
  return token ? <Navigate to="/" /> : children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><TodoPage /></PrivateRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/forgot" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      <Route path="/reset" element={<PublicRoute><ResetPassword /></PublicRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
