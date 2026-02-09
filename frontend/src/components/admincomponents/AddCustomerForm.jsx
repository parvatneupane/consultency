import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import api from "../../api";

import { Users,Plus } from 'lucide-react';
export default function AddCustomerForm() {

const [isReferred, setIsReferred] = useState("no");
const [referralType, setReferralType] = useState("");
const [loading, setLoading] = useState(false);
const token = localStorage.getItem("auth_token");



const handleaddcustomer = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.target);
  const token = localStorage.getItem("auth_token");

  const customerData = {
    name: formData.get("name"),
    email: formData.get("email"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    father_name: formData.get("father_name"),
    mother_name: formData.get("mother_name"),
    father_phone: formData.get("father_phone"),
    mother_phone: formData.get("mother_phone"),
    gender: formData.get("gender"),
    education: formData.get("education"),
    course: formData.get("course"),
    study_time: formData.get("study_time"),
    desire_city: formData.get("desire_city"),
    remarks: formData.get("remarks"),

    referral_type: isReferred === "yes" ? referralType : null,
    referral_name:
      isReferred === "yes" ? formData.get("referral_name") : null,
    referral_phone:
      isReferred === "yes" ? formData.get("referral_phone") : null,
  };

  try {
const response = await api.post(
  "api/customers",
  customerData, 
  {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
);


    toast.success("Customer added successfully 🎉");
    e.target.reset();
    setIsReferred("no");
    setReferralType("");
  } catch (error) {
    toast.error(error.message || "Something went wrong ❌");
  } finally {
    setLoading(false);
  }
};



  return (




<div className="min-h-screen bg-gray-100 flex items-center justify-center pl-6">
  <ToastContainer />
  <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8">



        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleaddcustomer}>

          {/* Customer Name */}
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <input type="text"
              name="name"
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
              name="email"
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
              name="address"
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
              name="phone"
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
              name="father_name"
              
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
              name="mother_name"
              
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
              name="father_phone"
              
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
              name="mother_phone"
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
              name="study_time"
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
              name="desire_city"
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

            {/* Referral Phone */}
            <div>
                <label className="block text-sm font-medium mb-1">
                Referral Phone Number
                </label>
                <input
                type="text"
                name="referral_phone"
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
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Submit"}
          </button>

          </div>

        </form>
      </div>
    </div>
  );
}
