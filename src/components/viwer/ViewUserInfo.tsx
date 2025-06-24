import type { UserInfo } from "@/types/portfolio";
import { FaUser, FaCalendar, FaPhoneAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function ViewUserInfo({ userinfo }: { userinfo: UserInfo }) {

    return (
        <div className="w-full px-0">
            <div className="max-w-4xl mx-auto">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                    ABOUT ME
                </h1>
                <div className="grid grid-cols-3 gap-8 items-center">
                    <div className="flex items-center gap-6 mt-6">
                        <FaUser size={35} />
                        <div>
                            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                이름
                            </h3>
                            <h4 className="scroll-m-20 text-lg tracking-tight">
                                {userinfo.name}
                            </h4>               
                        </div>
                    </div>

                    <div className="flex items-center gap-6 mt-6">
                        <FaCalendar size={35} />
                        <div>
                            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                생년월일
                            </h3>
                            <h4 className="scroll-m-20 text-lg tracking-tight">
                                {userinfo.birthdate}
                            </h4>               
                        </div>
                    </div>

                    <div className="flex items-center gap-6 mt-6">
                        <MdEmail size={43} />
                        <div>
                            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                이메일
                            </h3>
                            <h4 className="scroll-m-20 text-lg tracking-tight">
                                {userinfo.email}
                            </h4>               
                        </div>
                    </div>

                    {userinfo.phone && (<div className="flex items-center gap-6 mt-6">
                        <FaPhoneAlt size={35} />
                        <div>
                            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                연락처
                            </h3>
                            <h4 className="scroll-m-20 text-lg tracking-tight">
                                {userinfo.phone}
                            </h4>               
                        </div>
                    </div>)}

                    {userinfo.education && (<div className="flex items-center gap-6 mt-6">
                        <FaPencil size={40} />
                        <div>
                            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                학력
                            </h3>
                            <h4 className="scroll-m-20 text-lg tracking-tight">
                                {userinfo.education}
                            </h4>               
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}