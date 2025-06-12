import { usePortfolioStore } from "@/stores/useportfolioStore"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router"
import CreatePortfolioButton from "./CreatePortfolioButton"
import TechStackBadge from "./TechStackBadge"

const PortfolioList = () => {
  const portfolios = usePortfolioStore((state) => state.portfolios)

  if (!portfolios || portfolios.length === 0) {
    return (
      <div>
        <p className="text-center text-gray-500 mt-8">작성된 포트폴리오가 없습니다.</p>
        <CreatePortfolioButton />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-6 mt-8 w-full max-w-2xl">
      {portfolios.map((p) => (
        <Link
          key={p.id}
          to={`/view/${p.id}`}
          className="block h-full"
          style={{ textDecoration: "none" }}
        >
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-[180px] flex flex-col justify-between">
            <CardContent className="flex items-center gap-4 p-4 h-full">
              {/* 왼쪽: 증명사진 */}
              <div className="flex-shrink-0">
                <img
                  src={p.userInfo.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.userInfo.name)}`}
                  alt="프로필"
                  className="w-16 h-16 rounded-full object-cover border"
                />
              </div>
              {/* 오른쪽: 이름, 이메일, 기술스택 */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="font-semibold text-lg truncate">{p.userInfo.name}님의 포트폴리오</div>
                <div className="text-gray-500 text-sm truncate">{p.userInfo.email}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.techStack && <TechStackBadge techStack={p.techStack} />}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
      <CreatePortfolioButton />
    </div>
  )
}
export default PortfolioList