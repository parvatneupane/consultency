import { useState } from "react";

export default function AddEmployeeForm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-purple-100 flex items-center justify-center px-4 py-10">

      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-8 border border-gray-100 transition-transform hover:scale-[1.01]">

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Employee
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Employee Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Employee Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200 hover:border-blue-400"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200 hover:border-blue-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200 hover:border-blue-400"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200 hover:border-blue-400"
            />
          </div>

          {/* Branch Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Branch Name
            </label>
            <input
              type="text"
              name="branch_name"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200 hover:border-blue-400"
            />
          </div>

          {/* Monthly Salary */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Monthly Salary
            </label>
            <input
              type="number"
              name="monthly_salary"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200 hover:border-blue-400"
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Remarks
            </label>
            <input
              type="text"
              name="remarks"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200 hover:border-blue-400"
            />
          </div>

          {/* PAN Scan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              PAN Scan Attached
            </label>
            <input
              type="file"
              name="pan"
              required
              className="w-full px-3 py-2 rounded-xl border border-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              transition"
            />
          </div>

          {/* Citizenship / Academic Scan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Citizenship / Academic Scan
            </label>
            <input
              type="file"
              name="document"
              required
              className="w-full px-3 py-2 rounded-xl border border-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-50 file:text-purple-700
              hover:file:bg-purple-100
              transition"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-6">
            <button
              type="reset"
              className="px-6 py-2.5 rounded-xl border border-gray-400 text-gray-700
              hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            >
              Reset
            </button>

            <button
              type="submit"
              className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600
              text-white font-semibold shadow-lg
              hover:from-blue-700 hover:to-purple-700
              transition-all duration-200 hover:scale-105 disabled:opacity-50"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
