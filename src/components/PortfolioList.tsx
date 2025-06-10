import { usePortfolioStore } from "@/stores/useportfolioStore"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Link } from "react-router"

const PortfolioList = () => {
  const portfolios = usePortfolioStore((state) => state.portfolios)

  if (!portfolios || portfolios.length === 0) {
    return <p className="text-center text-gray-500 mt-8">작성된 포트폴리오가 없습니다.</p>
  }

  return (
    <div className="grid gap-6 mt-8 w-full max-w-2xl">
      {portfolios.map((p) => (
        <Card key={p.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{p.userInfo.name}님의 포트폴리오</CardTitle>
            <CardDescription>{p.userInfo.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              to={`/portfolio/${p.id}`}
              className="text-blue-600 hover:underline text-sm"
            >
              자세히 보기
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
export default PortfolioList