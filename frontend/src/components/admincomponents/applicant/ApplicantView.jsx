import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PersonalInfoTab from "./PersonalInfoTab";
import ApplicationInfoTab from "./ApplicationInfoTab";
import DocumentsTab from "./DocumentsTab";
import COEStatusTab from "./COEStatusTab";

export default function ApplicantView() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");

  const applicant = {
    id: 1,
    name: "Ram Sharma",
    phone: "9800000000",
    address: "Pokhara",
    email: "ram@gmail.com",
    city: "Kathmandu",
    subject: "BSc CSIT",

    applied_city: "Sydney",
    applied_colllege: "ABC College",
    coe_charge: 25000,
    documentation_charge: 5000,
    intake: "2025 March",
    status: "Pending",
    coe_status: 0,

    documents: [
      { id: 1, document_title: "Passport", status: 1 },
      { id: 2, document_title: "Transcript", status: 0 },
    ],

    coe_file: "coe.pdf",
    coe_remarks: "Waiting for confirmation",
    coe_final_status: 0,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-orange-500 mb-4"
      >
        <ArrowLeft /> Back
      </button>

      {/* Top Tabs */}
      <div className="flex gap-6 border-b mb-6">
        {[
          { key: "personal", label: "Personal Info" },
          { key: "application", label: "Application" },
          { key: "documents", label: "Documents" },
          { key: "coe", label: "COE Status" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 ${
              activeTab === tab.key
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "personal" && (
        <PersonalInfoTab applicant={applicant} />
      )}
      {activeTab === "application" && (
        <ApplicationInfoTab applicant={applicant} />
      )}
      {activeTab === "documents" && (
        <DocumentsTab applicant={applicant} />
      )}
      {activeTab === "coe" && (
        <COEStatusTab applicant={applicant} />
      )}
    </div>
  );
}