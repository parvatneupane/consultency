import { useEffect, useState } from "react";
import api from "../../../api";
import AdminLayout from "../../../pages/AdminLayout";

export default function DropoutStudents() {
  const token = localStorage.getItem("auth_token");

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  const fetchDropouts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/dashboard/dropouts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data.data || []);
      setFilteredStudents(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch dropouts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDropouts();
  }, []);

  // 🔹 Convert back to customer
  const convertToCustomer = async (id) => {
    if (!window.confirm("Convert this student back to customer?")) return;

    try {
      await api.post(`/api/customers/convert-to-customer/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Student converted to customer successfully");
      fetchDropouts();
    } catch (error) {
      console.error("Conversion failed:", error);
     
    }
  };

  // 🔹 Handle search and filters
  useEffect(() => {
    let data = [...students];

    // Search by name, phone, email
    if (search.trim() !== "") {
      const s = search.toLowerCase();
      data = data.filter(
        (s) =>
          (s.name && s.name.toLowerCase().includes(s)) ||
          (s.phone && s.phone.toLowerCase().includes(s)) ||
          (s.email && s.email.toLowerCase().includes(s))
      );
    }

    // Filter by branch
    if (branchFilter !== "") {
      data = data.filter((s) => s.user?.name === branchFilter);
    }

    // Filter by course
    if (courseFilter !== "") {
      data = data.filter((s) => s.course === courseFilter);
    }

    setFilteredStudents(data);
  }, [search, branchFilter, courseFilter, students]);

  // 🔹 Extract unique branches and courses for filter dropdowns
  const branches = Array.from(new Set(students.map((s) => s.user?.name).filter(Boolean)));
  const courses = Array.from(new Set(students.map((s) => s.course).filter(Boolean)));

  return (
  <AdminLayout>
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Dropout Students</h2>

    {/* Search & Filters */}
    <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
      <input
        type="text"
        placeholder="Search by name, phone, email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      />

      <select
        value={branchFilter}
        onChange={(e) => setBranchFilter(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full sm:w-1/4 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      >
        <option value="">All Branches</option>
        {branches.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>

      <select
        value={courseFilter}
        onChange={(e) => setCourseFilter(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full sm:w-1/4 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      >
        <option value="">All Courses</option>
        {courses.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>

    {loading ? (
      <p className="text-center text-gray-500">Loading...</p>
    ) : (
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {["Name", "Phone", "Email", "Course", "Branch", "Remarks", "Action"].map((title) => (
                <th key={title} className="p-3 text-left text-gray-700 font-medium text-sm uppercase tracking-wide">{title}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, idx) => (
                <tr
                  key={student.id}
                  className={`border-t ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                >
                  <td className="p-3 text-gray-700">{student.name}</td>
                  <td className="p-3 text-gray-700">{student.phone}</td>
                  <td className="p-3 text-gray-700">{student.email}</td>
                  <td className="p-3 text-gray-700">{student.course}</td>
                  <td className="p-3 text-gray-700">{student.user?.name}</td>
                  <td className="p-3 text-gray-500">{student.remarks || "-"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => convertToCustomer(student.id)}
                      className="bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-400 text-white px-4 py-2 rounded-lg transition"
                    >
                      Convert
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No dropout students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )}
  </div>
</AdminLayout>
  );
}