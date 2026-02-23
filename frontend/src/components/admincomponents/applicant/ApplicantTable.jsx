import { Phone, MapPin, BookOpen, Clock, Eye, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ApplicantsTable({ applicants }) {
  const navigate = useNavigate();

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Interview: "bg-blue-100 text-blue-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
      <table className="min-w-full table-auto text-sm text-gray-700">
        {/* Table Header */}
        <thead className="bg-orange-50 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-4 text-left font-semibold">Applicant</th>
            <th className="px-6 py-4 text-left font-semibold">Phone</th>
            <th className="px-6 py-4 text-left font-semibold">Address</th>
            <th className="px-6 py-4 text-left font-semibold">Study Time</th>
            <th className="px-6 py-4 text-left font-semibold">Course</th>
            <th className="px-6 py-4 text-left font-semibold">Status</th>
            <th className="px-6 py-4 text-center font-semibold">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-100">
          {applicants && applicants.length > 0 ? (
            applicants.map((applicant) => (
              <tr
                key={applicant.id}
                className="hover:bg-orange-50/40 transition cursor-pointer"
                onClick={() => navigate("/applicant_view", { state: applicant })}
              >
                {/* Applicant */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-orange-100">
                      <User size={14} className="text-orange-600" />
                    </span>
                    <span className="font-medium text-gray-900">{applicant.name || "N/A"}</span>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-orange-600 flex-shrink-0" />
                    <span>{applicant.phone || "N/A"}</span>
                  </div>
                </td>

                {/* Address */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-orange-600 flex-shrink-0" />
                    <span className="truncate max-w-[150px]">{applicant.address || "N/A"}</span>
                  </div>
                </td>

                {/* Study Time */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-orange-600 flex-shrink-0" />
                    <span>{applicant.study_time || "N/A"}</span>
                  </div>
                </td>

                {/* Course */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-orange-600 flex-shrink-0" />
                    <span>{applicant.course || "N/A"}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      statusStyles[applicant.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {applicant.status || "Pending"}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/applicant_view", { state: applicant });
                    }}
                    className="p-2 hover:bg-orange-100 rounded-full transition-colors"
                  >
                    <Eye size={18} className="text-orange-500 hover:scale-110 transition" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                No applicants found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}