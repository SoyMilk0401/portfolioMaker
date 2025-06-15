import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFieldArray } from "react-hook-form";

export default function TechStackField({
  label,
  name,
  control,
  register,
}: {
  label: string;
  name: `techStack.${"language" | "frontend" | "backend" | "devops"}`;
  control: any;
  register: any;
}) {

  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-center">
          <Input {...register(`${name}.${index}`)} />
          <Button type="button" size="sm" variant="outline" onClick={() => remove(index)}>
            삭제
          </Button>
        </div>
      ))}
      <Button type="button" size="sm" variant="secondary" onClick={() => append("")}>
        추가
      </Button>
    </div>
  );
}