import { GraduationCap } from 'lucide-react';

export default function DashboardCarts({ head, desc, count, icon, increase }) {
  return (

    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 relative overflow-hidden">

      {/* Gradient top line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-800">
          {head}
        </h4>

        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          Live
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        {desc}
      </p>

      <div className="flex justify-between items-center">

        <div>
          <span className="text-3xl font-extrabold text-gray-900">
            {count}
          </span>

          {increase !== undefined && (
            <p className={`text-sm mt-1 ${increase >= 0 ? "text-green-600" : "text-red-600"}`}>
              {increase >= 0 ? "+" : ""}{increase} from last month
            </p>
          )}
        </div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
          {icon}
        </div>

      </div>

    </div>

  );
}