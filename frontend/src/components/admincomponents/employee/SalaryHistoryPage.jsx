import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Calendar,

  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api from "../../../api";

export default function SalaryHistoryPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const employee = state?.employee;

  const [salaryHistory, setSalaryHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(5);

  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (employee?.id) {
      fetchSalaryHistory(currentPage, perPage);
    }
  }, [currentPage, perPage]);

  const fetchSalaryHistory = async (page = 1, perPageValue = 5) => {
    try {
      setLoading(true);

      const response = await api.get(
        `api/salary/${employee.id}?page=${page}&per_page=${perPageValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      setSalaryHistory(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
      setTotal(data.total);

    } catch (error) {
      console.error("Failed to fetch salary history:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Salary History</h2>
            <p className="text-gray-500">{employee?.name}</p>
            <p className="text-sm text-gray-400 mt-1">
              Total Records: {total}
            </p>
          </div>

          {/* Page Size Selector */}
          <div>
            <select
              value={perPage}
              onChange={(e) => {
                setCurrentPage(1);
                setPerPage(e.target.value);
              }}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading salary history...
          </div>
        ) : salaryHistory.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No salary records found.
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {salaryHistory.map((salary) => (
                <div
                  key={salary.id}
                  className="border rounded-xl p-5 flex flex-col md:flex-row md:justify-between md:items-center hover:shadow-md transition"
                >
                  <div>
                    <p className="flex items-center gap-2 font-semibold text-lg">
                      <Calendar size={16} />
                      {formatDate(salary.date)}
                    </p>

                    <p className="flex items-center gap-2 text-gray-700 mt-1">
                      
                      Rs. {Number(salary.amount).toLocaleString()}
                    </p>

                    {salary.remarks && (
                      <p className="text-sm text-gray-500 mt-1">
                        {salary.remarks}
                      </p>
                    )}
                  </div>

                  {salary.slip && (
                    <a
                      href={`http://localhost:8000/storage/${salary.slip}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      <FileText size={16} />
                      View Slip
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* PAGINATION CONTROLS */}
            <div className="flex justify-center items-center gap-4 mt-8">

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
              >
                <ChevronLeft size={16} />
                Prev
              </button>

              <span className="text-gray-600 font-medium">
                Page {currentPage} of {lastPage}
              </span>

              <button
                disabled={currentPage === lastPage}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
              >
                Next
                <ChevronRight size={16} />
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
}
