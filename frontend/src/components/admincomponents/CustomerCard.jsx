import { Phone, MapPin, BookOpen, Clock, Eye, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CustomerCard({ customer }) {
  const navigate = useNavigate();



  const data = customer || demoCustomer;

  return (
    <div
      onClick={() => navigate("/customer_view", { state: data })}
      className=" group cursor-pointer bg-white rounded-2xl shadow-lg border border-gray-100 p-6
      hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-56 w-80"
    >
      {/* Glow Accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100/40 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

      {/* Header */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <User className="text-orange-600" size={18} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {data.name}
          </h3>
        </div>

        <Eye className="text-orange-500 group-hover:scale-110 transition" size={20} />
      </div>

      {/* Info Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-orange-600" />
          <span>{data.phone}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-orange-600" />
          <span>{data.address}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} className="text-orange-600" />
          <span>{data.study_time}</span>
        </div>

        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-orange-600" />
          <span>{data.course}</span>
        </div>
      </div>

      {/* Footer Badge */}
      <div className="relative mt-4 flex justify-end">
        <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700">
          View Profile
        </span>
      </div>
    </div>
  );
}
