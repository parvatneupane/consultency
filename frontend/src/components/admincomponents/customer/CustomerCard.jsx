import { Phone, MapPin, BookOpen, Clock, Eye, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../../api";
import { toast } from "react-toastify";
import DropoutModal from "./DropoutModal";

export default function CustomerCard({ customer, refresh }) {

  const navigate = useNavigate();
  const data = customer;

  const [showDropoutModal, setShowDropoutModal] = useState(false);

  // Convert to applicant
  const handleConvert = async (e) => {

    e.stopPropagation();

    const confirmConvert = window.confirm(
      "Do you want to convert this customer to applicant?"
    );

    if (!confirmConvert) return;

    try {

      const token = localStorage.getItem("auth_token");

      await api.post(
        `/api/customers/approve-to-applicant/${data.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refresh();
      toast.success("Customer converted to applicant successfully!");

    } catch (error) {

      console.error(error);
      toast.error("Failed to convert customer.");

    }
  };

  return (

    <>
    
    <div
      onClick={() => navigate("/customer_view", { state: data })}
      className="group cursor-pointer bg-white rounded-2xl shadow-lg border border-gray-100 p-6
      hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-56 w-80"
    >

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

      {/* Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">

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

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center">

        {/* LEFT SIDE BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDropoutModal(true);
          }}
          className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700 hover:bg-red-200"
        >
          Dropout Student
        </button>

        <div className="flex gap-2">

          <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700">
            View Profile
          </span>

          <button
            onClick={handleConvert}
            className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
          >
            Convert to Applicant
          </button>

        </div>

      </div>

    </div>

    {/* Dropout Modal */}
    {showDropoutModal && (
      <DropoutModal
        customerId={data.id}
        refresh={refresh}
        onClose={() => setShowDropoutModal(false)}
      />
    )}

    </>
  );
}