import { useState } from "react";

export default function COEStatusTab({ applicant }) {
  const approved = applicant.coe_final_status === 1;
  const [applyMode, setApplyMode] = useState(false);
  const [decision, setDecision] = useState(null); // "Accepted" | "Rejected"
  const [formData, setFormData] = useState({ reason: "", file: null });
  const [submittedData, setSubmittedData] = useState(null);

  const handleApply = (value) => {
    setDecision(value);
    if (value === "Accepted") {
      // Directly save accepted status
      setSubmittedData({ status: "Accepted" });
      setApplyMode(false);
    }
    // If Rejected, form will open
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.reason || !formData.file) {
      alert("Please provide reason and file.");
      return;
    }

    setSubmittedData({
      status: "Rejected",
      reason: formData.reason,
      file: formData.file.name,
    });

    setApplyMode(false);
    setDecision(null);
    setFormData({ reason: "", file: null });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border space-y-6">
      <h2 className="text-xl font-semibold mb-6">COE Status</h2>

      <div className="space-y-4">
        <Info label="COE File" value={applicant.coe_file ?? "null"} />
        <Info label="Remarks" value={applicant.coe_remarks ?? "null"} />
        <Info label="Status" value={approved ? "Approved" : "Pending"} />
      </div>

      {/* Study Details if approved */}
      {approved && (
        <div className="mt-6 p-4 bg-green-50 border rounded">
          <h3 className="font-semibold mb-3">Study Information</h3>
          <Info label="University City" value={applicant.applied_city ?? "null"} />
          <Info label="Current Living City" value={applicant.city ?? "null"} />
          <Info label="Email" value={applicant.email ?? "null"} />
          <Info label="Subject" value={applicant.subject ?? "null"} />
        </div>
      )}

      {/* Apply for COE */}
      {!submittedData && !approved && (
        <div className="mt-6">
          {!applyMode ? (
            <button
              onClick={() => setApplyMode(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              Apply for COE
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleApply("Accepted")}
              >
                Accepted
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleApply("Rejected")}
              >
                Rejected
              </button>
            </div>
          )}
        </div>
      )}

      {/* Rejected Form */}
      {decision === "Rejected" && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 border p-4 rounded bg-gray-50"
        >
          <h3 className="font-semibold text-lg">Provide Reason & Upload COE File</h3>

          <div>
            <label className="text-sm text-gray-600">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter reason"
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Upload File</label>
            <input
              type="file"
              name="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg">
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                setDecision(null);
                setApplyMode(false);
              }}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Show submitted data */}
      {submittedData && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold text-lg">COE Application Result</h3>
          <Info label="Status" value={submittedData.status} />
          {submittedData.reason && <Info label="Reason" value={submittedData.reason} />}
          {submittedData.file && <Info label="Uploaded File" value={submittedData.file} />}
        </div>
      )}
    </div>
  );
}

/* Reusable Info */
function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value ?? "null"}</p>
    </div>
  );
}