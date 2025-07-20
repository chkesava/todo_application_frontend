import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email || !otp || !newPassword) return alert("All fields are required");
    setLoading(true);
    try {
      const res = await API.post("/users/reset", { email, otp, newPassword });
      console.log(res.data);
      alert("Password reset successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-[color:var(--color-glass)] rounded-super p-8 shadow-neon backdrop-blur-md w-full max-w-md text-white space-y-6">
        <h2 className="text-3xl font-bold text-neon-blue text-center drop-shadow">🔐 Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input type="text" value={email} className="neon-input w-full" disabled />
          <input
            type="text"
            placeholder="🔑 OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="neon-input w-full"
            required
          />
          <input
            type="password"
            placeholder="🔒 New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="neon-input w-full"
            required
          />
          <button className="w-full neon-btn py-2 text-lg" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </main>
  );
}
