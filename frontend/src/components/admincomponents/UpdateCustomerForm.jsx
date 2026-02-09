import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import api from "../../api";

export default function UpdateCustomerForm({ onUpdated }) {
  const { state } = useLocation(); 
  const customer = state;          
  const navigate = useNavigate();

  const [isReferred, setIsReferred] = useState("no");
  const [referralType, setReferralType] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    father_name: "",
    mother_name: "",
    father_phone: "",
    mother_phone: "",
    gender: "",
    education: "",
    course: "",
    study_time: "",
    desire_city: "",
    remarks: "",
    referral_name: "",
    referral_phone: "",
  });

  const token = localStorage.getItem("auth_token");

  // Load initial customer data
  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        email: customer.email || "",
        address: customer.address || "",
        phone: customer.phone || "",
        father_name: customer.father_name || "",
        mother_name: customer.mother_name || "",
        father_phone: customer.father_phone || "",
        mother_phone: customer.mother_phone || "",
        gender: customer.gender || "",
        education: customer.education || "",
        course: customer.course || "",
        study_time: customer.study_time || "",
        desire_city: customer.desire_city || "",
        remarks: customer.remarks || "",
        referral_name: customer.referral_name || "",
        referral_phone: customer.referral_phone || "",
      });

      if (customer.referral_type) {
        setIsReferred("yes");
        setReferralType(customer.referral_type);
      } else {
        setIsReferred("no");
        setReferralType("");
      }
    }
  }, [customer]);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      referral_type: isReferred === "yes" ? referralType : null,
      referral_name: isReferred === "yes" ? formData.referral_name : null,
      referral_phone: isReferred === "yes" ? formData.referral_phone : null,
    };

    try {
      await api.put(`api/customers/${customer.id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Customer updated successfully 🎉");
      setTimeout(() => navigate("/customer"), 1000);

      if (onUpdated) onUpdated(); 
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pl-6">
 <ToastContainer />
 <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
  {/* Header */}
  <div className="w-full max-w-3xl flex items-center justify-between mb-6">
    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 px-4 py-2 rounded-lg 
                 border border-gray-300 text-gray-700 font-medium 
                 bg-white shadow-sm 
                 hover:bg-gray-50 hover:shadow-md 
                 active:scale-95 transition-all duration-150 
                 focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      <ArrowLeft size={18} />
      Back
    </button>

    {/* Page Title */}
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
      Update Customer
    </h2>

    {/* Empty space for alignment */}
    <div className="w-24"></div>
  </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleUpdate}>
          {/* Customer Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Father Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Father Name
            </label>
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Mother Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Mother Name
            </label>
            <input
              type="text"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Father Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Father Phone
            </label>
            <input
              type="text"
              name="father_phone"
              value={formData.father_phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Mother Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Mother Phone
            </label>
            <input
              type="text"
              name="mother_phone"
              value={formData.mother_phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Gender */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                Female
              </label>
            </div>
          </div>

          {/* Education */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Education</label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
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
            <label className="text-sm font-medium text-gray-700 mb-1">Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="studentvisa">Student Visa</option>
              <option value="ssw">SSW</option>
              <option value="japanese">Japanese</option>
            </select>
          </div>

          {/* Study Time */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Desire Study Time</label>
            <select
              name="study_time"
              value={formData.study_time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="morning">Morning</option>
              <option value="day">Day</option>
              <option value="evening">Evening</option>
            </select>
          </div>

          {/* Desire City */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Desire City</label>
            <input
              type="text"
              name="desire_city"
              value={formData.desire_city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Referral Question */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-2">Did you come through a referral?</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
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
                  value="yes"
                  checked={isReferred === "yes"}
                  onChange={() => setIsReferred("yes")}
                  className="accent-blue-500"
                />
                Yes
              </label>
            </div>
          </div>

          {/* Referral Details */}
          {isReferred === "yes" && (
            <div className="md:col-span-2 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-md font-semibold mb-3 text-blue-700">Referral Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Referral Type</label>
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

                <div>
                  <label className="block text-sm font-medium mb-1">Referral Person Name</label>
                  <input
                    type="text"
                    name="referral_name"
                    value={formData.referral_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Referral Phone Number</label>
                  <input
                    type="text"
                    name="referral_phone"
                    value={formData.referral_phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    placeholder="98XXXXXXXX"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Remarks */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1">Remarks</label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button
            type="reset"
            onClick={() => {
                setFormData({
                name: customer.name || "",
                email: customer.email || "",
                address: customer.address || "",
                phone: customer.phone || "",
                father_name: customer.father_name || "",
                mother_name: customer.mother_name || "",
                father_phone: customer.father_phone || "",
                mother_phone: customer.mother_phone || "",
                gender: customer.gender || "",
                education: customer.education || "",
                course: customer.course || "",
                study_time: customer.study_time || "",
                desire_city: customer.desire_city || "",
                remarks: customer.remarks || "",
                referral_name: customer.referral_name || "",
                referral_phone: customer.referral_phone || "",
                });

                if (customer.referral_type) {
                setIsReferred("yes");
                setReferralType(customer.referral_type);
                } else {
                setIsReferred("no");
                setReferralType("");
                }
            }}
            className="px-6 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
            >
            Reset
            </button>


            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
