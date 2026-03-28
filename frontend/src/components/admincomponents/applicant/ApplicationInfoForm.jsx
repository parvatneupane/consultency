import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIntakeForm from "./AddIntakeForm";

export default function ApplicationInfoForm({ applicant, onCancel, onSubmit }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");
   const data = JSON.parse(localStorage.getItem("user"));

  // Determine existing applicant data
  const applicantData = Array.isArray(applicant.applicants)
    ? applicant.applicants[0]
    : applicant.applicants || null;

  // Form state
  const [formData, setFormData] = useState({
    applied_city: "",
    applied_college: "",
    intake: "",
    coe_charge: "",
    documentation_charge: "",
    remarks: "",
  });

  const [loading, setLoading] = useState(false);
  const [intakes, setIntakes] = useState([]); // State for intake list
  const [showIntakeForm, setShowIntakeForm] = useState(false);

  // Fetch intakes from API
  const fetchIntakes = async () => {
    try {
      const res = await api.get("/api/intakes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIntakes(res.data.data || []);
    } catch (err) {
      console.error("Error fetching intakes:", err);
    }
  };

  useEffect(() => {
    fetchIntakes();
  }, []);

  // Populate form when applicantData changes
  useEffect(() => {
    if (applicantData) {
      setFormData({
        applied_city: applicantData.applied_city || "",
        applied_college: applicantData.applied_college || "",
        intake: applicantData.intake || "",
        coe_charge: applicantData.coe_charge || "",
        documentation_charge: applicantData.documentation_charge || "",
        remarks: applicantData.remarks || "",
      });
    }
  }, [applicantData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // When new intake is added via + Add
const handleAddIntake = async (newIntake) => {
  await fetchIntakes();
  setFormData((prev) => ({ ...prev, intake: newIntake.name }));
  setShowIntakeForm(false);
};

  // Submit form (POST if no applicantData, PUT if exists)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (applicantData && applicantData.id) {
        // Update existing applicant
        await api.put(`api/applicant/${applicantData.id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Applicant updated successfully 🎉");
      } else {
        // Create new applicant
        const payload = {
          ...formData,
          cus_id: applicant.id, // Link to customer
        };
        await api.post("api/applicant", payload, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Applicant created successfully 🎉");
      }

      if (onSubmit) onSubmit(formData);
      setTimeout(() => navigate("/applicants"), 1000);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);

      if (err.response?.status === 422) {
        const errors = err.response.data.errors || {};
        Object.values(errors).forEach((msgs) =>
          msgs.forEach((msg) => toast.error(msg))
        );
      } else {
        toast.error(err.message || "Something went wrong ❌");
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <ToastContainer />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-2xl"
      >
        <h2 className="text-xl font-semibold mb-6">
          {applicantData ? "Update" : "Add"} Application Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-600">Applied City</label>
            <input
              type="text"
              name="applied_city"
              value={formData.applied_city}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
              
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Applied College</label>
            <input
              type="text"
              name="applied_college"
              value={formData.applied_college}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
              
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Intake</label>
            <div className="flex gap-2 mt-1">
              <select
                name="intake"
                value={formData.intake}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
               
              >
                <option value="">Select Intake</option>
                {intakes.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

               {( data?.role === "superadmin" || data?.role === "admin")  && (
              <button
                type="button"
                onClick={() => setShowIntakeForm(true)}
                className="bg-blue-500 text-white px-3 rounded-lg"
              >
                + Add
              </button>

               )}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">COE Charge</label>
            <input
              type="number"
              name="coe_charge"
              value={formData.coe_charge}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
             
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Documentation Charge</label>
            <input
              type="number"
              name="documentation_charge"
              value={formData.documentation_charge}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
             
            />
          </div>

                <div>
            <label className="text-sm text-gray-600">Remarks</label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
              
            />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white px-5 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>

      {showIntakeForm && (
        <AddIntakeForm
          onSave={handleAddIntake}
          onCancel={() => setShowIntakeForm(false)}
        />
      )}
    </div>
  );
}