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

      toast.success("User created successfully");

      refresh();   // reload user list
      close();     // close modal

    } catch (error) {

      toast.error("Failed to create user");
      console.error(error);

    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-900/30 backdrop-blur-sm z-[9999]">

      <form
        onSubmit={submit}
        className="bg-white w-[420px] p-6 rounded-xl shadow-2xl space-y-4"
      >

        <h2 className="text-xl font-semibold text-gray-800">
          Add User
        </h2>

        <input
          type="text"
          placeholder="Name"
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="admin">Admin</option>
          <option value="branch">Branch</option>
        </select>

        <div className="flex gap-3 pt-2">

          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Create
          </button>

          <button
            type="button"
            onClick={close}
            className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg transition"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}