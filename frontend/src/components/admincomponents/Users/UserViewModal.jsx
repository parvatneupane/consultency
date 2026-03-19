export default function UserViewModal({ user, close }) {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-900/30 backdrop-blur-sm z-50">

      <div className="bg-white w-[420px] p-6 rounded-xl shadow-2xl">

        <h2 className="text-xl font-semibold mb-4">
          User Details
        </h2>

        <div className="space-y-2 text-sm">

          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Role:</span> {user.role}</p>
          <p>
            <span className="font-semibold">Created:</span>{" "}
            {new Date(user.created_at).toLocaleDateString()}
          </p>

        </div>

        <button
          onClick={close}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Close
        </button>

      </div>
    </div>
  );
}