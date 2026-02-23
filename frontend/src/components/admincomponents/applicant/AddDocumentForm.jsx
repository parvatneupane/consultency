import { useState } from "react";

export default function AddDocumentForm({ onCancel, onSubmit }) {
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentFile, setDocumentFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!documentTitle || !documentFile) {
      alert("Please enter a document title and select a file.");
      return;
    }

    // 🔹 Send form data back to parent
    onSubmit &&
      onSubmit({
        document_title: documentTitle,
        document: documentFile,
      });

    // 🔹 Reset form
    setDocumentTitle("");
    setDocumentFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow border space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Document</h2>

      {/* Document Title */}
      <div>
        <label className="text-sm text-gray-600">Document Title</label>
        <input
          type="text"
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
          placeholder="Enter document title"
          className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Document File */}
      <div>
        <label className="text-sm text-gray-600">Document File</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => setDocumentFile(e.target.files[0])}
          className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Add Document
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}