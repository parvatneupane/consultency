import { useEffect, useState } from "react";
import DashboardCarts from "../../components/admincomponents/dashboard/DashboardCarts";
import { GraduationCap, IdCardLanyard, FileUser } from "lucide-react";
import AdminLayout from "../AdminLayout";
import api from "../../api";

export default function Dashboard() {

  const token = localStorage.getItem("auth_token");

  const [dashboard, setDashboard] = useState({
    Customers: 0,
    employees: 0,
    applicants: 0,
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
     
      setDashboard(res.data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-2">Dashboard Page</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <DashboardCarts
          head="Students"
          desc="Total Students"
          count={dashboard.Customers}
          icon={<GraduationCap />}
        />

        <DashboardCarts
          head="Employee"
          desc="Total Employee"
          count={dashboard.employees}
          icon={<IdCardLanyard />}
        />

        <DashboardCarts
          head="Applicants"
          desc="Total Applicants"
          count={dashboard.applicants}
          icon={<FileUser />}
        />

      </div>
    </AdminLayout>
  );
}