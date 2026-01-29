import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (password !== confirmPassword) {
    toast("Passwords do not match");
    setLoading(false);
    return;
  }

  try {
    const res = await api.post("api/register", {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    });

    console.log(res);
    navigate("/login");
  }  catch (err) {

  if (err.response?.status === 422) {
    const errors = err.response.data.errors;
    const len = Object.keys(errors).length

    for(let i=0; i< len ; i++){
    const error = Object.values(errors)[i][0];
      toast.error(error)

    }



  } else {
    toast("Something went wrong. Please try again.");
  }} finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
        <ToastContainer />


      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join us and get started
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 cursor-pointer text-white py-2.5 rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
