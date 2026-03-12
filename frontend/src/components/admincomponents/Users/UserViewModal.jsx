
export default function UserViewModal({ user, close }) {

  return (
    <div className="modal">

      <div className="bg-white p-6 rounded">

        <h2 className="text-lg font-bold mb-4">User Details</h2>

        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
        <p><b>Created:</b> {new Date(user.created_at).toLocaleDateString()}</p>

        <button
          onClick={close}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>

      </div>
    </div>
  );
}

