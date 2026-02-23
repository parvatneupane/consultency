import AdminLayout from "../AdminLayout";
import ApplicantTable from "../../components/admincomponents/applicant/ApplicantTable";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import api from "../../api";
export default function Applicants() {
      const token = localStorage.getItem("auth_token");
          const [AllApplicant, setAllApplicant] = useState([]);
          const [loading, setLoading] = useState(false);



    const fetchApplicants = async () => {

    setLoading(true);
    try {
      const response = await api.get("api/applicant", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllApplicant(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplicants();
  }, []);
    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-2">Applicants Page</h2>
        <ApplicantTable applicants ={AllApplicant} />
        </AdminLayout>
    );
}