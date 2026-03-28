import { useState, useEffect } from "react";
import { FileText, Download, ExternalLink, Trash2 } from "lucide-react";
import api from "../../../api";
import AddDocumentForm from "./AddDocumentForm";

export default function DocumentsTab({ applicant }) {
  const [showForm, setShowForm] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("auth_token");

  // Fetch documents
  const loadDocuments = async () => {
    if (!applicant?.applicants?.id) return;
    try {
      setLoading(true);
      const res = await api.get(
        `/api/document/applicant/${applicant.applicants.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDocuments(res.data.data || []);
    } catch (err) {
      console.error("Error fetching documents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [applicant]);

  // Delete document
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;
    try {
      await api.delete(`/api/document/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ✅ Download handler
  const handleDownload = async (id, filename) => {
    try {
      const response = await api.get(`/api/document/download/${id}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });

      // Determine correct extension from blob MIME type
      const mimeType = response.data.type; // application/pdf, image/jpeg, etc.
      let ext = "";
      if (mimeType === "application/pdf") ext = ".pdf";
      else if (mimeType === "image/jpeg") ext = ".jpg";
      else if (mimeType === "image/png") ext = ".png";

      // Append extension if missing
      if (!filename.toLowerCase().endsWith(ext)) {
        filename += ext;
      }

      // Create blob URL and download
      const url = window.URL.createObjectURL(new Blob([response.data], { type: mimeType }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download document.");
    }
  };

  // Refresh after upload
  const handleUploaded = async () => {
    setShowForm(false);
    await loadDocuments();
  };

  if (showForm) {
    return (
      <AddDocumentForm
        applicantId={applicant.applicants.id}
        onCancel={() => setShowForm(false)}
        onUploaded={handleUploaded}
      />
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow border w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <FileText size={24} /> Applicant Documents
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading documents...</p>
      ) : documents.length === 0 ? (
        <p className="text-gray-500">No documents uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-gray-50"
            >
              <div className="p-4 flex flex-col gap-2">
                <p className="font-medium text-gray-700">{doc.document_title}</p>
                <p className="text-sm text-gray-500">
                  Uploaded: {new Date(doc.created_at).toLocaleDateString()}
                </p>

                {/* Preview PDFs and images */}
                {doc.document_url &&
                  (doc.document_url.endsWith(".pdf") ||
                    /\.(jpg|jpeg|png)$/i.test(doc.document_url)) && (
                    <iframe
                      src={doc.document_url}
                      className="w-full h-36 border border-gray-200 rounded mb-2"
                      title={doc.document_title}
                    />
                  )}

                <div className="flex flex-wrap gap-2">
                  {/* View */}
                  {doc.document_url && (
                    <a
                      href={doc.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      <ExternalLink size={14} /> View
                    </a>
                  )}

                  {/* Download */}
                  <button
                    onClick={() => handleDownload(doc.id, doc.document_title)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    <Download size={14} /> Download
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
        onClick={() => setShowForm(true)}
      >
        + Add Document
      </button>
    </div>
  );
}