import { useState } from "react";
import api from "../../../api";

export default function AddDocumentForm({ applicantId, onCancel, onUploaded }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
const token = localStorage.getItem("auth_token");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !file) {
      alert("Fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("applicant_id", applicantId);
    formData.append("document_title", title);
    formData.append("document", file);
    formData.append("status", 0);

    try {
      setLoading(true);

      await api.post("api/document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${token}`,

        },
      });

      setTitle("");
      setFile(null);

      onUploaded(); // tell parent to refresh
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Add Document</h2>

      <div className="mb-4">
        <label>Document Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 mt-1"
        />
      </div>

      <div className="mb-4">
        <label>Document File</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 mt-1"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Add"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}