import { GraduationCap } from 'lucide-react';

export default function DashboardCarts({head,desc,count,icon}) {
    return(

     
<div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">

  <div className="bg-gray-50 group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 overflow-hidden transform hover:-translate-y-1 min-w-[320px]">

    {/* Gradient Accent Bar */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

    <div className="flex items-center justify-between mb-4">
      <h4 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition break-words">
        {head}
      </h4>

      <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
        Live
      </span>
    </div>

    <p className="text-sm text-gray-600 mb-4 break-words">
      {desc}
    </p>

    <div className="flex justify-between items-center">
      <span className="text-3xl font-extrabold text-gray-900 group-hover:text-purple-600 transition break-all">
        {count}
      </span>

      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shrink-0">
        {icon}
      </div>
    </div>

  </div>

</div>
 
    );
}