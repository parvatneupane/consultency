
import { useState } from "react";
import api from "../../../api";
import { toast } from "react-toastify";

export default function AddUserModal({ close, refresh }) {

  const token = localStorage.getItem("auth_token");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "branch",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/users", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("User created");
      refresh();
      close();
    } catch {
      toast.error("Failed to create user");
    }
  };

  return (
    <div className="modal">

      <form onSubmit={submit} className="bg-white p-6 rounded">

        <h2 className="text-lg font-bold mb-4">Add User</h2>

        <input
          placeholder="Name"
          className="input"
          onChange={(e) => setForm({...form, name:e.target.value})}
        />

        <input
          placeholder="Email"
          className="input"
          onChange={(e) => setForm({...form, email:e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={(e) => setForm({...form, password:e.target.value})}
        />

        <select
          className="input"
          onChange={(e) => setForm({...form, role:e.target.value})}
        >
          <option value="admin">Admin</option>
          <option value="branch">Branch</option>
        </select>

        <div className="flex gap-2 mt-4">
          <button className="btn-blue">Create</button>
          <button type="button" onClick={close}>Cancel</button>
        </div>

      </form>
    </div>
  );
}

