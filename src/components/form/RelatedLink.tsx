import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import RelatedLinkField from "./RelatedLinkField";

type Props = {
  register: any;
  errors: any;
  control: any;
};

export default function RelatedLink({ register, control }: Props) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>URL</CardTitle>
                <CardDescription>Github, 개인 블로그 등 원하는 url을 입력해주세요</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <RelatedLinkField 
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