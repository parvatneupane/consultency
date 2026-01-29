import axios from "axios";
import { useEffect, useState } from "react";
import DashboardCarts from "../../components/admincomponents/dashboardcarts";
import { GraduationCap,IdCardLanyard,FileUser } from "lucide-react";

import AdminLayout from "../AdminLayout";
export default function Dashboard() {
    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-2">Dashboard Page</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">    
   < DashboardCarts head="Students" desc="Total Students" count="500" icon={<GraduationCap />} />
    < DashboardCarts head="Employee" desc="Total Employee" count="200" icon={<IdCardLanyard />} />

< DashboardCarts head="Applicants" desc="Total Applicants" count="200" icon={<FileUser />} />
</div>    
        </AdminLayout>
    );
}