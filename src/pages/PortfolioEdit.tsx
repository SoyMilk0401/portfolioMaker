import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import type { PortfolioData } from "@/types/portfolio";
import { usePortfolioStore } from "@/stores/useportfolioStore";
import Description from "@/components/form/Description";
import UserInfo from "@/components/form/UserInfo";

export default function PortfolioEdit() {
  const { id } = useParams();
  if (!id?.trim()) {
      return (
        <div className="p-6 max-w-xl mx-auto space-y-4">
          <Alert variant="default">
            <AlertTitle>잘못된 접근</AlertTitle>
            <AlertDescription>
              유효하지 않은 포트폴리오 ID입니다.
            </AlertDescription>
          </Alert>
        </div>
      );
    }

  const getPortfolio = usePortfolioStore((store) => store.getPortfolio);
  const updatePortfolio = usePortfolioStore((store) => store.updatePortfolio);
  
  const portfolio = getPortfolio(id);

  const form = useForm<PortfolioData>({
    defaultValues: {
      id: portfolio?.id || "",
      password: portfolio?.password || "",
      description: {
        title: portfolio?.description?.title || "",
        detail: portfolio?.description?.detail || "",
      },
      userInfo: {
        name: portfolio?.userInfo.name || "",
        birthdate: portfolio?.userInfo.birthdate || "",
        email: portfolio?.userInfo.email || "",
        phone: portfolio?.userInfo.phone || "",
        education: portfolio?.userInfo.education || "",
      },
      techStack: {
        language: portfolio?.techStack?.language || [],
        frontend: portfolio?.techStack?.frontend || [],
        backend: portfolio?.techStack?.backend || [],
        devops: portfolio?.techStack?.devops || [],
      },
      relatedLinks: portfolio?.relatedLinks || [],
      projects: portfolio?.projects || [],
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: PortfolioData) => {
    updatePortfolio(id, data);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Description register={register} errors={errors} />
            </form>
          </CarouselItem>
          <CarouselItem>
            <form onSubmit={handleSubmit(onSubmit)}>
              <UserInfo register={register} errors={errors} />
            </form>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
