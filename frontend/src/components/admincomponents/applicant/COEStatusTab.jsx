import { useState, useEffect } from "react";
import api from "../../../api";

export default function COEStatusTab({ applicant }) {

  const [step, setStep] = useState("start");

  const [reason, setReason] = useState("");
  const [file, setFile] = useState(null);

  const [school, setSchool] = useState("");
  const [subject, setSubject] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [coeData, setCoeData] = useState(null);

  const token = localStorage.getItem("auth_token");

  const applicantId = applicant?.applicants?.id;

  // LOAD EXISTING COE
  const loadCOE = async () => {
    try {
      const res = await api.get(`api/coe/${applicantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.data) {
        const data = res.data.data;

        setCoeData(data);

        if (data.status == 1) {
          setStep("accepted");
          setSchool(data.joined_school);
          setSubject(data.subject);
          setCity(data.city);
          setContact(data.contact);
        } else {
          setStep("rejected");
          setReason(data.remarks);
        }
      }

    } catch (error) {
      console.log("No COE found yet");
    }
  };

  useEffect(() => {
    if (applicantId) {
      loadCOE();
    }
  }, [applicantId]);

  // ACCEPTED SUBMIT
  const handleAccept = async () => {
    try {
      await api.post(
        "api/coe/store",
        {
          applicant_id: applicantId,
          status: 1,
          joined_school: school,
          subject: subject,
          city: city,
          contact: contact,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadCOE();

    } catch (error) {
      alert("Error submitting accepted COE");
    }
  };

  // REJECTED SUBMIT
  const handleReject = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("applicant_id", applicantId);
    formData.append("status", 0);
    formData.append("remarks", reason);
    formData.append("document", file);

    try {
      await api.post("api/coe/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      loadCOE();

    } catch (error) {
      alert("Error submitting rejected COE");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border">

      {/* START */}
      {step === "start" && (
        <button
          onClick={() => setStep("choose")}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Apply for COE
        </button>
      )}

      {/* CHOOSE */}
      {step === "choose" && (
        <div className="flex gap-4">
          <button
            onClick={() => setStep("accepted")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Accepted
          </button>

          <button
            onClick={() => setStep("rejected")}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Rejected
          </button>
        </div>
      )}

      {/* ACCEPTED RESULT */}
      {step === "accepted" && coeData && coeData.status == 1 && (
        <div className="bg-green-100 p-4 rounded space-y-2">
          <p className="font-bold text-green-700">COE Accepted ✅</p>
          <p><b>School:</b> {coeData.joined_school}</p>
          <p><b>Subject:</b> {coeData.subject}</p>
          <p><b>City:</b> {coeData.city}</p>
          <p><b>Contact:</b> {coeData.contact}</p>
        </div>
      )}

      {/* ACCEPTED FORM */}
      {step === "accepted" && !coeData && (
        <div className="space-y-4 mt-4">

          <input
            type="text"
            placeholder="Joined School"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full border p-2"
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border p-2"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border p-2"
          />
          <input
            type="text"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full border p-2"
          />

          <button
            onClick={handleAccept}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit Accepted COE
          </button>

        </div>
      )}

      {/* REJECTED RESULT */}
      {step === "rejected" && coeData && coeData.status == 0 && (
        <div className="bg-red-100 p-4 rounded space-y-2">
          <p className="font-bold text-red-700">COE Rejected ❌</p>
          <p><b>Reason:</b> {coeData.remarks}</p>

          {coeData.document && (
            <a
              href={`http://127.0.0.1:8000/storage/${coeData.document}`}
              target="_blank"
              className="text-blue-500 underline"
            >
              View Document
            </a>
          )}
        </div>
      )}

      {/* REJECTED FORM */}
      {step === "rejected" && !coeData && (
        <form onSubmit={handleReject} className="mt-4 space-y-4">

          <textarea
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border p-2"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2"
          />

          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>

        </form>
      )}

    </div>
  );
}