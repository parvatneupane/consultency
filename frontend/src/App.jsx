import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Dashboard from "./pages/adminpages/Dashboard";
import AddCustomer from "./pages/adminpages/AddCustomer";
import Customer from "./pages/adminpages/Customer";
import CustomerView from "./components/admincomponents/customer/CustomerView";

import Employee from "./pages/adminpages/Employee";
import AddEmployee from "./pages/adminpages/AddEmployee";
import EmployeeView from "./components/admincomponents/employee/EmployeeView";
import SalaryHistoryPage from "./components/admincomponents/employee/SalaryHistoryPage";

import Applicants from "./pages/adminpages/Applicants";
import ApplicantView from "./components/admincomponents/applicant/ApplicantView";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";

import UpdateCustomerForm from "./components/admincomponents/customer/UpdateCustomerForm";
import UpdateEmployeeForm from "./components/admincomponents/employee/UpdateEmployeeForm";

import ProtectedRoute from "./components/admincomponents/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* OTP & Forgot Password Flow */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["admin", "branch"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Customer */}
        <Route
          path="/addcustomer"
          element={
            <ProtectedRoute roles={["admin", "branch"]}>
              <AddCustomer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer"
          element={
            <ProtectedRoute roles={["admin", "branch"]}>
              <Customer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer_edit"
          element={
            <ProtectedRoute roles={["admin", "branch"]}>
              <UpdateCustomerForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer_view"
          element={
            <ProtectedRoute roles={["admin", "branch"]}>
              <CustomerView />
            </ProtectedRoute>
          }
        />

        {/* Admin Only */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Employee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addemployee"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee_edit"
          element={
            <ProtectedRoute roles={["admin"]}>
              <UpdateEmployeeForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee_view"
          element={
            <ProtectedRoute roles={["admin"]}>
              <EmployeeView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/salaryhistory"
          element={
            <ProtectedRoute roles={["admin"]}>
              <SalaryHistoryPage />
            </ProtectedRoute>
          }
        />

        {/* Applicants */}
        <Route
          path="/applicants"
          element={
            <ProtectedRoute roles={["admin", "branch"]}>
              <Applicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicant_view"
          element={
            <ProtectedRoute roles={["admin", "branch"]}>
              <ApplicantView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}