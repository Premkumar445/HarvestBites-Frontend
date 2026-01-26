import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, User, LogOut, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import logo from "@/assets/harvestbiteslogo.png";

const desktopNavLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/shop" },
  { name: "Contact", path: "/contact" },
];

const mobileNavLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "FAQ", path: "/faq" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount, setIsCartOpen } = useCart();
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsAccountOpen(false);
    navigate("/");
  };

  return (
    <>
     

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">

            {/* LOGO */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-11 object-contain" />
            </Link>

            {/* DESKTOP NAV LINKS */}
            <div className="hidden md:flex items-center gap-8">
              {desktopNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-base font-medium hover:text-emerald-600 transition-colors py-2",
                    location.pathname === link.path && "text-emerald-600 border-b-2 border-emerald-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* DESKTOP SEARCH */}
            <div className="hidden md:flex flex-1 justify-center max-w-md">
              <div className="relative w-full">
                <input
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border rounded-full text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* DESKTOP NAV - CART + ACCOUNT */}
            <div className="hidden md:flex items-center gap-6">
              {/* CART */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2 hover:bg-emerald-50 transition-colors rounded-lg"
              >
                <ShoppingBag className="h-5 w-5 text-emerald-600" />
                <span className="font-medium text-sm">Cart ({itemCount})</span>
              </button>

              {/* DESKTOP ACCOUNT DROPDOWN */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-emerald-50 transition-colors rounded-lg"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-emerald-600 text-white font-bold text-sm">
                        {user?.name?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">My Account</span>
                  </button>

                  {/* DESKTOP ACCOUNT MENU */}
                  {isAccountOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl border z-50">
                      <Link
                        to="/account/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 rounded-t-xl"
                        onClick={() => setIsAccountOpen(false)}
                      >
                        <User className="h-5 w-5 text-emerald-600" />
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-b-xl"
                      >
                        <LogOut className="h-5 w-5" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button asChild variant="outline">
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>

            {/* MOBILE ICONS */}
            <div className="flex md:hidden items-center gap-2">
              {/* MOBILE SEARCH ICON */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full hover:bg-emerald-50"
              >
                <Search className="h-5 w-5" />
              </button>

              {isLoggedIn && (
                <div className="relative">
                  <button
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className="p-0 bg-transparent border-0 shadow-none outline-none"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-emerald-600 text-white font-bold text-sm">
                        {user?.name?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>

                  {isAccountOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl border z-50">
                      <Link
                        to="/account/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 rounded-t-xl"
                        onClick={() => setIsAccountOpen(false)}
                      >
                        <User className="h-5 w-5 text-emerald-600" />
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-b-xl"
                      >
                        <LogOut className="h-5 w-5" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* CART */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-emerald-50"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-600 text-white text-[10px] rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* MENU */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-emerald-50"
              >
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          {isOpen && (
            <div className="md:hidden py-4 border-t bg-white">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block py-3 px-4 text-base font-medium hover:bg-emerald-50",
                    location.pathname === link.path && "bg-emerald-50 text-emerald-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
