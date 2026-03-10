import {
  User,
  Mail,
  Phone,
  MapPin,
  Users,
  GraduationCap,
  BookOpen,
  Clock,
  Globe,
  UserCheck,
  MessageSquare,
  BadgeCheck
} from "lucide-react";

export default function PersonalInfoTab({ applicant }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

      <div className="grid md:grid-cols-2 gap-6">

        <Info icon={<User />} label="Name" value={applicant.name} />
        <Info icon={<Phone />} label="Phone" value={applicant.phone} />
        <Info icon={<Mail />} label="Email" value={applicant.email} />
        <Info icon={<MapPin />} label="Address" value={applicant.address} />

        <Info icon={<UserCheck />} label="Gender" value={applicant.gender} />
        <Info icon={<GraduationCap />} label="Education" value={applicant.education} />
        <Info icon={<BookOpen />} label="Course" value={applicant.course} />
        <Info icon={<Clock />} label="Study Time" value={applicant.study_time} />

        <Info icon={<Globe />} label="Desired City" value={applicant.desire_city} />

        <Info icon={<Users />} label="Father Name" value={applicant.father_name} />
        <Info icon={<Phone />} label="Father Phone" value={applicant.father_phone} />

        <Info icon={<Users />} label="Mother Name" value={applicant.mother_name} />
        <Info icon={<Phone />} label="Mother Phone" value={applicant.mother_phone} />

        <Info icon={<UserCheck />} label="Referral Type" value={applicant.referral_type} />
        <Info icon={<User />} label="Referral Name" value={applicant.referral_name} />
        <Info icon={<Phone />} label="Referral Phone" value={applicant.referral_phone} />

        <Info icon={<BadgeCheck />} label="Status" value={applicant.status} />

      </div>

      {applicant.remarks && (
        <div className="mt-6 flex gap-3 items-start">
          <div className="text-orange-500">
            <MessageSquare />
          </div>
          <div>
            <p className="text-sm text-gray-500">Remarks</p>
            <p className="font-medium">{applicant.remarks}</p>
          </div>
        </div>
      )}


    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="text-orange-500">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value || "-"}</p>
      </div>
    </div>
  );
}