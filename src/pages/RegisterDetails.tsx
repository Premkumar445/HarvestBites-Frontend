import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const API_BASE_URL = "https://harvestbites-backend.onrender.com";

export default function RegisterDetails() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    otp: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load email from previous register step
  useEffect(() => {
    const existing = localStorage.getItem("hb_profile");
    const prev = existing ? JSON.parse(existing) : {};
    if (prev.email) {
      setForm((f) => ({ ...f, email: prev.email }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const existing = localStorage.getItem("hb_profile");
    const prev = existing ? JSON.parse(existing) : {};
    const email = form.email || prev.email;

    if (!email) {
      setError("Email missing. Please go back to Register page.");
      setLoading(false);
      return;
    }

    try {
      // ✅ 1. Verify OTP
      const otpRes = await fetch(
        `${API_BASE_URL}/api/verify-email-otp/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            otp: form.otp,
          }),
        }
      );

      const otpData = await otpRes.json();

      if (!otpRes.ok) {
        setError(otpData.error || "Invalid OTP");
        setLoading(false);
        return;
      }

      // ✅ 2. Register user
      const registerRes = await fetch(
        `${API_BASE_URL}/api/users/register/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${form.firstName} ${form.lastName}`,
            email: email,
            phone: form.phone,
            password: form.password,
          }),
        }
      );

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setError(
          registerData.error ||
          registerData.detail ||
          "Registration failed"
        );
        setLoading(false);
        return;
      }

      // ✅ 3. Save token & login
      localStorage.setItem("authToken", registerData.token);

      login(
        {
          id: String(registerData.id),
          email: registerData.email,
          name: registerData.name,
        },
        registerData.token
      );

      // ✅ 4. Cleanup
      localStorage.removeItem("hb_profile");

      // ✅ 5. Redirect
      navigate("/shop-now");

    } catch (err: any) {
      console.error("Register error:", err);
      setError("Backend not reachable. Please try again.");
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
            {/* LEFT */}
            <div className="space-y-6 md:pr-8 border-r">
              <h2 className="text-2xl font-semibold">Register</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>OTP *</Label>
                  <Input name="otp" value={form.otp} onChange={handleChange} required />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>First Name *</Label>
                    <Input name="firstName" value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label>Last Name *</Label>
                    <Input name="lastName" value={form.lastName} onChange={handleChange} required />
                  </div>
                </div>

                <div>
                  <Label>Mobile *</Label>
                  <Input name="phone" value={form.phone} onChange={handleChange} required />
                </div>

                <div>
                  <Label>Email *</Label>
                  <Input name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>

                <div>
                  <Label>Password *</Label>
                  <Input name="password" type="password" value={form.password} onChange={handleChange} required />
                </div>

                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                <Button type="submit" disabled={loading} className="w-full bg-green-600">
                  {loading ? "Registering..." : "Submit"}
                </Button>
              </form>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-semibold">LOGIN</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Already have an account? Login to continue.
              </p>
              <Button onClick={handleLoginClick} className="mt-4 bg-green-600">
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
