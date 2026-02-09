import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Plus, Edit, Trash2, MessageSquare, X } from "lucide-react";
import api from "../../api";

export default function CustomerFollowup({ data = [], cus_id }) {
  const [followUps, setFollowUps] = useState([]);

  // ADD FORM STATE
  const [addText, setAddText] = useState("");

  // UPDATE FORM STATE
  const [updateText, setUpdateText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("auth_token");

  // Sync props → state (defensive)
  useEffect(() => {
    if (Array.isArray(data)) {
      const filtered = data.filter(
        (item) => item?.cus_id === cus_id
      );
      setFollowUps(filtered);
    }
  }, [data, cus_id]);

  // ADD HANDLER
  const handleAdd = async () => {
    if (!addText.trim() || loading) return;

    if (followUps.length >= 3) {
      alert("Maximum 3 follow-ups allowed");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(
        "api/followup",
        {
          cus_id,
          message: addText,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Only add if backend returns valid model
      if (res.data?.data?.id) {
        toast.success("Follow-up added successfully");
        setFollowUps((prev) => [...prev, res.data.data]);
        setAddText("");
      }
    } catch (err) {
      console.error("Add error:", err);
      alert("Failed to add follow-up");
    } finally {
      setLoading(false);
    }
  };

  // LOAD INTO UPDATE FORM
  const handleEdit = (item) => {
    setEditingId(item.id);
    setUpdateText(item.message);
  };

  // UPDATE HANDLER
  const handleUpdate = async () => {
    if (!updateText.trim() || !editingId || loading) return;

    setLoading(true);

    try {
      const res = await api.put(
        `api/followup/${editingId}`,
        { message: updateText },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Only replace if backend returns valid model
      if (res.data?.data?.id) {
        setFollowUps((prev) =>
          prev.map((item) =>
            item.id === editingId ? res.data.data : item
          )
        );
        toast.success("Follow-up updated successfully");
      }

      setEditingId(null);
      setUpdateText("");
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // CANCEL UPDATE
  const handleCancelUpdate = () => {
    setEditingId(null);
    setUpdateText("");
  };

  // DELETE HANDLER
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this follow-up?") || loading) return;

    setLoading(true);

    try {
      await api.delete(`api/followup/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setFollowUps((prev) =>
        prev.filter((item) => item.id !== id)
      );

      toast.error("Follow-up deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-inner">
      <ToastContainer />
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-blue-700">
        <MessageSquare size={20} />
        Follow Ups (Max 3)
      </h3>

      {/* ================= ADD FORM ================= */}
      {!editingId && (
        <div className="flex gap-3 mb-6">
          <input
            value={addText}
            onChange={(e) => setAddText(e.target.value)}
            placeholder="Enter follow-up note..."
            className="flex-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            onClick={handleAdd}
            disabled={loading}
            className={`px-5 py-3 rounded-xl flex items-center gap-2 transition
              ${
                loading
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      )}

      {/* ================= UPDATE FORM ================= */}
      {editingId && (
        <div className="flex gap-3 mb-6 bg-yellow-50 p-4 rounded-xl border border-yellow-300">
          <input
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
            placeholder="Update follow-up..."
            className="flex-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-5 py-3 rounded-xl flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white transition"
          >
            <Edit size={18} />
            Update
          </button>

          <button
            onClick={handleCancelUpdate}
            disabled={loading}
            className="px-5 py-3 rounded-xl flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white transition"
          >
            <X size={18} />
            Cancel
          </button>
        </div>
      )}

      {/* ================= TIMELINE ================= */}
      <div className="space-y-4">
        {followUps.map((item, index) => (
          <div
            key={item.id}
            className="bg-white border-l-4 border-blue-500 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between"
          >
            <div>
              <p className="font-semibold text-blue-700">
                Follow Up {index + 1}
              </p>
              <p className="text-gray-700">{item.message}</p>
              <p className="text-xs text-gray-400 mt-1">
                {item.created_at}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                disabled={loading}
                className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition"
              >
                <Edit size={16} />
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                disabled={loading}
                className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= LIMIT WARNING ================= */}
      {followUps.length >= 3 && !editingId && (
        <p className="text-sm text-red-500 mt-3">
          You’ve reached the maximum of 3 follow-ups.
        </p>
      )}
    </div>
  );
}
