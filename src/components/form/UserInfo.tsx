import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  register: any;
  errors: any;
};

export default function UserInfo({ register, errors }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>개발자 정보</CardTitle>
        <CardDescription>개발자 정보를 입력하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">이름</Label>
            <Input id="name" {...register("userInfo.name", { required: '이름은 필수입니다' })}/>
            {errors.userInfo?.name && <p className="text-red-500 text-xs">{errors.userInfo.name.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="birthdate">생년월일</Label>
            <Input id="birthdate" type="date" {...register("userInfo.birthdate", { required: '생년월일은 필수입니다' })} />
            {errors.userInfo?.birthdate && <p className="text-red-500 text-xs">{errors.userInfo.birthdate.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              {...register("userInfo.email", {
                required: '이메일은 필수입니다',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '유효한 이메일 주소를 입력하세요',
                },
              })}
            />
            {errors.userInfo?.email && <p className="text-red-500 text-xs">{errors.userInfo.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">연락처</Label>
            <Input id="phone" type="tel" {...register("userInfo.phone")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="education">학력</Label>
            <Input id="education" {...register("userInfo.education")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="githubUsername">GitHub 사용자명</Label>
            <Input id="githubUsername" {...register("userInfo.githubUsername")} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">* GitHub 사용자명을 통해 프로필 사진을 추가합니다</p>
      </CardFooter>
    </Card>
  );
}
