import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Users, ShieldCheck } from "lucide-react";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex flex-col">
      
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-700">
          ConsultancyPro
        </h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">ConsultancyPro</span>
        </h2>

        <p className="max-w-xl text-gray-600 mb-8 text-lg">
          We help businesses grow with professional consultancy services, expert guidance, and secure client management solutions.
        </p>

        <div className="flex gap-6">
          <Link
            to="/login"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-lg"
          >
            Get Started <ArrowRight size={20} />
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition text-lg"
          >
            Create Account
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 text-center">
          
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <Briefcase className="mx-auto text-blue-600 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">
              Professional Services
            </h3>
            <p className="text-gray-600">
              Expert consultants to guide your business decisions and strategies.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <Users className="mx-auto text-green-600 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">
              Client Management
            </h3>
            <p className="text-gray-600">
              Securely manage clients, meetings, and project progress in one place.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <ShieldCheck className="mx-auto text-purple-600 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">
              Secure Platform
            </h3>
            <p className="text-gray-600">
              Authentication and data security powered by modern technologies.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-gray-600">
        © {new Date().getFullYear()} ConsultancyPro. All rights reserved.
      </footer>
    </div>
  );
}
