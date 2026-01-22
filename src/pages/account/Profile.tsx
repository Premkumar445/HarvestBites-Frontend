// UPDATED PROFILE PAGE
// Changes done:
// 1) Background changed to pure white
// 2) Orders loaded ONLY from localStorage (no dummy orders)
// 3) Ready for Flipkart-style real orders flow

import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Package,
  Clock,
  CreditCard,
  Heart,
  Bell,
  Shield,
  LogOut,
  Plus,
  Trash2,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  TruckIcon,
  AlertCircle,
  ChevronRight,
  Star,
  Settings,
  Gift,
  Wallet,
  Home,
} from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  shippingAddress: string;
  trackingNumber?: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedProfile = localStorage.getItem("hb_profile");
    if (savedProfile) setFormData(JSON.parse(savedProfile));

    const savedOrders = localStorage.getItem("harvestbites_orders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));

    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem("hb_profile", JSON.stringify(formData));
    setIsEditing(false);
    alert("Profile updated successfully");
  };

  const getOrderStatusColor = (status: string) => ({
    delivered: "bg-green-100 text-green-800",
    shipped: "bg-blue-100 text-blue-800",
    processing: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  }[status]);

  return (
    <Layout>
      {/* WHITE BACKGROUND */}
      <section className="py-10 bg-white min-h-screen">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold">My Account</h1>
              <p className="text-muted-foreground">Manage profile & orders</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Gift className="h-4 w-4" /> Rewards
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">

            {/* SIDEBAR */}
            <div className="bg-card p-6 rounded-xl border">
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={formData.avatar} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{formData.firstName || "User"}</p>
                  <p className="text-sm text-muted-foreground">{formData.email}</p>
                </div>
              </div>

              {["profile", "orders"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "profile" ? <User className="h-4 w-4 mr-2" /> : <Package className="h-4 w-4 mr-2" />}
                  {tab === "profile" ? "Profile" : "My Orders"}
                </Button>
              ))}

              <Separator className="my-4" />
              <Button variant="ghost" className="text-destructive w-full justify-start">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>

            {/* CONTENT */}
            <div className="lg:col-span-3">

              {/* PROFILE */}
              {activeTab === "profile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Update your details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="First Name" value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                    <Input placeholder="Last Name" value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                    <Input placeholder="Phone" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    <Button onClick={handleSaveProfile}>Save</Button>
                  </CardContent>
                </Card>
              )}

              {/* ORDERS */}
              {activeTab === "orders" && (
                <Card>
                  <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <p className="text-center text-muted-foreground">No orders yet</p>
                    ) : (
                      orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 mb-4">
                          <div className="flex justify-between">
                            <p className="font-semibold">#{order.orderNumber}</p>
                            <Badge className={getOrderStatusColor(order.status)}>{order.status}</Badge>
                          </div>
                          <p className="text-sm">₹{order.total}</p>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              )}

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
