import type { UserInfo } from "@/types/portfolio";
import { FaUser, FaCalendar, FaPhoneAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Field from "@/components/ui/field";


export default function ViewUserInfo({ userinfo }: { userinfo: UserInfo }) {
  return (
    <section className="w-full bg-white py-12 px-4" data-aos="fade-up">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">ABOUT ME</h1>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Field icon={<FaUser size={30} />} label="이름" value={userinfo.name || ""} />
        <Field icon={<FaCalendar size={30} />} label="생년월일" value={userinfo.birthdate || ""} />
        <Field icon={<MdEmail size={30} />} label="이메일" value={userinfo.email || ""} />

        {userinfo.phone && (
          <Field icon={<FaPhoneAlt size={30} />} label="연락처" value={userinfo.phone} />
        )}
        {userinfo.education && (
          <Field icon={<FaPencil size={30} />} label="학력" value={userinfo.education} />
        )}
      </div>
    </section>
  );
}

