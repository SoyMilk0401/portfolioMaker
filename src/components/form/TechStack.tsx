import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import StackField from "./StackField";

type Props = {
  register: any;
  errors: any;
  control: any;
};

export default function TechStack({ register, errors, control }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>기술스택</CardTitle>
        <CardDescription>각 항목별로 여러 개의 기술을 추가할 수 있습니다</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <StackField
            label="Language"
            name="techStack.language"
            control={control}
            register={register}
            error={errors?.techStack?.language}
          />
          <StackField
            label="Frontend"
            name="techStack.frontend"
            control={control}
            register={register}
            error={errors?.techStack?.frontend}
          />
          <StackField
            label="Backend"
            name="techStack.backend"
            control={control}
            register={register}
            error={errors?.techStack?.backend}
          />
          <StackField
            label="DevOps"
            name="techStack.devops"
            control={control}
            register={register}
            error={errors?.techStack?.devops}
          />
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">* 각 기술스택은 여러 개 입력 가능합니다</p>
      </CardFooter>
    </Card>
  );
}