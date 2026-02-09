import { useLocation, useNavigate } from "react-router-dom";
import CustomerFollowup from "./CustomerFollowup";
import { useState } from "react";
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
  Trash2,
  Edit,

} from "lucide-react";

export default function CustomerView() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const customer = state;



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-xl">
            <User className="text-blue-600" size={26} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {customer.name}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Edit Button */}
        <button
              onClick={() => navigate("/customer_edit", { state: customer })}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
                        bg-gradient-to-r from-yellow-400 to-yellow-500 
                        text-white font-medium shadow-md 
                        hover:shadow-lg hover:from-yellow-500 hover:to-yellow-600 
                        active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <BadgeCheck size={18} />
              Edit
            </button>


          {/* Delete Button */}
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this customer?")) {
                console.log("Delete customer:", customer.id);
                navigate(-1);
              }
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
            bg-gradient-to-r from-red-500 to-red-600 
            text-white font-medium shadow-md 
            hover:shadow-lg hover:from-red-600 hover:to-red-700 
            active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <Trash2 size={18} />
            Delete
          </button>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
            border border-gray-300 text-gray-700 font-medium 
            bg-white shadow-sm 
            hover:bg-gray-50 hover:shadow-md 
            active:scale-95 transition-all duration-150 
            focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>
      </div>



        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Personal Info */}
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition">
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
              <p><b>Gender:</b> {customer.gender}</p>
            </div>
          </div>

          {/* Academic Info */}
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition">
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
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition">
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
          {customer.referral_type  && (
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-blue-700">
                <Users size={18} />
                Referral Information
              </h3>

              <div className="space-y-3 text-gray-700">
                <p><b>Type:</b> {customer.referral_type}</p>
                <p><b>Name:</b> {customer.referral_name}</p>
                <p><b>Mobile:</b> {customer.referral_phone}</p>
              </div>
            </div>
          )}
        </div>
               <div className="space-y-3 text-gray-700">
                <p><b>Remarks:</b> {customer.remarks}</p>
                
              </div>
       

       
        <CustomerFollowup data ={customer.followup} cus_id={customer.id} />

      </div>
    </div>
  );
}
