import { useState, useEffect } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => { if (Cookies.get("token")) navigate("/"); }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", form);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-[color:var(--color-glass)] rounded-super neon-border max-w-md w-full p-10 shadow-2xl backdrop-blur-md animate-neon">
        <h2 className="text-3xl font-extrabold mb-7 text-center text-[color:var(--color-neon-blue)]">Create Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" required className="w-full neon-input" value={form.name} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" required className="w-full neon-input" value={form.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" required className="w-full neon-input" value={form.password} onChange={handleChange} />
          <button className="w-full neon-btn py-2 text-lg tracking-wider">Sign Up</button>
        </form>
        <p className="text-neon-cyan mt-5 text-center">
          Already registered?{" "}
          <Link to="/login" className="underline hover:text-neon-pink">Login</Link>
        </p>
      </div>
    </main>
  );
}
