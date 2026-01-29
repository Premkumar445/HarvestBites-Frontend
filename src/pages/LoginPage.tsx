import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const API_BASE_URL = "https://harvestbites-backend.onrender.com";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.detail || "Login failed");
        return;
      }

      const userData = {
        id: String(data.id),
        email: data.email,
        name: data.name,
      };

      localStorage.setItem("authToken", data.token);
      login(userData, data.token);

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });

    } catch (err) {
      console.error("Login error:", err);
      alert("Backend not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${API_BASE_URL}/api/users/google-login/`;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600">
            Please enter your details to continue
          </p>
        </div>

        {/* Google Login */}
        <Button
          onClick={handleGoogleSignIn}
          className="w-full h-12 bg-white border border-gray-200 text-gray-800 rounded-xl mb-4"
          variant="outline"
        >
          Sign in with Google
        </Button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-12 bg-emerald-600 text-white rounded-xl"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </div>

        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-emerald-600 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
