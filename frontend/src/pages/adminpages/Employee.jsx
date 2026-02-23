import AdminLayout from "../AdminLayout";
import EmployeeCard from "../../components/admincomponents/employee/EmployeeCard";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import api from "../../api";

export default function Employee() {
  const token = localStorage.getItem("auth_token");
  const [allEmployees, setAllEmployees] = useState([]);
  const [users, setUsers] = useState([]); // branches are users
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState(""); // filter by user/branch
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const perPage = 9;

  // Fetch employees
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await api.get("api/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllEmployees(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
    setLoading(false);
  };

  // Fetch users (branches)
  const fetchUsers = async () => {
    try {
      const response = await api.get("api/employees/branches", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchUsers();
  }, []);

  // Filter employees by search text and branch/user
 const filteredEmployees = useMemo(() => {
  const searchText = search.toLowerCase();

  return allEmployees.filter((emp) => {
    // Search by employee fields OR branch/user name
    const matchesSearch =
      emp.name?.toLowerCase().includes(searchText) ||
      emp.phone?.toLowerCase().includes(searchText) ||
      emp.designation?.toLowerCase().includes(searchText) ||
      emp.user?.name?.toLowerCase().includes(searchText);

    // Filter by branch/user dropdown
    const matchesUser =
      userFilter === "" ? true : emp.branch_id === Number(userFilter);

    return matchesSearch && matchesUser;
  });
}, [search, userFilter, allEmployees]);
                                                  

  const totalPages = Math.ceil(filteredEmployees.length / perPage);
  const paginatedEmployees = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredEmployees.slice(start, start + perPage);
  }, [page, filteredEmployees]);

  return (
    <AdminLayout>
      <ToastContainer />

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, phone, or designation..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-96 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-sm"
        />

        {/* User/Branch Filter */}
        <select
          // value={e.target.value}
          onChange={(e) => {

            setSearch(e.target.value);
           setPage(1);
          }}
          className="w-full md:w-60 px-4 py-2 rounded-xl border"
        >
          <option value="">All Branches</option>
          {users.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Add Employee */}
        <Link
          to="/addemployee"
          className="inline-flex items-center justify-center bg-amber-400 text-white font-semibold px-5 py-2 rounded-2xl shadow-md hover:bg-amber-500 hover:shadow-lg transition-all duration-300"
        >
          + Add Employee
        </Link>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading employees...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedEmployees.length > 0 ? (
            paginatedEmployees.map((emp) => (
              <EmployeeCard key={emp.id} employee={emp } users={users}  />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No employees found 😕
            </p>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-xl border transition ${
                page === p ? "bg-amber-500 text-white border-amber-500" : "hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
