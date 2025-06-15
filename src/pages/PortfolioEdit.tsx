import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { usePortfolioStore } from "@/stores/useportfolioStore";
import type { PortfolioData } from "@/types/portfolio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
import Description from "@/components/form/Description";
import UserInfo from "@/components/form/UserInfo";
import TechStack from "@/components/form/TechStack";
import { ArrowLeft, ArrowRight } from "lucide-react";
import RelatedLink from "@/components/form/RelatedLink";
import Project from "@/components/form/Project";

import { DevTool } from '@hookform/devtools'

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
  
  const addPortfolio = usePortfolioStore((store) => store.addPortfolio);
  const getPortfolio = usePortfolioStore((store) => store.getPortfolio);
  const updatePortfolio = usePortfolioStore((store) => store.updatePortfolio);
  const portfolio = getPortfolio(id);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    // 현재 선택된 슬라이드 인덱스 추적
    setSelectedIndex(api.selectedScrollSnap());
    // 슬라이드 변경 이벤트 리스닝
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
      id: id,
      password: portfolio?.password || "",
      description: {
        title: portfolio?.description?.title || "",
        detail: portfolio?.description?.detail || "",
      },
      userInfo: {
        name: portfolio?.userInfo?.name || "",
        birthdate: portfolio?.userInfo?.birthdate || "",
        email: portfolio?.userInfo?.email || "",
        phone: portfolio?.userInfo?.phone || "",
        education: portfolio?.userInfo?.education || "",
        githubUsername: portfolio?.userInfo?.githubUsername || "",
        photo: portfolio?.userInfo?.photo || "",
      },
      techStack: {
        language: portfolio?.techStack?.language || [],
        frontend: portfolio?.techStack?.frontend || [],
        backend: portfolio?.techStack?.backend || [],
        devops: portfolio?.techStack?.devops || [],
      },
      relatedLinks: portfolio?.relatedLinks || [],
      projects: portfolio?.projects || [],
    }
  });

  const { register, handleSubmit, formState: { errors }, control } = form;
  
  async function fetchGithubAvatar(username: string | undefined): Promise<string | undefined> {
    if (!username) return undefined;
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) return undefined;
    const data = await res.json();
    return data.avatar_url;
  }

  const onSubmit = (data: PortfolioData) => {
    fetchGithubAvatar(data.userInfo.githubUsername).then((avatarUrl) => {
      if (avatarUrl) {
        data.userInfo.photo = avatarUrl;
      }

      if (portfolio === undefined) {
        addPortfolio(data);
      } else {
        updatePortfolio(data);
      }
    });
  };

  const buttonClassName = "text-black size-8 rounded-full bg-background border border-input shadow-sm flex items-center justify-center transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 px-4 pt-15">
      <div className="w-full max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl">
          <div className="flex items-center justify-between gap-2 mb-3 px-4">
            <Button type="button" className={buttonClassName} onClick={goToPrev}>
              <ArrowLeft />
            </Button>
            <Button type="button" className={buttonClassName} onClick={goToNext}>
              <ArrowRight />
            </Button>
            <div className="flex-1 flex justify-center">
              <Progress className="w-2/3" value={(selectedIndex / 4) * 100} />
            </div>
            <Button variant="default" type="submit">
              작성완료
            </Button>
          </div>
          <Carousel setApi={setApi}>
            <CarouselContent>
              <CarouselItem><Description register={register} errors={errors} /></CarouselItem>
              <CarouselItem><UserInfo register={register} errors={errors} /></CarouselItem>
              <CarouselItem><TechStack register={register} errors={errors} control={control} /></CarouselItem>
              <CarouselItem><RelatedLink register={register} errors={errors} control={control} /></CarouselItem>
              <CarouselItem><Project register={register} errors={errors} control={control} /></CarouselItem>
            </CarouselContent>
          </Carousel>
        </form>
        <DevTool control={control} />
      </div>
    </div>
  );
}
