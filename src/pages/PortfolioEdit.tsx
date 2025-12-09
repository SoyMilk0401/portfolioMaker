import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, type FieldErrors } from "react-hook-form";
import { usePortfolioStore } from "@/stores/useportfolioStore";
import { useAuthStore } from "@/stores/useAuthStore";
import type { PortfolioData } from "@/types/portfolio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Description from "@/components/form/Description";
import UserInfo from "@/components/form/UserInfo";
import TechStack from "@/components/form/TechStack";
import { ArrowLeft, ArrowRight } from "lucide-react";
import RelatedLink from "@/components/form/RelatedLink";
import Project from "@/components/form/Project";
import FormSubmit from "@/components/form/FormSubmit";
import usePageTitle from "@/components/hooks/usePageTitle";

export default function PortfolioEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const addPortfolio = usePortfolioStore((store) => store.addPortfolio);
  const getPortfolio = usePortfolioStore((store) => store.getPortfolio);
  const updatePortfolio = usePortfolioStore((store) => store.updatePortfolio);
  const removePortfolio = usePortfolioStore((store) => store.removePortfolio);
  const { username: currentUsername } = useAuthStore();
  
  const portfolio = isEditMode && id ? getPortfolio(id) : undefined;
  
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  usePageTitle(isEditMode ? '포트폴리오 수정' : '포트폴리오 생성');

  if (isEditMode && portfolio) {
    if (portfolio.username !== currentUsername) {
      return (
        <div className="min-h-screen flex justify-center bg-white px-4 pt-20">
          <div className="w-full max-w-xl space-y-4">
            <Alert variant="default">
              <AlertTitle>권한 없음</AlertTitle>
              <AlertDescription>
                이 포트폴리오를 수정할 권한이 없습니다.<br/>
                작성자만 수정할 수 있습니다.
              </AlertDescription>
            </Alert>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => navigate(-1)}
            >
              뒤로가기
            </Button>
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    api.on("select", () => setSelectedIndex(api.selectedScrollSnap()));
  }, [api]);

  const goToNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const goToPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const form = useForm<PortfolioData>({
    defaultValues: {
      id: id || "",
      password: "",
      description: {
        title: "",
        detail: "",
      },
      userInfo: {
        name: "",
        birthdate: "",
        email: "",
        phone: "",
        education: "",
        githubUsername: "",
        photo: "",
      },
      techStack: {
        language: [],
        frontend: [],
        backend: [],
        devops: [],
      },
      relatedLinks: [],
      projects: [],
    }
  });
 
  const { register, handleSubmit, reset, formState: { errors }, control } = form;

  useEffect(() => {
    if (isEditMode && portfolio) {
      reset({
        ...portfolio,
        password: "",
      });
    }
  }, [isEditMode, portfolio, reset]);
  
  async function fetchGithubAvatar(username: string | undefined): Promise<string | undefined> {
    if (!username) return undefined;
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) return undefined;
      const data = await res.json();
      return data.avatar_url;
    } catch (e) {
      return undefined;
    }
  }

  const onSubmit = async (data: PortfolioData) => {
    if (data.userInfo.githubUsername) {
      const avatarUrl = await fetchGithubAvatar(data.userInfo.githubUsername);
      if (avatarUrl) {
        data.userInfo.photo = avatarUrl;
      }
    }

    try {
      if (isEditMode && id) {
        await updatePortfolio({ ...data, id }); 
        toast.success("포트폴리오가 수정되었습니다.");
        navigate(`/view/${id}`);
      } else {
        const newId = await addPortfolio(data); 
        toast.success("포트폴리오가 저장되었습니다.");
        navigate(`/view/${newId}`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onError = (errors: FieldErrors<PortfolioData>) => {
    toast.error("필수 항목을 모두 입력해주세요.");

    if (errors.description) {
      api?.scrollTo(0);
      return;
    }
    if (errors.userInfo) {
      api?.scrollTo(1);
      return;
    }
    if (errors.techStack) {
      api?.scrollTo(2);
      return;
    }
    if (errors.relatedLinks) {
      api?.scrollTo(3);
      return;
    }
    if (errors.projects) {
      api?.scrollTo(4);
      return;
    }
  };

  const onDelete = async () => {
    if (!isEditMode || !id) return;

    await removePortfolio(id);
    toast.success("삭제되었습니다.");
    navigate("/");
  }

  const buttonClassName = "text-black size-8 rounded-full bg-background border border-input shadow-sm flex items-center justify-center transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"

  return (
    <div className="min-h-screen flex justify-center bg-white px-4 pt-15 pb-20">
      <Toaster position="top-center" richColors/>
      <div className="w-full max-w-xl" data-aos="fade-up" data-aos-duration="800">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full max-w-xl">
          <div className="flex items-center justify-between gap-2 mb-3 px-4">
            <Button type="button" className={buttonClassName} onClick={goToPrev}>
              <ArrowLeft />
            </Button>
            <Button type="button" className={buttonClassName} onClick={goToNext}>
              <ArrowRight />
            </Button>
            <div className="flex-1 flex justify-end">
              <Progress className="w-1/3" value={(selectedIndex / 5) * 100} />
            </div>
          </div>
          <Carousel setApi={setApi}>
            <CarouselContent>
              <CarouselItem><Description register={register} errors={errors} /></CarouselItem>
              <CarouselItem><UserInfo register={register} errors={errors} /></CarouselItem>
              <CarouselItem><TechStack register={register} errors={errors} control={control} /></CarouselItem>
              <CarouselItem><RelatedLink register={register} errors={errors} control={control} /></CarouselItem>
              <CarouselItem><Project register={register} errors={errors} control={control} /></CarouselItem>
              <CarouselItem>
                <FormSubmit 
                  register={register} 
                  errors={errors} 
                  onDelete={isEditMode ? onDelete : () => {}}
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </form>
      </div>
    </div>
  );
}