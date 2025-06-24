import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from '@/components/ui/spinner';
import { Link } from "react-router"
import { usePortfolioStore } from "@/stores/useportfolioStore"
import SearchPortfolioBar from "./SearchPortfolioBar"
import TechStackBadge from "./TechStackBadge"
// import CreatePortfolioButton from "./CreatePortfolioButton"

const PortfolioList = () => {
  const portfolios = usePortfolioStore((state) => state.portfolios)
  const loading = usePortfolioStore((state) => state.loading)
  const [search, setSearch] = useState("");

  const filtered_portfolios = portfolios.filter((p) => {
    const searchTerm = search.toLowerCase();

    // 1. 이름 또는 이메일에서 검색
    const matchesUserInfo =
      p.userInfo.name?.toLowerCase().includes(searchTerm) ||
      p.userInfo.email?.toLowerCase().includes(searchTerm);

    if (matchesUserInfo) return true;

    // 2. 기술 스택에서 검색
    if (p.techStack) {
      // 모든 기술 스택 배열을 하나로 합칩니다.
      // (?? []는 techStack의 각 프로퍼티가 undefined일 경우 빈 배열로 처리하여 오류를 방지합니다)
      const allTechs = [
        ...(p.techStack.language ?? []),
        ...(p.techStack.frontend ?? []),
        ...(p.techStack.backend ?? []),
        ...(p.techStack.devops ?? []),
      ];

      // 통합된 기술 스택 배열에 검색어가 포함된 항목이 있는지 확인합니다.
      const matchesTechStack = allTechs.some((tech) =>
        tech.toLowerCase().includes(searchTerm)
      );

      if (matchesTechStack) return true;
    }

    // 3. 아무것도 일치하지 않으면 필터링에서 제외
    return false;
  });

  if (loading) {
    return (
      <div className="flex items-center mt-8">
        <Spinner size="large" />
      </div>
    )
  }

  if (!loading && (!portfolios || portfolios.length === 0)) {
    return (
      <div>
        <SearchPortfolioBar value={search} onChange={setSearch} />
        <p className="text-center text-gray-500 mt-8">작성된 포트폴리오가 없습니다.</p>
        {/* <CreatePortfolioButton /> */}
      </div>
    )
  }

  return (
    <div>
      <div className="w-full max-w-2xl mx-auto px-4 mb-6" data-aos="fade-up" data-aos-delay="100">
        <SearchPortfolioBar value={search} onChange={setSearch} />
      </div>
      <div className="grid grid-cols-3 gap-6 mt-4 w-full max-w-5xl">
        {filtered_portfolios.map((p) => (
          <Link
            key={p.id}
            to={`/view/${p.id}`}
            className="block h-full"
            style={{ textDecoration: "none" }}
          >
            <Card
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 hover:scale-[1.02] h-[200px] overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <CardContent className="flex items-center gap-4 p-6 h-full">
                {/* 왼쪽: 프로필 사진 */}
                <div className="flex-shrink-0">
                  <img
                    src={p.userInfo.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.userInfo.name)}`}
                    alt="프로필"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition"
                  />
                </div>

                {/* 오른쪽: 텍스트 */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="font-semibold text-xl text-gray-800 truncate">
                    {p.userInfo.name}
                  </div>
                  <div className="text-gray-500 text-sm truncate">{p.userInfo.email}</div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {p.techStack && <TechStackBadge techStack={p.techStack} />}
                  </div>
                </div>
              </CardContent>
            </Card>

          </Link>
        ))}
        {/* <CreatePortfolioButton /> */}
      </div>
    </div>
  )
}
export default PortfolioList