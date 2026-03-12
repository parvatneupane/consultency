
import { useEffect, useState } from "react";
import api from "../../api";
import AdminLayout from "../AdminLayout";
import { toast, ToastContainer } from "react-toastify";

import AddUserModal from "../../components/admincomponents/users/AddUserModal";
import EditUserModal from "../../components/admincomponents/users/EditUserModal";
import DeleteUserModal from "../../components/admincomponents/users/DeleteUserModal";
import UserViewModal from "../../components/admincomponents/users/UserViewModal";

export default function UserManagement() {

  const token = localStorage.getItem("auth_token");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showView, setShowView] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data.users);
    } catch {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminLayout>

      <ToastContainer />

      <div className="p-6">

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>

          <button
            onClick={() => setShowAdd(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        </div>

        <div className="bg-white shadow rounded">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : users.map((user) => (
                <tr key={user.id} className="border-b">

                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowView(true);
                      }}
                      className="text-blue-600"
                    >
                      View
                    </button>

                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowEdit(true);
                      }}
                      className="text-green-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDelete(true);
                      }}
                      className="text-red-600"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        </div>

      </div>

      {showAdd && (
        <AddUserModal
          close={() => setShowAdd(false)}
          refresh={fetchUsers}
        />
      )}

      {showEdit && (
        <EditUserModal
          user={selectedUser}
          close={() => setShowEdit(false)}
          refresh={fetchUsers}
        />
      )}

      {showDelete && (
        <DeleteUserModal
          user={selectedUser}
          close={() => setShowDelete(false)}
          refresh={fetchUsers}
        />
      )}

      {showView && (
        <UserViewModal
          user={selectedUser}
          close={() => setShowView(false)}
        />
      )}

    </AdminLayout>
  );
}

