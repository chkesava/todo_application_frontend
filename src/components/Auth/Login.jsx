import { useState, useEffect } from "react";
import API from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (Cookies.get("token")) navigate("/"); }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/users/login", form);
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-[color:var(--color-glass)] rounded-super neon-border max-w-md w-full p-10 shadow-2xl backdrop-blur-md animate-neon">
        <h2 className="text-3xl font-extrabold mb-7 text-center text-[color:var(--color-neon-blue)] drop-shadow">Sign In</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" required className="w-full neon-input" value={form.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" required className="w-full neon-input" value={form.password} onChange={handleChange} />
          <button className="w-full neon-btn py-2 text-lg tracking-wider">Sign In</button>
        </form>
        <p className="text-neon-cyan mt-5 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="underline hover:text-neon-pink">Register</Link>
        </p>
        <p className="text-neon-cyan mt-5 text-center">
          Forgot Password?{" "}
          <Link to="/forgot" className="underline hover:text-neon-pink">Reset it here</Link>
        </p>
      </div>
    </main>
  );
}
