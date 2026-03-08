import { useState, useEffect } from "react";
import api from "../../../api";
import { Trash2 } from "lucide-react";

export default function AddIntakeForm({ onSave, onCancel }) {
  const token = localStorage.getItem("auth_token");

  const [activeTab, setActiveTab] = useState("list");
  const [intakes, setIntakes] = useState([]);
  const [intake, setIntake] = useState(""); // YYYY-MM
  const [loading, setLoading] = useState(false);

  // Fetch intakes from API
  const fetchIntakes = async () => {
    try {
      const res = await api.get("/api/intakes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIntakes(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIntakes();
  }, []);

  // Add new intake
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!intake) return;

    // Convert YYYY-MM to "Month YYYY"
    const [year, monthNum] = intake.split("-");
    const monthName = new Date(`${year}-${monthNum}-01`).toLocaleString(
      "default",
      { month: "long" }
    );
    const formattedIntake = `${monthName} ${year}`; // e.g., "May 2026"

    setLoading(true);
    try {
      const res = await api.post(
        "/api/intakes",
        { name: formattedIntake },
        {  headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          }, }
      );

      setIntake(""); // reset input
      fetchIntakes();

      if (onSave) onSave(res.data.data.name);
      setActiveTab("list");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete intake
  const deleteIntake = async (id) => {
    if (!window.confirm("Delete this intake?")) return;

    try {
      await api.delete(`/api/intakes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchIntakes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[420px] p-6">

        {/* Tabs */}
        <div className="flex mb-4 border-b">
          <button
            onClick={() => setActiveTab("list")}
            className={`flex-1 py-2 ${
              activeTab === "list" ? "border-b-2 border-orange-500 font-semibold" : ""
            }`}
          >
            Intakes
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`flex-1 py-2 ${
              activeTab === "add" ? "border-b-2 border-orange-500 font-semibold" : ""
            }`}
          >
            Add Intake
          </button>
        </div>

        {/* LIST */}
        {activeTab === "list" && (
          <div className="max-h-60 overflow-y-auto space-y-2">
            {intakes.length === 0 && (
              <p className="text-gray-500 text-sm">No intakes found</p>
            )}

            {intakes.map((item) => (
              <div key={item.id} className="flex justify-between items-center border p-2 rounded">
                <span>{item.name}</span>
                <button onClick={() => deleteIntake(item.id)} className="text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ADD INTAKE */}
        {activeTab === "add" && (
          <form onSubmit={handleSubmit}>
            <input
              type="month"
              value={intake}
              onChange={(e) => setIntake(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 rounded-lg"
            >
              {loading ? "Saving..." : "Save Intake"}
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-4 text-right">
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}