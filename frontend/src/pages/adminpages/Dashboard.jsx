import { useEffect, useState } from "react";
import DashboardCarts from "../../components/admincomponents/dashboard/DashboardCarts";
import { GraduationCap, IdCardLanyard, FileUser } from "lucide-react";
import AdminLayout from "../AdminLayout";
import api from "../../api";

export default function Dashboard() {

  const token = localStorage.getItem("auth_token");

  const [dashboard, setDashboard] = useState({
    Customers: 0,
    Employees: 0,
    Applicants: 0,
    current_month: "",
    last_month: "",
    customers_this_month: 0,
    customers_increase: 0,
    applicants_this_month: 0,
    applicants_increase: 0
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const res = await api.get("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      setDashboard(res.data);

    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  return (
    <AdminLayout>

      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <DashboardCarts
          head="Students"
          desc={`New in ${dashboard.current_month}: ${dashboard.customers_this_month}`}
          count={dashboard.Customers}
          increase={dashboard.customers_increase}
          icon={<GraduationCap />}
        />

        <DashboardCarts
          head="Employee"
          desc="Total Employees"
          count={dashboard.Employees}
          icon={<IdCardLanyard />}
        />

        <DashboardCarts
          head="Applicants"
          desc={`New in ${dashboard.current_month}: ${dashboard.applicants_this_month}`}
          count={dashboard.Applicants}
          increase={dashboard.applicants_increase}
          icon={<FileUser />}
        />

      </div>

    </AdminLayout>
  );
}