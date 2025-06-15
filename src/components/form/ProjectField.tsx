import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { useFieldArray } from "react-hook-form";
import TechStackField from "./TechStackField";

export default function ProjectField({
  control,
  register,
}: {
  control: any;
  register: any;
}) {
  const { fields, append, remove } = useFieldArray({ control, name: 'projects' });

  return (
    <div className="grid gap-4">
      {fields.map((field, index) => (
        <Card key={field.id} className="mb-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">프로젝트 입력</CardTitle>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => remove(index)}
            >
              삭제
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <Label htmlFor={`projects.${index}.title`} className="block mb-1 text-sm">
                제목
              </Label>
              <Input
                {...register(`projects.${index}.title`)}
                id={`projects.${index}.title`}
                className="w-full"
                placeholder="포트폴리오메이커"
              />
            </div>
            <div>
              <Label htmlFor={`projects.${index}.date`} className="block mb-1 text-sm">
                일자
              </Label>
              <Input
                {...register(`projects.${index}.date`)}
                id={`projects.${index}.date`}
                type="date"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor={`projects.${index}.description`} className="block mb-1 text-sm">
                설명
              </Label>
              <Textarea
                {...register(`projects.${index}.description`)}
                id={`projects.${index}.description`}
                className="w-full"
                placeholder="나만의 포트폴리오를 쉽고 빠르게"
              />
            </div>
            <div>
              <Label htmlFor={`projects.${index}.url`} className="block mb-1 text-sm">
                URL
              </Label>
              <Input
                {...register(`projects.${index}.url`)}
                id={`projects.${index}.url`}
                className="w-full"
                placeholder="github.com/SoyMilk0401/portfolioMaker"
              />
            </div>
            <div>
              <Label htmlFor={`projects.${index}.video`} className="block mb-1 text-sm">
                시연 영상
              </Label>
              <Input
                {...register(`projects.${index}.video`)}
                id={`projects.${index}.video`}
                className="w-full"
              />
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-gray-500">* 시연 영상은 프로젝트 자세히 보기에서 바로 시청할 수 있습니다</p>
          </CardFooter>
        </Card>
      ))}
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() => append({ name: "", url: "", description: "" })}
      >
        추가
      </Button>
      {/* 필요하다면 에러 메시지 추가 */}
    </div>
  );
}