import usePageTitle from "@/components/hooks/usePageTitle"
import PortfolioList from "@/components/PortfolioList"

function Home() {

  usePageTitle('PortfolioMaker')

  return (
    <div className="flex flex-col items-center justify-start min-h-[40vh] mt-12 text-center px-4">
      <h1 data-aos="fade-up" className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6">
        PortfolioMaker
      </h1>
      <p data-aos="fade-up" data-aos-delay="100" className="text-base sm:text-lg md:text-xl text-gray-600 text-center">
        나만의 포트폴리오를 손쉽게 만들어보세요.
        직관적인 UI로 누구나 멋진 소개 페이지를 제작할 수 있습니다.
      </p>
      <PortfolioList />
    </div>
  )
}

export default Home