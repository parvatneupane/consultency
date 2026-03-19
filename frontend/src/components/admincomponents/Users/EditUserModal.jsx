import { useState } from "react";
import api from "../../../api";
import { toast } from "react-toastify";
export default function EditUserModal({ user, close, refresh }) {

  const token = localStorage.getItem("auth_token");

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role
  });

  const update = async (e) => {

    e.preventDefault();

    try {

      await api.put(`/api/users/${user.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("User updated");

      refresh();
      close();

    } catch {

      toast.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-900/30 backdrop-blur-sm z-50">

      <form
        onSubmit={update}
        className="bg-white w-[420px] p-6 rounded-xl shadow-2xl space-y-3"
      >

        <h2 className="text-xl font-semibold mb-2">
          Edit User
        </h2>

        <input
          value={form.name}
          placeholder="Name"
          className="w-full border rounded-lg px-3 py-2"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
          value={form.email}
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <select
          value={form.role}
          className="w-full border rounded-lg px-3 py-2"
          onChange={(e)=>setForm({...form,role:e.target.value})}
        >
          <option value="admin">Admin</option>
          <option value="branch">Branch</option>
        </select>

        <div className="flex gap-3 pt-2">

          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Update
          </button>

          <button
            type="button"
            onClick={close}
            className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  );
}