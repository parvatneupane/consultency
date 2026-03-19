import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate , useLocation } from "react-router-dom";

import PersonalInfoTab from "./PersonalInfoTab";
import ApplicationInfoTab from "./ApplicationInfoTab";
import DocumentsTab from "./DocumentsTab";
import COEStatusTab from "./COEStatusTab";

export default function ApplicantView( ) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");

   const location = useLocation();
  const applicant = location.state; 


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

{applicant?.applicants ? (
  <>
    {activeTab === "documents" && <DocumentsTab applicant={applicant} />}
    {activeTab === "coe" && <COEStatusTab applicant={applicant} />}
  </>
) : (
  (activeTab === "documents" || activeTab === "coe") && (
    <div className="p-3 mb-3 rounded-md bg-yellow-100 text-yellow-800 border border-yellow-300">
      First add the applicant data.
    </div>
  )
)}




    </div>
  );
}