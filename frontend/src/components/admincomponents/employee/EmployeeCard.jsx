import { Phone, MapPin, Briefcase, Hotel } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmployeeCard({ employee ,users }) {
  const navigate = useNavigate();
  const data = employee;
// console.log(users);
  return (
    <div
      onClick={() => navigate("/employee_view", { state: data })}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{data.name}</h3>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
          Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <div className="flex items-center gap-2">
          <Phone size={18} className="text-orange-600" />
          <span>{data.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-orange-600" />
          <span>{data.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Hotel  size={18} className="text-orange-600" />
         
          <span>{data.user.name || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase size={18} className="text-orange-600" />
          <span>{data.designation}</span>
        </div>
      </div>
    </div>
  );
}
