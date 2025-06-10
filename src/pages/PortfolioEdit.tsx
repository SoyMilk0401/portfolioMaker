import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { usePortfolioStore } from "@/stores/useportfolioStore";
import DeveloperInfoForm from "@/components/form/DeveloperInfoForm";

export default function PortfolioEdit() {
  const { id } = useParams();
  if (!id) {
    return <p className="text-center p-6">잘못된 접근입니다.</p>;
  }

  const getPortfolio = usePortfolioStore((store) => store.getPortfolio);
  const updatePortfolio = usePortfolioStore((store) => store.updatePortfolio);

  const portfolio = getPortfolio(id);

  const form = useForm({
    defaultValues: {
      name: portfolio?.userInfo.name || "",
      birthdate: portfolio?.userInfo.birthdate || "",
      email: portfolio?.userInfo.email || "",
      phone: portfolio?.userInfo.phone || "",
      education: portfolio?.userInfo.education || "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: any) => {
    updatePortfolio(id, data);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>개발자 정보</CardTitle>
          <CardDescription>개발자에 대한 정보를 입력하세요.</CardDescription>
          <CardAction />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DeveloperInfoForm register={register} errors={errors} />
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">* 모든 필드는 나중에 수정할 수 있습니다.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
