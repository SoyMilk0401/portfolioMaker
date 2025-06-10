import PortfolioList from "@/components/PortfolioList"

function Home() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6">
        MyPortfolio
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center">
        나만의 포트폴리오를 손쉽게 만들고 공유하세요.
        직관적인 UI로 누구나 멋진 소개 페이지를 제작할 수 있습니다.
      </p>
      <PortfolioList />
    </div>
  )
}

export default Home