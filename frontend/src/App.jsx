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
import { LogIn } from "lucide-react";
import UpdateCustomerForm from "./components/admincomponents/customer/UpdateCustomerForm";
import UpdateEmployeeForm from "./components/admincomponents/employee/UpdateEmployeeForm";


 export default function  App() {
  return (
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addcustomer" element={<AddCustomer />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/customer_edit" element={<UpdateCustomerForm />} />
            <Route path="/customer_view" element={<CustomerView />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/addemployee" element={<AddEmployee />} />
            <Route path="/employee_edit" element={<UpdateEmployeeForm />} />
            <Route path="/employee_view" element={<EmployeeView />} />
            <Route path="/salaryhistory" element={<SalaryHistoryPage />} />
            <Route path="/applicants" element={<Applicants />} />
            <Route path="/applicant_view" element={<ApplicantView />} />
          </Routes>
       
          </BrowserRouter>
  );
}


