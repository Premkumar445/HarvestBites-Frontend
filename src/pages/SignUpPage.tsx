// src/pages/SignUpPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const API_BASE_URL = "https://harvestbites-backend.onrender.com";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async () => {
    if (!name || !email || !phone || !password) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg =
          data?.email?.[0] ||
          data?.phone?.[0] ||
          data?.password?.[0] ||
          data?.detail ||
          "Registration failed";
        alert(msg);
        return;
      }

      const userData = {
        id: String(data.id),
        email: data.email,
        name: data.name,
      };

      localStorage.setItem("authToken", data.token);
      login(userData, data.token);

      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Backend not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${API_BASE_URL}/api/users/google-login/`;
  };

  const canSubmit = !!name && !!email && !!password && !!phone && !loading;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">
            Create Account
          </h1>
        </div>

        {/* Google Sign Up */}
        <Button
          onClick={handleGoogleSignIn}
          className="w-full h-12 bg-white border border-gray-200 text-gray-800 rounded-xl shadow-sm mb-4 flex items-center gap-3"
        >
          Sign up with Google
        </Button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-xs text-gray-500 uppercase">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            disabled={loading}
          />

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={loading}
          />

          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            disabled={loading}
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={loading}
          />

          <Button
            onClick={handleRegister}
            disabled={!canSubmit}
            className="w-full h-12 bg-emerald-600 text-white rounded-xl"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </div>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600 font-semibold underline">
            Login →
          </Link>
        </p>
      </div>
    </div>
  );
}
