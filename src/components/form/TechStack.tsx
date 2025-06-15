import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import TechStackField from "./TechStackField";

type Props = {
  register: any;
  errors: any;
  control: any;
};

export default function TechStack({ register, control }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>기술스택</CardTitle>
        <CardDescription>각 항목별로 기술스택을 추가할 수 있습니다</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <TechStackField
            label="Language"
            name="techStack.language"
            control={control}
            register={register}
          />
          <TechStackField
            label="Frontend"
            name="techStack.frontend"
            control={control}
            register={register}
          />
          <TechStackField
            label="Backend"
            name="techStack.backend"
            control={control}
            register={register}
          />
          <TechStackField
            label="DevOps"
            name="techStack.devops"
            control={control}
            register={register}
          />
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">* 각 기술스택은 여러 개 입력 가능합니다</p>
      </CardFooter>
    </Card>
  );
}