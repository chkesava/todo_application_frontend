import { useState, useEffect } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) navigate("/");
  }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", form);
      alert("Registration successful. Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Name" className="input input-bordered w-full" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" onChange={handleChange} required />
        <button className="btn btn-primary w-full">Register</button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login here</Link>
      </p>
    </main>
  );
}
