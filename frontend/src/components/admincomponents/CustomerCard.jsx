import { Phone, MapPin, BookOpen, Clock, UserCheck } from "lucide-react";
export default function CustomerCard() {
    return (
<div className="p-6">
  <h2 className="text-2xl font-bold mb-6">Customer Details</h2>

  {/* Grid Container */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Customer Card */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Parvat
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <div className="flex items-center gap-2">
          <Phone size={18} className="text-orange-600" />
          <span>9845268281</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-orange-600" />
          <span>Gaindakot</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={18} className="text-orange-600" />
          <span>Morning</span>
        </div>

        <div className="flex items-center gap-2">
          <BookOpen size={18} className="text-orange-600" />
          <span>Korean Language</span>
        </div>

        <div className="flex items-center gap-2 sm:col-span-2">
          <UserCheck size={18} className="text-orange-600" />
          <span>Gaindakot</span>
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

