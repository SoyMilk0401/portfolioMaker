import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { usePortfolioStore } from "@/stores/useportfolioStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ViewDescription from "@/components/viwer/ViewDescription";
import ViewUserInfo from "@/components/viwer/ViewUserInfo";
import ViewTechStack from "@/components/viwer/ViewTechStack";
import ViewRelatedLink from "@/components/viwer/ViewRelatedLink";
import ViewProject from "@/components/viwer/ViewProject";
import usePageTitle from "@/components/hooks/usePageTitle";
import { ChevronLeft, Edit2 } from "lucide-react";

export default function PortfolioView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const getPortfolio = usePortfolioStore((store) => store.getPortfolio);
  
  const { username: currentUsername, isLoggedIn } = useAuthStore();
  const [showAuthAlert, setShowAuthAlert] = useState(false);

  if (!id?.trim()) {
    return (
      <div className="p-6 max-w-xl mx-auto space-y-4 mt-10">
        <Alert variant="destructive">
          <AlertTitle>잘못된 접근</AlertTitle>
          <AlertDescription>유효하지 않은 포트폴리오 ID입니다.</AlertDescription>
        </Alert>
        <Button onClick={() => navigate("/")}>메인으로 돌아가기</Button>
      </div>
    );
  }

  const portfolio = getPortfolio(id);

  if (!portfolio) {
    return (
      <div className="p-6 max-w-xl mx-auto space-y-4 mt-10">
        <Alert variant="destructive">
          <AlertTitle>포트폴리오 없음</AlertTitle>
          <AlertDescription>해당 포트폴리오를 찾을 수 없습니다.</AlertDescription>
        </Alert>
        <Button onClick={() => navigate("/")}>메인으로 돌아가기</Button>
      </div>
    );
  }

  usePageTitle(`${portfolio.userInfo.name}님의 포트폴리오`);

  const handleEditClick = (e: React.MouseEvent) => {
    if (!isLoggedIn || portfolio.username !== currentUsername) {
      e.preventDefault();
      setShowAuthAlert(true);
    } else {
        navigate(`/edit/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1 text-gray-600 hover:text-gray-900">
            <ChevronLeft size={18} /> 뒤로가기
          </Button>
          {isLoggedIn && portfolio.username === currentUsername && (
             <Button variant="outline" size="sm" onClick={handleEditClick} className="gap-2 border-gray-300">
                <Edit2 size={14} /> 수정하기
             </Button>
          )}
        </div>
      </div>

      <main className="flex flex-col">
        <section className="pt-20 pb-24 px-4 bg-white">
            <ViewDescription description={portfolio.description} />
        </section>

        <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
            <ViewUserInfo userinfo={portfolio.userInfo} />
        </section>

        {portfolio.techStack && (
            <section className="py-24 px-4 bg-white">
                <ViewTechStack techstack={portfolio.techStack} />
            </section>
        )}

        {portfolio.projects && portfolio.projects.length > 0 && (
             <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
                <ViewProject project={portfolio.projects} />
             </section>
        )}

        {portfolio.relatedLinks && portfolio.relatedLinks.length > 0 && (
            <section className="pt-24 pb-40 px-4 bg-white">
                <ViewRelatedLink relatedlink={portfolio.relatedLinks} />
            </section>
        )}
      </main>

      <AlertDialog open={showAuthAlert} onOpenChange={setShowAuthAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>권한 없음</AlertDialogTitle>
            <AlertDialogDescription>
              작성자만 수정할 수 있습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAuthAlert(false)}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}