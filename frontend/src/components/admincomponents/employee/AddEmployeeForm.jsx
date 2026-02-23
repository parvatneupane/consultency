import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../api";

export default function AddEmployeeForm() {
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

  // Fetch branches
  useEffect(() => {
    if (!token) return; // stop if no token

    const fetchBranches = async () => {
      try {
        const response = await api.get("api/employees/branches", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Branch API response:", response.data);

        if (Array.isArray(response.data?.data)) {
          setBranches(response.data.data);
        } else {
          setBranches([]);
          console.error("Unexpected branch response", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch branches", error);
        setBranches([]);
      }
    };

    fetchBranches();
  }, [token]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        payload.append(key, value);
      }
    });

    try {
      const response = await api.post("api/employees", payload, {
        headers: {
          "Content-Type": "multipart/form-data", // important for file uploads
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Employee added successfully 🎉");

      setFormData({
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
    } catch (error) {
      console.error(error);
      toast.error("Failed to add employee ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-purple-100 flex items-center justify-center px-4 py-10">
      <ToastContainer />

      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-8 border">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Employee
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Employee Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold mb-1">Address</label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              required
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Monthly Salary
            </label>
            <input
              type="number"
              name="monthly_salary"
              required
              value={formData.monthly_salary}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border"
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-semibold mb-1">Remarks</label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-semibold mb-1">Branch</label>
            <select
              name="branch_id"
              required
              value={formData.branch_id}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border"
            >
              <option value="">Select Branch</option>
              {branches.length === 0 && (
                <option disabled>Loading branches...</option>
              )}
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* PAN */}
          <div>
            <label className="block text-sm font-semibold mb-1">PAN Scan</label>
            <input
              type="file"
              name="pan_scan"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Document */}
          <div>
            <label className="block text-sm font-semibold mb-1">
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
          <div className="md:col-span-2 flex justify-end gap-4 mt-6">
            <button
              type="reset"
              onClick={() =>
                setFormData({
                  name: "",
                  address: "",
                  phone: "",
                  designation: "",
                  monthly_salary: "",
                  remarks: "",
                  branch_id: "",
                  pan_scan: null,
                  document_scan: null,
                })
              }
              className="px-6 py-2 border rounded-xl"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold disabled:opacity-50"
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
