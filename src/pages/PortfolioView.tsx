import { useParams } from "react-router";
import { usePortfolioStore } from "@/stores/useportfolioStore"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ViewDescription from "@/components/viwer/ViewDescription";
import ViewUserInfo from "@/components/viwer/ViewUserInfo";
import ViewTechStack from "@/components/viwer/ViewTechStack";

export default function PortfolioVirw() {
  const { id } = useParams();
  const getPortfolio = usePortfolioStore((store) => store.getPortfolio);

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

  const portfolio = getPortfolio(id)

  if (!portfolio) {
    return (
      <div className="p-6 max-w-xl mx-auto space-y-4">
        <Alert variant="default">
          <AlertTitle>잘못된 접근</AlertTitle>
          <AlertDescription>
            포트폴리오가 없습니다.
          </AlertDescription>
        </Alert>
      </div>
    )
  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10 space-y-20">
      <ViewDescription description={portfolio.description} />
      <ViewUserInfo userinfo={portfolio.userInfo}/>
      {portfolio.techStack && <ViewTechStack techstack={portfolio.techStack} />}
    </div>
  )

}