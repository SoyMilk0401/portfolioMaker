import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";

import type { PortfolioData } from "@/types/portfolio";
import { usePortfolioStore } from "@/stores/useportfolioStore";
import UserInfo from "@/components/form/UserInfo";

export default function PortfolioEdit() {
  const { id } = useParams();
  console.log("PortfolioEdit id:", id);

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

  const form = useForm<PortfolioData>({
    defaultValues: {
      id: id,
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
        photo: portfolio?.userInfo.photo || "",
        githubUsername: portfolio?.userInfo.githubUsername || "",
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

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  useEffect(() => {
    reset({
      id: id,
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
        photo: portfolio?.userInfo.photo || "",
        githubUsername: portfolio?.userInfo.githubUsername || "",
      },
      techStack: {
        language: portfolio?.techStack?.language || [],
        frontend: portfolio?.techStack?.frontend || [],
        backend: portfolio?.techStack?.backend || [],
        devops: portfolio?.techStack?.devops || [],
      },
      relatedLinks: portfolio?.relatedLinks || [],
      projects: portfolio?.projects || [],
    });
  }, [id, portfolio, reset]);
  
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
        updatePortfolio(id, data);
      }
    });
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl">
        <UserInfo register={register} errors={errors} />
        <Button variant="default" type="submit">저장하기</Button>
      </form>
    </div>
  );
}
