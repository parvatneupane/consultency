import { MapPin, Clock, Eye, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DropoutModal from "../customer/DropoutModal";

export default function ApplicantsTable({ applicants, refresh }) {
  const navigate = useNavigate();
  const [showDropoutModal, setShowDropoutModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
      <table className="min-w-full table-auto text-sm text-gray-700">
        <thead className="bg-orange-50 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-4 text-left font-semibold">Applicant</th>
            <th className="px-6 py-4 text-left font-semibold">Branch</th>
            <th className="px-6 py-4 text-left font-semibold">Address</th>
            <th className="px-6 py-4 text-left font-semibold">Applied City</th>
            <th className="px-6 py-4 text-left font-semibold">Applied College</th>
            <th className="px-6 py-4 text-left font-semibold">Intake</th>
            <th className="px-6 py-4 text-left font-semibold">COE Status</th>
            <th className="px-6 py-4 text-center font-semibold">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {applicants.length > 0 ? (
            applicants.map((applicant) => (
              <tr
                key={applicant.id}
                className="hover:bg-orange-50/40 transition cursor-pointer"
                onClick={() => navigate("/applicant_view", { state: applicant })}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-orange-100">
                      <User size={14} className="text-orange-600" />
                    </span>
                    <span className="font-medium text-gray-900">
                      {applicant.name || "N/A"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-orange-600" />
                    <span>{applicant.user?.name || "N/A"}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-orange-600" />
                    <span className="truncate max-w-[150px]">
                      {applicant.address || "N/A"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {applicant.applicants?.applied_city || "N/A"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {applicant.applicants?.applied_college || "N/A"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {applicant.applicants?.intake || "N/A"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {applicant.applicants?.coe?.status || "N/A"}
                </td>

                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/applicant_view", { state: applicant });
                      }}
                      className="p-2 hover:bg-orange-100 rounded-full"
                    >
                      <Eye size={18} className="text-orange-500" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedApplicant(applicant.id);
                        setShowDropoutModal(true);
                      }}
                      className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                    >
                      Dropout
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                No applicants found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showDropoutModal && (
        <DropoutModal
          customerId={selectedApplicant}
          refresh={refresh}
          onClose={() => setShowDropoutModal(false)}
        />
      )}
    </div>
  );
}