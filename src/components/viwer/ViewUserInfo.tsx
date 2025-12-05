import type { UserInfo } from "@/types/portfolio";
import { FaCalendar, FaPhoneAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function ViewUserInfo({ userinfo }: { userinfo: UserInfo }) {
  return (
    <section className="w-full px-4" data-aos="fade-up">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        <div className="flex flex-col items-center justify-center shrink-0 text-center space-y-4">
          <Avatar className="w-40 h-40 border-4 border-white shadow-xl bg-white">
            <AvatarImage src={userinfo.photo} alt={userinfo.name} className="object-cover" />
            <AvatarFallback className="text-3xl bg-gray-100 text-gray-400">
              {userinfo.name ? userinfo.name.slice(0, 2) : "User"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{userinfo.name}</h2>
            {userinfo.githubUsername && (
                <p className="text-sm text-gray-500 font-medium">@{userinfo.githubUsername}</p>
            )}
          </div>
        </div>

        <div className="w-full flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard icon={<MdEmail className="text-blue-500" />} label="이메일" value={userinfo.email} />
                <InfoCard icon={<FaCalendar className="text-blue-500" />} label="생년월일" value={userinfo.birthdate} />
                {userinfo.phone && (
                    <InfoCard icon={<FaPhoneAlt className="text-blue-500" />} label="연락처" value={userinfo.phone} />
                )}
                {userinfo.education && (
                    <InfoCard icon={<FaPencil className="text-blue-500" />} label="학력" value={userinfo.education} />
                )}
            </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) {
    if (!value) return null;
    return (
        <Card className="shadow-sm hover:shadow-md transition-all duration-200 border-gray-100 bg-white">
            <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 bg-blue-50 rounded-full shadow-inner text-blue-600">
                    {icon}
                </div>
                <div className="flex flex-col text-left">
                    <span className="text-xs text-gray-400 font-medium mb-0.5">{label}</span>
                    <span className="text-sm font-semibold text-gray-800 break-all">{value}</span>
                </div>
            </CardContent>
        </Card>
    )
}