// src/pages/SignUpPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

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
      const res = await fetch("http://127.0.0.1:8000/api/users/register/", {
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
          data.email?.[0] ||
          data.phone?.[0] ||
          data.password?.[0] ||
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
      console.error("Signup network error:", error);
      alert("Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = !!name && !!email && !!password && !!phone && !loading;
  const handleGoogleSignIn = () => {
    window.open("http://127.0.0.1:8000/api/users/google-login/", "_self");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">
            Create Account
          </h1>
          
        </div>

        {/* ✅ Google Sign In Button - Image la match */}
        <Button
          onClick={handleGoogleSignIn}
          className="w-full h-12 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-medium rounded-xl shadow-sm mb-4 flex items-center gap-3 transition-all duration-200"
        >
          <svg 
            className="h-5 w-5 flex-shrink-0" 
            viewBox="0 0 24 24"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign up with Google
        </Button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-xs text-gray-500 uppercase font-medium tracking-wide">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            disabled={loading}
            className="w-full h-12"
          />

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={loading}
            className="w-full h-12"
          />

          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            disabled={loading}
            className="w-full h-12"
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            disabled={loading}
            className="w-full h-12"
          />

          <Button
            onClick={handleRegister}
            disabled={!canSubmit}
            className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-base font-semibold rounded-xl shadow-lg transition-all duration-200"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </div>

        {/* Terms & Login Link */}
        <div className="mt-6 space-y-3">
          
          
          <p className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
            </span>
            <Link 
              to="/login" 
              className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm underline"
            >
              Login →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
