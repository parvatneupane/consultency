import { useState } from "react";

export default function ApplicationInfoForm({
  applicant,
  onCancel,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    applied_city: applicant?.applied_city || "",
    applied_colllege: applicant?.applied_colllege || "",
    intake: applicant?.intake || "",
    coe_charge: applicant?.coe_charge || "",
    documentation_charge: applicant?.documentation_charge || "",
    coe_status: applicant?.coe_status || 0,
    status: applicant?.status || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 You can replace this with API call later
    console.log("Updated Data:", formData);

    if (onSubmit) onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow border"
    >
      <h2 className="text-xl font-semibold mb-6">
        Update Application Details
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Applied City */}
        <Input
          label="Applied City"
          name="applied_city"
          value={formData.applied_city}
          onChange={handleChange}
        />

        {/* Applied College */}
        <Input
          label="Applied College"
          name="applied_colllege"
          value={formData.applied_colllege}
          onChange={handleChange}
        />

        {/* Intake */}
        <Input
          label="Intake"
          name="intake"
          value={formData.intake}
          onChange={handleChange}
        />

        {/* COE Charge */}
        <Input
          label="COE Charge"
          name="coe_charge"
          type="number"
          value={formData.coe_charge}
          onChange={handleChange}
        />

        {/* Documentation Charge */}
        <Input
          label="Documentation Charge"
          name="documentation_charge"
          type="number"
          value={formData.documentation_charge}
          onChange={handleChange}
        />

        {/* COE Status */}
        <Select
          label="COE Status"
          name="coe_status"
          value={formData.coe_status}
          onChange={handleChange}
          options={[
            { value: 0, label: "Pending" },
            { value: 1, label: "Approved" },
            { value: 2, label: "Rejected" },
          ]}
        />

        {/* Application Status */}
        <Select
          label="Application Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: "Pending", label: "Pending" },
            { value: "Interview", label: "Interview" },
            { value: "Approved", label: "Approved" },
            { value: "Rejected", label: "Rejected" },
          ]}
        />
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          className="bg-orange-500 text-white px-5 py-2 rounded-lg"
        >
          Save Changes
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
  );
}

/* 🔹 Reusable Input */
function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  );
}

/* 🔹 Reusable Select */
function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}