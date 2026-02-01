import { MapPin, Phone, Briefcase, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmployeeCard({ employee }) {
  const navigate = useNavigate();

  const demoEmployee = {
    name: "Ramesh Adhikari",
    phone: "9812345678",
    address: "Pokhara",
    shift: "10:00 AM - 6:00 PM",
    role: "Visa Officer",
    status: "Active",
  };

  const data = employee || demoEmployee;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Employee Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card */}
        <div
          onClick={() => navigate("/employee_view", { state: data })}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {data.name}
            </h3>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
              {data.status}
            </span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            {/* Phone */}
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-orange-600" />
              <span>{data.phone}</span>
            </div>

            {/* Address */}
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-orange-600" />
              <span>{data.address}</span>
            </div>

            {/* Shift */}
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-orange-600" />
              <span>{data.shift}</span>
            </div>

            {/* Role */}
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-orange-600" />
              <span>{data.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
