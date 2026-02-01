import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BadgeCheck,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => window.location.pathname === path; // keep your logic
  const activeClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 bg-orange-600 text-white shadow-lg scale-[1.01]";
  const normalClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-gray-700 hover:bg-orange-50 hover:text-orange-600";

  return (
    <div className="min-h-screen bg-white">

      {/* Sidebar (fixed on desktop, slide-in on mobile) */}
      <aside
        className={`fixed top-0 left-0 h-screen z-50 w-70 bg-white shadow-2xl flex flex-col transition-transform duration-300
                    md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:fixed md:translate-x-0`}
      >
        <div className="p-6 border-b">
          <h1 className="text-3xl font-extrabold text-orange-600 tracking-wide">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-500">Management Dashboard</p>
        </div>

        <nav className="flex-1 p-5 space-y-2 overflow-y-auto">
          <Link to="/dashboard" className={isActive("/dashboard") ? activeClass : normalClass}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>

          <Link to="/customer" className={isActive("/customer") ? activeClass : normalClass}>
            <Users size={20} /> View Customer
          </Link>

          <Link to="/employee" className={isActive("/employee") ? activeClass : normalClass}>
            <Briefcase size={20} /> Employee
          </Link>

          <Link to="/applicants" className={isActive("/applicants") ? activeClass : normalClass}>
            <BadgeCheck size={20} /> Applicants
          </Link>
        </nav>

        <div className="p-5 border-t text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Your Company
        </div>
      </aside>

      {/* Header (fixed) */}
      <header className="fixed top-0 right-0 left-0 md:left-65 h-16 bg-white shadow flex items-center justify-between px-4 md:px-6 z-40">
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Optional header title or breadcrumbs (kept minimal so existing design not changed) */}
          <div className="hidden sm:block">
            {/* keep empty or add small breadcrumb/title if you want */}
          </div>
        </div>

        <div className="relative">
          {/* Profile Button */}
          <button
            onClick={() => setProfileOpen((p) => !p)}
            className="flex items-center gap-3 focus:outline-none"
          >

            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>

              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">
              A
            </div>
          </button>

          {/* Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden z-50">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                onClick={() => setProfileOpen(false)}
              >
                <Settings size={16} /> Settings
              </Link>
              <button
                className="flex items-center gap-2 px-4 py-2 w-full text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                onClick={() => {
                  setProfileOpen(false);
                  // handle logout
                }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="md:pl-65 absolute top-9 right-0 bottom-0 left-0">
        <div className="p-6">

          <div className=" rounded-2xl shadow-xl p-6 ">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
