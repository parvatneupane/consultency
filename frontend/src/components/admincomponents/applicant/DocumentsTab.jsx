import { useState } from "react";
import AddDocumentForm from "./AddDocumentForm";

export default function DocumentsTab({ applicant }) {
  const [showForm, setShowForm] = useState(false);

  const handleAddDocument = (data) => {
    console.log("New Document:", data);
    setShowForm(false);
    // 🔹 Here you can call your API to save the document
  };

  return (
    <div>
      {showForm ? (
        <AddDocumentForm
          onSubmit={handleAddDocument}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-6">Applicant Documents</h2>

          <div className="space-y-4">
            {applicant.documents.map((doc) => (
              <div key={doc.id} className="flex justify-between items-center border p-3 rounded">
                <div>
                  <p>{doc.document_title}</p>
                  <p className="text-sm text-gray-500">Status: {doc.status ? "Approved" : "Pending"}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="mt-6 bg-orange-500 text-white px-4 py-2 rounded"
            onClick={() => setShowForm(true)}
          >
            Add Document
          </button>
        </div>
      )}
    </div>
  );
}