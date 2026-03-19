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
    <div className="fixed inset-0 flex items-center justify-center bg-blue-900/30 backdrop-blur-sm z-50">

      <div className="bg-white w-[400px] p-6 rounded-xl shadow-2xl">

        <h2 className="text-xl font-semibold mb-3">
          Delete User
        </h2>

        <p className="text-gray-600 text-sm">
          Are you sure you want to delete <b>{user.name}</b> ?
        </p>

        <div className="flex gap-3 mt-5">

          <button
            onClick={remove}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
          >
            Delete
          </button>

          <button
            onClick={close}
            className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}