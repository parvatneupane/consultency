import AdminLayout from "../AdminLayout";
import ApplicantsTable from "../../components/admincomponents/applicant/ApplicantTable";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import api from "../../api";
import "react-toastify/dist/ReactToastify.css";

export default function Applicants() {
  const token = localStorage.getItem("auth_token");
  const [allApplicants, setAllApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [intakeFilter, setIntakeFilter] = useState("");
  const [coeFilter, setCoeFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  // Fetch applicants
  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const response = await api.get("api/applicant", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const applicants = response.data.data || [];
      setAllApplicants(applicants);
      setFilteredApplicants(applicants);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      toast.error("Error fetching applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  // Filter applicants whenever filters change
  useEffect(() => {
    const filtered = allApplicants.filter((applicant) => {
      const applicantData = applicant.applicants || {};

      const branch = applicant.user?.name || "";
      const intake = applicantData.intake || "";
      const coeStatus = applicantData.coe?.status ?? "";
      const course = applicant.course || "";

      const matchesSearch =
        applicant.name?.toLowerCase().includes(search.toLowerCase()) ||
        applicant.phone?.includes(search);

      const matchesBranch = branchFilter ? branch === branchFilter : true;
      const matchesIntake = intakeFilter ? intake === intakeFilter : true;
      const matchesCoe = coeFilter ? coeStatus === coeFilter : true;
      const matchesCourse = courseFilter ? course === courseFilter : true;

      return matchesSearch && matchesBranch && matchesIntake && matchesCoe && matchesCourse;
    });

    setFilteredApplicants(filtered);
  }, [search, branchFilter, intakeFilter, coeFilter, courseFilter, allApplicants]);

  // Compute unique options for filters
  const branchOptions = [...new Set(allApplicants.map((a) => a.user?.name).filter(Boolean))];
  const intakeOptions = [...new Set(allApplicants.map((a) => a.applicants?.intake).filter(Boolean))];
  const coeOptions = [...new Set(allApplicants.map((a) => a.applicants?.coe?.status).filter(Boolean))];
  const courseOptions = [...new Set(allApplicants.map((a) => a.course).filter(Boolean))];

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Applicants Page</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg w-64"
          />

          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">All Branches</option>
            {branchOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select
            value={intakeFilter}
            onChange={(e) => setIntakeFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">All Intakes</option>
            {intakeOptions.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>

          <select
            value={coeFilter}
            onChange={(e) => setCoeFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">All COE Status</option>
            {coeOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">All Courses</option>
            {courseOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="p-6 text-gray-500">Loading applicants...</div>
        ) : (
          <ApplicantsTable applicants={filteredApplicants} />
        )}
      </div>
    </AdminLayout>
  );
}