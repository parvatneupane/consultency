import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/adminpages/Dashboard";
import AddCustomer from "./pages/adminpages/AddCustomer";
import ViewCustomer from "./pages/adminpages/ViewCustomer";
import ViewEmployee from "./pages/adminpages/ViewEmployee";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { LogIn } from "lucide-react";


 export default function  App() {
  return (
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addcustomer" element={<AddCustomer />} />
            <Route path="/viewcustomer" element={<ViewCustomer />} />
            <Route path="/viewemployee" element={<ViewEmployee/>} />
          </Routes>
       
          </BrowserRouter>
  );
}


