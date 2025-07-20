import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await API.post("/users/forgot", { email });
      console.log(res.data);
      alert("OTP sent to your email.");
      navigate("/reset", { state: { email } });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-[color:var(--color-glass)] rounded-super p-8 shadow-neon backdrop-blur-md w-full max-w-md text-white space-y-6">
        <h2 className="text-3xl font-bold text-neon-blue text-center drop-shadow">🔑 Forgot Password</h2>
        <p className="text-sm text-neon-cyan text-center">Enter your registered email to get OTP</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            className="w-full neon-input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="📧 Email"
            required
          />
          <button className="w-full neon-btn py-2 text-lg" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </main>
  );
}
