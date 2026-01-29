import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    const value = email.trim();

    if (!isValidEmail(value)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/send-email-otp/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: value }),
        }
      );

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        alert("OTP sent to your email! Check inbox/spam.");

        // Save email locally
        const existing = localStorage.getItem("hb_profile");
        const prev = existing ? JSON.parse(existing) : {};
        localStorage.setItem(
          "hb_profile",
          JSON.stringify({ ...prev, email: value })
        );

        navigate("/register/details", { state: { email: value } });
      } else {
        setError(data.error || "Failed to send OTP. Try again.");
      }
    } catch (err) {
      console.error("OTP error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Layout>
      <section className="py-16 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 border rounded-2xl bg-card p-8 md:p-10 shadow-sm">

            {/* LEFT – REGISTER */}
            <div className="space-y-6 border-r md:pr-8">
              <h2 className="text-2xl font-semibold text-foreground">
                Register
              </h2>

              <form onSubmit={handleSendOtp} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email<span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md">
                    <p className="text-xs text-destructive">{error}</p>
                  </div>
                )}

                <div className="border rounded-md p-3 flex items-center gap-3 bg-muted/40">
                  <input type="checkbox" required />
                  <span className="text-xs text-muted-foreground">
                    I'm not a robot
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-green-600 hover:bg-green-700"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            </div>

            {/* RIGHT – LOGIN */}
            <div className="space-y-6 md:pl-8 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-semibold text-foreground">
                LOGIN
              </h2>
              <p className="text-sm text-muted-foreground">
                Already have an account? Login to access your dashboard and
                orders.
              </p>
              <Button
                type="button"
                onClick={handleLoginClick}
                className="px-10 h-11 bg-green-600 hover:bg-green-700"
              >
                Login
              </Button>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
