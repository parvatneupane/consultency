import { User, MapPin, Mail, Phone } from "lucide-react";

export default function PersonalInfoTab({ applicant }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Info icon={<User />} label="Name" value={applicant.name} />
        <Info icon={<Phone />} label="Phone" value={applicant.phone} />
        <Info icon={<Mail />} label="Email" value={applicant.email} />
        <Info icon={<MapPin />} label="Address" value={applicant.address} />
      </div>

      <div className="mt-6 flex gap-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded">
          Edit
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="text-orange-500">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}