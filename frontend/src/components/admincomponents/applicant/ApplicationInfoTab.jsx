import { useState } from "react";
import ApplicationInfoForm from "./ApplicationInfoForm";

export default function ApplicationInfoTab({ applicant }) {
  const [editMode, setEditMode] = useState(false);

  // 🔥 If in edit mode → show form
  if (editMode) {
    return (
      <ApplicationInfoForm
        applicant={applicant}
        onCancel={() => setEditMode(false)}
        onSubmit={(data) => {
          console.log("Updated Data:", data);

          // 🔥 Later you connect PUT API here
          setEditMode(false);
        }}
      />
    );
  }

  // 🔥 Otherwise show normal view
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-semibold mb-6">
        Application Details
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Info label="Applied City" value={applicant?.applied_city ?? "null"} />
        <Info label="Applied College" value={applicant?.applied_colllege ?? "null"} />
        <Info label="Intake" value={applicant?.intake ?? "null"} />
        <Info label="COE Charge" value={applicant?.coe_charge != null ? `Rs. ${applicant.coe_charge}` : "null"} />
        <Info
          label="Documentation Charge"
          value={applicant?.documentation_charge != null ? `Rs. ${applicant.documentation_charge}` : "null"}
        />
        <Info label="COE Status" value={statusLabel(applicant?.coe_status)} />
        <Info label="Application Status" value={applicant?.status ?? "null"} />
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setEditMode(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Add Changes
        </button>
      </div>
    </div>
  );
}

/* 🔹 Reusable Info Component */
function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

/* 🔹 Helper function for COE Status */
function statusLabel(coe_status) {
  switch (coe_status) {
    case 0:
      return "Pending";
    case 1:
      return "Approved";
    case 2:
      return "Rejected";
    case null:
    case undefined:
      return "null";
    default:
      return coe_status;
  }
}