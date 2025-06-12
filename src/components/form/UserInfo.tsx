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
import { Button } from "@/components/ui/button";

type Props = {
  register: any;
  errors: any;
};

export default function UserInfo({ register, errors }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>개발자 정보</CardTitle>
        <CardDescription>당신의 정보를 입력하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">이름</Label>
            <Input id="name" {...register("userInfo.name", { required: '이름은 필수입니다.' })} />
            {errors.userInfo?.name && <p className="text-red-500 text-sm">{errors.userInfo.name.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="birthdate">생년월일</Label>
            <Input id="birthdate" type="date" {...register("userInfo.birthdate", { required: '생년월일은 필수입니다.' })} />
            {errors.userInfo?.birthdate && <p className="text-red-500 text-sm">{errors.userInfo.birthdate.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              {...register("userInfo.email", {
                required: '이메일은 필수입니다.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '유효한 이메일 주소를 입력하세요.',
                },
              })}
            />
            {errors.userInfo?.email && <p className="text-red-500 text-sm">{errors.userInfo.email.message}</p>}
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
          <Button variant="default" type="submit">저장하기</Button>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">* 모든 필드는 나중에 수정할 수 있습니다.</p>
      </CardFooter>
    </Card>
  );
}
