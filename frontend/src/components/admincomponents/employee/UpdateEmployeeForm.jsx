import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import api from "../../../api";

export default function UpdateEmployeeForm({ onUpdated }) {
  const { state } = useLocation(); 
  const employee = state;          
  const navigate = useNavigate();

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("auth_token");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    designation: "",
    monthly_salary: "",
    remarks: "",
    branch_id: "",
    pan_scan: null,
    document_scan: null,
  });

  // Load employee data into form
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        address: employee.address || "",
        phone: employee.phone || "",
        designation: employee.designation || "",
        monthly_salary: employee.monthly_salary || "",
        remarks: employee.remarks || "",
        branch_id: employee.branch_id || "",
        pan_scan: null,
        document_scan: null,
      });
    }
  }, [employee]);

  // Fetch branches
  useEffect(() => {
    if (!token) return;
    const fetchBranches = async () => {
      try {
        const res = await api.get("api/employees/branches", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBranches(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (err) {
        console.error("Failed to fetch branches:", err);
        setBranches([]);
      }
    };
    fetchBranches();
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submission
const handleUpdate = async (e) => {
  e.preventDefault();
  setLoading(true);

  const payload = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (value !== null && value !== "") {
      payload.append(key, value);
    }
  });

  try {
  await api.post(
  `api/employees/${employee.id}?_method=PUT`,
  payload,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  }
);


    toast.success("Employee updated successfully 🎉");

    setTimeout(() => navigate("/employee"), 2000);

    if (onUpdated) onUpdated();
  } catch (err) {
    console.error("Update error:", err);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <ToastContainer />
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-8 border">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 shadow-sm focus:outline-none"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Update Employee
          </h2>
          <div className="w-24"></div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Employee Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Monthly Salary
            </label>
            <input
              type="number"
              name="monthly_salary"
              value={formData.monthly_salary}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Branch
            </label>
            <select
              name="branch_id"
              value={formData.branch_id}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value= {employee.user.id}>{employee.user.name}</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* PAN Scan */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              PAN Scan 
            </label>
            <input
              type="file"
              name="pan_scan"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Document Scan */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Citizenship / Academic Scan
            </label>
            <input
              type="file"
              name="document_scan"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="reset"
              onClick={() => {
                if (employee) {
                  setFormData({
                    name: employee.name || "",
                    address: employee.address || "",
                    phone: employee.phone || "",
                    designation: employee.designation || "",
                    monthly_salary: employee.monthly_salary || "",
                    remarks: employee.remarks || "",
                    branch_id: employee.branch_id || "",
                    pan_scan: null,
                    document_scan: null,
                  });
                }
              }}
              className="px-6 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
