import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { useFieldArray } from "react-hook-form";

export default function RelatedLinkField({
  control,
  register,
}: {
  control: any;
  register: any;
}) {
  const { fields, append, remove } = useFieldArray({ control, name: 'relatedLinks' });

  return (
    <div className="grid gap-4">
      {fields.map((field, index) => (
        <Card key={field.id} className="mb-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">URL 입력</CardTitle>
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
              <Label htmlFor={`relatedLinks.${index}.name`} className="block mb-1 text-sm">
                이름
              </Label>
              <Input
                {...register(`relatedLinks.${index}.name`)}
                id={`relatedLinks.${index}.name`}
                placeholder="Github"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor={`relatedLinks.${index}.url`} className="block mb-1 text-sm">
                URL
              </Label>
              <Input
                {...register(`relatedLinks.${index}.url`)}
                id={`relatedLinks.${index}.url`}
                placeholder="https://github.com/SoyMilk0401"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor={`relatedLinks.${index}.description`} className="block mb-1 text-sm">
                설명
              </Label>
              <Textarea
                {...register(`relatedLinks.${index}.description`)}
                id={`relatedLinks.${index}.description`}
                placeholder="소스 코드 저장소"
                className="w-full"
              />
            </div>
          </CardContent>
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
    </div>
  );
}