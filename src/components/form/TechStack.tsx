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

export default function TechStack({ register, errors }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>기술스택</CardTitle>
                <CardDescription>기술스택을 입력해주세요</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="language">Language</Label>
                        <Input id="language" {...register("techStack.language")} />
                        {errors.techstack.language && <p className="text-red-500 text-sm">{errors.techStack.language}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="frontend">Language</Label>
                        <Input id="frontend" {...register("techStack.frontend")} />
                        {errors.techstack.frontend && <p className="text-red-500 text-sm">{errors.techStack.frontend}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="backend">Language</Label>
                        <Input id="backend" {...register("techStack.backend")} />
                        {errors.techstack.backend && <p className="text-red-500 text-sm">{errors.techStack.backend}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="devops">Language</Label>
                        <Input id="devops" {...register("techStack.devops")} />
                        {errors.techstack.devops && <p className="text-red-500 text-sm">{errors.techStack.devops}</p>}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-gray-500">* 포트폴리오 설명은 100자 이내로 입력해주세요</p>
            </CardFooter>
        </Card>
    )
}