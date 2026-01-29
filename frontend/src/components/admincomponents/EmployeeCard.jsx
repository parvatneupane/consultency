import {  MapPin, Phone,Mail,Briefcase,Clock }  from "lucide-react";
export default function EmployeeCard(){
return(

    <div className="p-6">
  <h2 className="text-2xl font-bold mb-6">Employee Details</h2>

  {/* Grid Container */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Employee Card */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Ramesh Adhikari
        </h3>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
          Active
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        
        <div className="flex items-center gap-2">
          <Phone size={18} className="text-orange-600" />
          <span>9812345678</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-orange-600" />
          <span>Pokhara</span>
        </div>

        <div className="flex items-center gap-2">
          <Briefcase size={18} className="text-orange-600" />
          <span>Visa Officer</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={18} className="text-orange-600" />
          <span>10:00 AM - 6:00 PM</span>
        </div>

        <div className="flex items-center gap-2 sm:col-span-2">
          <Mail size={18} className="text-orange-600" />
          <span>ramesh@consultancy.com</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 transition">
          Edit
        </button>
        <button className="px-4 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition">
          Delete
        </button>
      </div>
    </div>

  </div>
</div>

);
    
}