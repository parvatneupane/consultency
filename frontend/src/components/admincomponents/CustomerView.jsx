import { useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  MapPin,
  BookOpen,
  Clock,
  Users,
  ArrowLeft,
  BadgeCheck,
} from "lucide-react";

export default function CustomerView() {
  const { state } = useLocation();
  const navigate = useNavigate();



  const customer = state;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <User className="text-blue-600" />
            <h2 className="text-2xl font-bold">
              {customer.name}
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
                <Mail size={16} /> {customer.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} /> {customer.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> {customer.address}
              </p>
              <p>
                <b>Gender:</b> {customer.gender}
              </p>
            </div>
          </div>

          {/* Academic Info */}
          <div className="bg-gray-50 rounded-xl p-5 hover:shadow transition">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-orange-600" />
              Academic Information
            </h3>

            <div className="space-y-3 text-gray-700">
              <p><b>Education:</b> {customer.education}</p>
              <p className="flex items-center gap-2">
                <Clock size={16} /> {customer.study_time}
              </p>
              <p><b>Course:</b> {customer.course}</p>
              <p><b>Desired City:</b> {customer.desire_city}</p>
            </div>
          </div>

          {/* Family Info */}
          <div className="bg-gray-50 rounded-xl p-5 hover:shadow transition">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Users size={18} className="text-purple-600" />
              Family Information
            </h3>

            <div className="space-y-3 text-gray-700">
              <p><b>Father:</b> {customer.father_name}</p>
              <p><b>Father Phone:</b> {customer.father_phone}</p>
              <p><b>Mother:</b> {customer.mother_name}</p>
              <p><b>Mother Phone:</b> {customer.mother_phone}</p>
            </div>
          </div>

          {/* Referral Info */}
          {customer.isReferred === "yes" && (
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200 hover:shadow transition">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-blue-700">
                <Users size={18} />
                Referral Information
              </h3>

              <div className="space-y-3 text-gray-700">
                <p><b>Type:</b> {customer.referralType}</p>
                <p><b>Name:</b> {customer.referral_name}</p>
                <p><b>Mobile:</b> {customer.referral_mobile}</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-6 bg-gray-50 rounded-xl p-5 hover:shadow transition">
          <h3 className="font-semibold mb-2">Remarks & Follow Up</h3>
          <p><b>Remarks:</b> {customer.remarks}</p>
          <p><b>Follow Up:</b> {customer.followup}</p>
        </div>

      </div>
    </div>
  );
}
