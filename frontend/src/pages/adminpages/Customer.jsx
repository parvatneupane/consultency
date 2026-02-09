import AdminLayout from "../AdminLayout";
import CustomerCard from "../../components/admincomponents/CustomerCard";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import api from "../../api";

export default function Customer() {
  const token = localStorage.getItem("auth_token");

  const [allCustomers, setAllCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 9;

  //  Fetch once from backend
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await api.get("api/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllCustomers(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // 🧠 Client-side Search + Filter
  const filteredCustomers = useMemo(() => {
    return allCustomers.filter((customer) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        customer.name?.toLowerCase().includes(searchText) ||
        customer.phone?.toLowerCase().includes(searchText) ||
        customer.course?.toLowerCase().includes(searchText) ||
        customer.city?.toLowerCase().includes(searchText);

      const matchesFilter =
        filter === "all" || customer.study_time === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter, allCustomers]);

  // 📄 Client-side Pagination
  const totalPages = Math.ceil(filteredCustomers.length / perPage);

  const paginatedCustomers = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredCustomers.slice(start, start + perPage);
  }, [page, filteredCustomers]);

  return (
    <AdminLayout>
      {/* Top Bar */}
              <ToastContainer />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, phone, course, or city..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-96 px-4 py-2 rounded-xl border border-gray-300
          focus:ring-2 focus:ring-orange-400 focus:outline-none shadow-sm"
        />

        <div className="flex items-center gap-3">
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 rounded-xl border border-gray-300
            focus:ring-2 focus:ring-orange-400 focus:outline-none shadow-sm"
          >
            <option value="all">All Study Times</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>

          {/* Add Button */}
          <Link
            to="/addcustomer"
            className="inline-flex items-center justify-center bg-amber-400 text-white font-semibold px-5 py-2 rounded-2xl shadow-md hover:bg-amber-500 hover:shadow-lg transition-all duration-300"
          >
            + Add Customer
          </Link>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center text-gray-500 mt-10">
          Loading customers...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedCustomers.length > 0 ? (
            paginatedCustomers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No customers found 😕
            </p>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-xl border transition
                ${
                  page === p
                    ? "bg-orange-500 text-white border-orange-500"
                    : "hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>
      )}
    </AdminLayout>
  );
}
