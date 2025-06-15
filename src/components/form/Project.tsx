import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import ProjectField from "./ProjectField";

type Props = {
  register: any;
  errors: any;
  control: any;
};

export default function Project({ register, control }: Props) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>프로젝트</CardTitle>
                <CardDescription>프로젝트를 추가해주세요</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <ProjectField
                        control={control}
                        register={register}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-gray-500"></p>
            </CardFooter>
        </Card>
    )

}