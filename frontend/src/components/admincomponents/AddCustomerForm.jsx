import { useState } from "react";
import { Users,Plus } from 'lucide-react';
export default function AddCustomerForm() {

    const [isReferred, setIsReferred] = useState("no");
const [referralType, setReferralType] = useState("");

  return (

    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Add Customer 
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Customer Name */}
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              name="c_name"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>


          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="c_email"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="c_address"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="c_phone"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Father Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Father Name
            </label>
            <input
              type="text"
              name="fathername"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Mother Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mother Name
            </label>
            <input
              type="text"
              name="mothername"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Father Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Father Phone
            </label>
            <input
              type="text"
              name="fatherphone"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Mother Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mother Phone
            </label>
            <input
              type="text"
              name="motherphone"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
              

          {/* Gender */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="male" className="accent-blue-500" />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="female" className="accent-blue-500" />
                Female
              </label>
            </div>
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Education
            </label>
            <select
              name="education"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="see">SEE</option>
              <option value="+2">+2</option>
              <option value="bachelor">Bachelor</option>
              <option value="master">Master</option>
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choosing Course
            </label>
            <select
              name="course"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="studentvisa">Student Visa</option>
              <option value="ssw">SSW</option>
              <option value="japanese">Japanese</option>
            </select>
          </div>

          {/* Study Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Desire Study Time
            </label>
            <select
              name="studytime"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="morning">Morning</option>
              <option value="day">Day</option>
              <option value="evening">Evening</option>
            </select>
          </div>

          {/* Desire City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Desire City
            </label>
            <input
              type="text"
              name="desirecity"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

         
{/* Referral Question */}
<div className="md:col-span-2">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Did you come through a referral?
  </label>

  <div className="flex gap-6">
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="isReferred"
        value="no"
        checked={isReferred === "no"}
        onChange={() => setIsReferred("no")}
        className="accent-blue-500"
      />
      No
    </label>

    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="isReferred"
        value="yes"
        checked={isReferred === "yes"}
        onChange={() => setIsReferred("yes")}
        className="accent-blue-500"
      />
      Yes
    </label>
  </div>
</div>

        {isReferred === "yes" && (
        <div className="md:col-span-2 bg-blue-50 border border-blue-200 rounded-lg p-4">

            <h3 className="text-md font-semibold mb-3 text-blue-700">
            Referral Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Referral Type */}
            <div>
                <label className="block text-sm font-medium mb-1">
                Referral Type
                </label>
                <select
                value={referralType}
                onChange={(e) => setReferralType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                <option value="">Select Type</option>
                <option value="friend">Friend</option>
                <option value="relative">Relative</option>
                <option value="senior_teacher">Senior Teacher</option>
                </select>
            </div>

            {/* Referral Name */}
            <div>
                <label className="block text-sm font-medium mb-1">
                Referral Person Name
                </label>
                <input
                type="text"
                name="referral_name"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter name"
                />
            </div>

            {/* Referral Mobile */}
            <div>
                <label className="block text-sm font-medium mb-1">
                Referral Mobile Number
                </label>
                <input
                type="text"
                name="referral_mobile"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="98XXXXXXXX"
                />
            </div>

            </div>
        </div>
        )}



          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <input
              type="text"
              name="remarks"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Follow Up */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Follow Up
            </label>
            <textarea
              name="followup"
              rows="3"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="reset"
              className="px-6 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
