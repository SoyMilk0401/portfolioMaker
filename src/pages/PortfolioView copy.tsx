import { useParams } from "react-router"
import { usePortfolioStore } from "@/stores/useportfolioStore"

function PortfolioView() {
  const { id } = useParams()
  const getPortfolio = usePortfolioStore((store) => store.getPortfolio)

  if (!id) {
    return <p className="text-center p-6">잘못된 접근입니다.</p>
  }

  const portfolio = getPortfolio(id)

  if (!portfolio) {
    return <p className="text-center p-6">포트폴리오가 없습니다.</p>
  }

  const { userInfo, techStack, relatedLinks, projects } = portfolio

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{userInfo.name}님의 포트폴리오</h1>

      <section className="mb-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-2">기본 정보</h2>
        <ul className="space-y-1">
          <li>생년월일: {userInfo.birthdate}</li>
          <li>이메일: {userInfo.email}</li>
          <li>전화번호: {userInfo.phone}</li>
        </ul>
      </section>

      <section className="mb-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-2">기술 스택</h2>
        {Object.entries(techStack).map(([k, arr]) => (
          <p key={k}>
            <strong className="capitalize">{k}:</strong> {arr.join(", ")}
          </p>
        ))}
      </section>

      <section className="mb-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-2">관련 링크</h2>
        <ul className="list-disc pl-5 space-y-1">
          {relatedLinks.map((link, i) => (
            <li key={i}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {link.name}
              </a>{" "}
              – {link.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-2">프로젝트</h2>
        {projects.map((p, i) => (
          <div key={i} className="border p-4 rounded mb-4 bg-white shadow">
            <h3 className="font-bold text-lg">{p.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{p.date}</p>
            <p className="mb-2">{p.description}</p>
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline block mb-2"
              >
                {p.url}
              </a>
            )}
            <p>기술: {p.techStack.join(", ")}</p>
            {p.video && (
              <video controls className="mt-2 w-full rounded">
                <source src={p.video} type="video/mp4" />
              </video>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}

export default PortfolioView