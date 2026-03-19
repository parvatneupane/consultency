import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardCarts from "../../components/admincomponents/dashboard/DashboardCarts";
import { GraduationCap, IdCardLanyard, FileUser, UserX } from "lucide-react"; // UserX for dropouts
import AdminLayout from "../AdminLayout";
import api from "../../api";

export default function Dashboard() {

  const token = localStorage.getItem("auth_token");

  const [dashboard, setDashboard] = useState({
    Customers: 0,
    Employees: 0,
    Applicants: 0,
    Dropouts: 0,
    current_month: "",
    last_month: "",
    customers_this_month: 0,
    customers_increase: 0,
    applicants_this_month: 0,
    applicants_increase: 0,
    dropouts_this_month: 0,
    dropouts_increase: 0
  });

  useEffect(() => {
    fetchDashboard();
    fetchDropoutsCount();
  }, []);

  // Fetch main dashboard counts
  const fetchDashboard = async () => {
    try {
      const res = await api.get("/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboard(prev => ({ ...prev, ...res.data }));
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  // Fetch dropouts count
  const fetchDropoutsCount = async () => {
    try {
      const res = await api.get("/api/dashboard/dropouts", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = res.data.data || [];

      const currentMonth = new Date().getMonth() + 1;
      const dropoutsThisMonth = data.filter(d => new Date(d.created_at).getMonth() + 1 === currentMonth).length;

      setDashboard(prev => ({
        ...prev,
        Dropouts: data.length,
        dropouts_this_month: dropoutsThisMonth,
        dropouts_increase: dropoutsThisMonth // optional, or calculate vs last month
      }));

    } catch (error) {
      console.error("Failed to fetch dropouts:", error);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <Link to="/customer">
          <DashboardCarts
            head="Students"
            desc={`New in ${dashboard.current_month}: ${dashboard.customers_this_month}`}
            count={dashboard.Customers}
            increase={dashboard.customers_increase}
            icon={<GraduationCap />}
          />
        </Link>

        <Link to="/employee">
          <DashboardCarts
            head="Employee"
            desc="Total Employees"
            count={dashboard.Employees}
            icon={<IdCardLanyard />}
          />
        </Link>

        <Link to="/applicants">
          <DashboardCarts
            head="Applicants"
            desc={`New in ${dashboard.current_month}: ${dashboard.applicants_this_month}`}
            count={dashboard.Applicants}
            increase={dashboard.applicants_increase}
            icon={<FileUser />}
          />
        </Link>

        <Link to="/dropout">
          <DashboardCarts
            head="Dropouts"
            desc={`New in ${dashboard.current_month}: ${dashboard.dropouts_this_month}`}
            count={dashboard.Dropouts}
            increase={dashboard.dropouts_increase}
            icon={<UserX />} // Icon for dropouts
          />
        </Link>

      </div>

    </AdminLayout>
  );
}