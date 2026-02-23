import { useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  MapPin,
  Briefcase,
  ArrowLeft,
  BadgeCheck,
  FileText,
  Trash2,
  Edit2,
  Building,

  FileSignature,
  Calendar,
  Mail,
  Download,
  ExternalLink,
} from "lucide-react";

import { useEffect, useState } from "react";
import api from "../../../api";
import SalaryForm from "./SalaryForm";

export default function EmployeeDetailView() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const employee = state;

  const [branchName, setBranchName] = useState("");
  const [panPreview, setPanPreview] = useState(null);
  const [docPreview, setDocPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("auth_token");

  // Fetch branch name if branch_id exists
  useEffect(() => {
    if (!employee?.branch_id || !token) return;

    const fetchBranchName = async () => {
      try {
        const response = await api.get(
          `api/employees/branches/${employee.branch_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBranchName(response.data?.name || "");
      } catch (err) {
        console.error("Failed to fetch branch info", err);
      }
    };
    fetchBranchName();
  }, [employee?.branch_id, token]);

  // Set previews for PAN and Document (use storage URL)
  useEffect(() => {
    if (employee?.pan_scan) {
      setPanPreview(`http://localhost:8000/storage/${employee.pan_scan}`);
    }
    if (employee?.document_scan) {
      setDocPreview(`http://localhost:8000/storage/${employee.document_scan}`);
    }
  }, [employee]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    setLoading(true);
    try {
      await api.delete(`/api/employees/${employee.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Employee deleted successfully!");
      navigate("/employee");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete employee.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
<div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
  <div className="bg-blue-600 px-6 py-4">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-blue-500 p-3 rounded-lg">
          <User className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {employee.name}
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            Employee ID: {employee.employee_id || "N/A"}
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => navigate("/employee_edit", { state: employee })}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 
                   rounded-lg font-medium hover:bg-blue-50 transition-colors
                   focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <Edit2 size={18} />
          Edit
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 
                   text-white rounded-lg font-medium hover:bg-red-600 
                   transition-colors disabled:opacity-50 
                   disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <Trash2 size={18} />
          {loading ? "Deleting..." : "Delete"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 
                   text-blue-700 rounded-lg font-medium hover:bg-blue-200 
                   transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>
    </div>
  </div>
</div>


        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-green-600 px-4 py-3">
                <h3 className="font-medium text-white flex items-center gap-2">
                  <BadgeCheck size={18} />
                  Personal Information
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3 border-b border-gray-100 pb-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Phone size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="font-medium">{employee.phone || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 border-b border-gray-100 pb-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Mail size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">{employee.email || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <MapPin size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="font-medium">{employee.address || "Not provided"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-green-600 px-4 py-3">
                <h3 className="font-medium text-white flex items-center gap-2">
                  <FileText size={18} />
                  Documents
                </h3>
              </div>
              <div className="p-4 space-y-4">
                {/* PAN Card */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">PAN Card</p>
                    {panPreview && (
                      <button
                        onClick={() => handleDownload(panPreview, 'pan_card.pdf')}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Download size={16} />
                      </button>
                    )}
                  </div>
                  {panPreview ? (
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <iframe
                        src={panPreview}
                        className="w-full h-40 bg-gray-50"
                        title="PAN Preview"
                      />
                      <div className="p-2 bg-gray-50 border-t border-gray-200 flex justify-end">
                        <a
                          href={panPreview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 text-sm flex items-center gap-1 hover:underline"
                        >
                          <ExternalLink size={14} />
                          Open full screen
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">No PAN card uploaded</p>
                  )}
                </div>

                {/* Document */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Document</p>
                    {docPreview && (
                      <button
                        onClick={() => handleDownload(docPreview, 'document.pdf')}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Download size={16} />
                      </button>
                    )}
                  </div>
                  {docPreview ? (
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <iframe
                        src={docPreview}
                        className="w-full h-40 bg-gray-50"
                        title="Document Preview"
                      />
                      <div className="p-2 bg-gray-50 border-t border-gray-200 flex justify-end">
                        <a
                          href={docPreview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 text-sm flex items-center gap-1 hover:underline"
                        >
                          <ExternalLink size={14} />
                          Open full screen
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">No document uploaded</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Job Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-green-600 px-4 py-3">
                <h3 className="font-medium text-white flex items-center gap-2">
                  <Briefcase size={18} />
                  Employment Details
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="border-b border-gray-100 pb-2">
                  <p className="text-xs text-gray-500 mb-1">Designation</p>
                  <p className="font-medium text-gray-800">
                    {employee.designation || "Not specified"}
                  </p>
                </div>
                
                <div className="border-b border-gray-100 pb-2">
                  <p className="text-xs text-gray-500 mb-1">Monthly Salary</p>
                  <p className="font-medium text-gray-800 flex items-center gap-1">
                   
                    {employee.monthly_salary 
                      ? `$ ${employee.monthly_salary.toLocaleString()}`
                      : "Not specified"}
                  </p>
                </div>
                
                <div className="border-b border-gray-100 pb-2">
                  <p className="text-xs text-gray-500 mb-1">Branch</p>
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    <Building size={16} className="text-green-600" />
                    {employee.user?.name || branchName || "Loading..."}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 mb-1">Remarks</p>
                  <p className="text-gray-700 bg-gray-50 p-2 rounded">
                    {employee.remarks || "No remarks added"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Salary Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-green-600 px-4 py-3">
                <h3 className="font-medium text-white flex items-center gap-2">
                 
                  Salary Management
                </h3>
              </div>
              <div className="p-4">
                <SalaryForm employee={employee} />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        {(employee.created_at || employee.updated_at) && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              {employee.created_at && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-green-600" />
                  <span>Created: {new Date(employee.created_at).toLocaleDateString()}</span>
                </div>
              )}
              {employee.updated_at && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-green-600" />
                  <span>Last Updated: {new Date(employee.updated_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}