import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, UserPlus, Users, Briefcase } from "lucide-react";

export default function AdminLayout({ children }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const activeClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 bg-orange-600 text-white shadow-lg scale-[1.02]";

  const normalClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-gray-700 hover:bg-orange-100 hover:text-orange-600";

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-2xl flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className="text-3xl font-extrabold text-orange-600 tracking-wide">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-500">Management Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-5 space-y-2">
          <Link to="/dashboard" className={isActive("/") ? activeClass : normalClass}>
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/addcustomer"
            className={isActive("/addcustomer") ? activeClass : normalClass}
          >
            <UserPlus size={20} />
            Add Customer
          </Link>

          <Link
            to="/viewcustomer"
            className={isActive("/viewcustomer") ? activeClass : normalClass}
          >
            <Users size={20} />
            View Customer
          </Link>

          <Link
            to="/viewemployee"
            className={isActive("/viewemployee") ? activeClass : normalClass}
          >
            <Briefcase size={20} />
            View Employee
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-5 border-t text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Your Company
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
