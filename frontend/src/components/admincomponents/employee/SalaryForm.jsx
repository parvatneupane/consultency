import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

export default function SalaryForm({
  onAddSalary,
  salaryHistory = [],
  employee,
}) {

  // console.log(employee);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    remarks: "",
    slip: null,
  });

  const [slipPreview, setSlipPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("auth_token");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "slip") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, slip: file }));

      if (file && file.type.startsWith("image")) {
        setSlipPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.amount) return;

    try {
      setLoading(true);

      // FormData for file upload
      const payload = new FormData();
      payload.append("emp_id", employee.id); 
      payload.append("date", formData.date);
      payload.append("amount", formData.amount);
      payload.append("remarks", formData.remarks);

      if (formData.slip) {
        payload.append("slip", formData.slip);
      }

      console.log("Payload:", payload);

      const response = await api.post("api/salary", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Optional local update
      if (onAddSalary) {
        onAddSalary(response.data);
      }

      // Reset form
      setFormData({
        date: "",
        amount: "",
        remarks: "",
        slip: null,
      });
      setSlipPreview(null);

    } catch (error) {
      console.error("Salary add failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = () => {
    navigate("/salaryhistory", {
      state: { employee, salaryHistory },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow space-y-4"
    >
      <h3 className="text-lg font-semibold">Add Salary</h3>

      <input
        type="month"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />

      <input
        type="text"
        name="remarks"
        placeholder="Remarks"
        value={formData.remarks}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="file"
        name="slip"
        accept="image/*,application/pdf"
        onChange={handleChange}
      />

      {slipPreview && (
        <img
          src={slipPreview}
          alt="preview"
          className="h-20 border rounded"
        />
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Salary"}
        </button>

        <button
          type="button"
          onClick={handleViewHistory}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          View Salary History
        </button>
      </div>
    </form>
  );
}
