import { useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  MapPin,
  Briefcase,
  ArrowLeft,
  BadgeCheck,
  Building2,
  CreditCard,
  FileText,
} from "lucide-react";

export default function EmployeeView() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 🔹 Demo Data (used if no real data is passed)
  const demoEmployee = {
    name: "Sujan Adhikari",
    phone: "98XXXXXXXX",
    address: "Pokhara, Nepal",
    designation: "Counselor",
    pan: "PAN123456",
    citizenship: "Scan Attached",
    branch_name: "Pokhara Branch",
    monthly_salary: "35,000",
    remarks: "Excellent communication skills",
  };

  const employee = state || demoEmployee;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <User className="text-blue-600" />
            <h2 className="text-2xl font-bold">
              {employee.name}
            </h2>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Personal Info */}
          <div className="bg-gray-50 rounded-xl p-5 hover:shadow transition">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <BadgeCheck size={18} className="text-green-600" />
              Personal Information
            </h3>

            <div className="space-y-3 text-gray-700">
              <p className="flex items-center gap-2">
                <Phone size={16} /> {employee.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> {employee.address}
              </p>
            </div>
          </div>

          {/* Job Info */}
          <div className="bg-gray-50 rounded-xl p-5 hover:shadow transition">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Briefcase size={18} className="text-orange-600" />
              Job Information
            </h3>

            <div className="space-y-3 text-gray-700">
              <p><b>Designation:</b> {employee.designation}</p>
              <p className="flex items-center gap-2">
                <Building2 size={16} /> {employee.branch_name}
              </p>
              <p className="flex items-center gap-2">
                <CreditCard size={16} /> Salary: Rs. {employee.monthly_salary}
              </p>
            </div>
          </div>

          {/* Documents Info */}
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-200 hover:shadow transition md:col-span-2">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-blue-700">
              <FileText size={18} />
              Documents
            </h3>

            <div className="space-y-3 text-gray-700">
              <p><b>PAN:</b> {employee.pan}</p>
              <p><b>Citizenship / Academic:</b> {employee.citizenship}</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 bg-gray-50 rounded-xl p-5 hover:shadow transition">
          <h3 className="font-semibold mb-2">Remarks</h3>
          <p>{employee.remarks}</p>
        </div>

      </div>
    </div>
  );
}
