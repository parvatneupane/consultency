import { useState } from "react";
import api from "../../../api";
import { toast } from "react-toastify";

export default function DropoutModal({ customerId, onClose, refresh }) {

  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (!remarks.trim()) {
      toast.error("Remarks are required");
      return;
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("auth_token");

      await api.post(
        `/api/customers/convert-to-dropout/${customerId}`,
        { remarks },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Customer converted to dropout");

    refresh(customerId);
    onClose();

    } catch (error) {

      console.error(error);
      toast.error("Failed to convert customer");

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-96 shadow-xl">

        <h2 className="text-lg font-semibold mb-4">
          Dropout Student
        </h2>

        <textarea
          placeholder="Enter remarks..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full border rounded-lg p-3 h-24 mb-4"
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            {loading ? "Processing..." : "OK"}
          </button>

        </div>

      </div>

    </div>
  );
}