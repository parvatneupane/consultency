import { useState } from "react";
import ApplicationInfoForm from "./ApplicationInfoForm";

export default function ApplicationInfoTab({ applicant }) {
  const [editMode, setEditMode] = useState(false);

  // If edit mode → show form
  if (editMode) {
    return (
      <ApplicationInfoForm
        applicant={applicant}
        onCancel={() => setEditMode(false)}
        onSubmit={(data) => {
          console.log("Updated Data:", data);
          setEditMode(false);
        }}
      />
    );
  }

  // Normal view
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-semibold mb-6">
        Application Details
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <p className="text-sm text-gray-500">Applied City</p>
          <p className="font-medium">
            {applicant.applicants?.applied_city || "null"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Applied College</p>
          <p className="font-medium">
            {applicant.applicants?.applied_college || "null"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Intake</p>
          <p className="font-medium">
            {applicant.applicants?.intake || "null"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">COE Charge</p>
          <p className="font-medium">
            {applicant.applicants?.coe_charge ? `Rs. ${applicant.applicants.coe_charge}` : "null"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Documentation Charge</p>
          <p className="font-medium">
            {applicant.applicants?.documentation_charge
              ? `Rs. ${applicant.applicants.documentation_charge}`
              : "null"}
          </p>
        </div>

      </div>

      <div className="mt-6">
        <button
          onClick={() => setEditMode(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
      </div>
    </div>
  );
}