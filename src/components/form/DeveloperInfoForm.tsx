import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  register: any;
  errors: any;
};

export default function DeveloperInfoForm({ register, errors }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="name">이름</Label>
        <Input id="name" {...register("name", { required: '이름은 필수입니다.' })} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="birthdate">생년월일</Label>
        <Input id="birthdate" type="date" {...register("birthdate", { required: '생년월일은 필수입니다.' })} />
        {errors.birthdate && <p className="text-red-500 text-sm">{errors.birthdate.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          placeholder="m@example.com"
          {...register("email", {
            required: '이메일은 필수입니다.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '유효한 이메일 주소를 입력하세요.',
            },
          })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">연락처</Label>
        <Input id="phone" type="tel" {...register("phone")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="education">학력</Label>
        <Input id="education" {...register("education")} />
      </div>
      <Button variant="default" type="submit">저장하기</Button>
    </div>
  );
}
