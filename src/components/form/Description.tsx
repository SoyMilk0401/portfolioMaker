import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

type Props = {
  register: any;
  errors: any;
};

export default function Description({ register, errors }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>포트폴리오 소개</CardTitle>
        <CardDescription>포트폴리오를 소개해주세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">포트폴리오 제목</Label>
            <Input id="title" {...register("description.title", { required: '제목은 필수입니다' })} />
            {errors.description?.title && <p className="text-red-500 text-xs">{errors.description.title.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="detail">포트폴리오 설명</Label>
            <Textarea id="detail" {...register("description.detail")} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}