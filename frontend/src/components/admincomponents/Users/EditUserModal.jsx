
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
    <div className="modal">

      <form onSubmit={update} className="bg-white p-6 rounded">

        <h2 className="text-lg font-bold mb-4">Edit User</h2>

        <input
          value={form.name}
          className="input"
          onChange={(e) => setForm({...form,name:e.target.value})}
        />

        <input
          value={form.email}
          className="input"
          onChange={(e) => setForm({...form,email:e.target.value})}
        />

        <select
          value={form.role}
          className="input"
          onChange={(e) => setForm({...form,role:e.target.value})}
        >
          <option value="admin">Admin</option>
          <option value="branch">Branch</option>
        </select>

        <div className="flex gap-2 mt-4">
          <button className="btn-blue">Update</button>
          <button type="button" onClick={close}>Cancel</button>
        </div>

      </form>
    </div>
  );
}

