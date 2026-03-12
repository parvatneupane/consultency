
import api from "../../../api";
import { toast } from "react-toastify";

export default function DeleteUserModal({ user, close, refresh }) {

  const token = localStorage.getItem("auth_token");

  const remove = async () => {

    try {
      await api.delete(`/api/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("User deleted");
      refresh();
      close();

    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="modal">

      <div className="bg-white p-6 rounded">

        <h2 className="text-lg font-bold mb-4">
          Delete User
        </h2>

        <p>Are you sure you want to delete {user.name}?</p>

        <div className="flex gap-2 mt-4">

          <button
            onClick={remove}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

          <button onClick={close}>Cancel</button>

        </div>

      </div>
    </div>
  );
}

