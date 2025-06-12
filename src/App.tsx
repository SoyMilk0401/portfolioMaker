import './App.css'
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import { v4 as uuidv4 } from 'uuid';
import { usePortfolioStore } from './stores/useportfolioStore';
import type { PortfolioData } from './types/portfolio';
import Header from '@/components/Header';
import HomePage from '@/pages/Home';
import PortfolioView from '@/pages/PortfolioView';
import PortfolioEdit from '@/pages/PortfolioEdit';

function hasPortfolioInStorage() {
  return Object.keys(localStorage).some(key => key.startsWith('portfolio-'));
}

function App() {
  const addPortfolio = usePortfolioStore((store) => store.addPortfolio);

  useEffect(() => {
    // 테스트용 기본 포트폴리오 5개
    if (hasPortfolioInStorage()) return;

    const defaults: PortfolioData[] = [
      {
        id: uuidv4(),
        description: { title: "프론트엔드 개발자", detail: "React와 TypeScript를 주로 사용합니다." },
        userInfo: {
          name: "홍길동",
          birthdate: "1990-01-01",
          email: "hong@test.com",
          phone: "010-1111-1111",
          education: "서울대학교 컴퓨터공학과",
          githubUsername: "hongdev",
          photo: "",
        },
        techStack: {
          language: ["JavaScript", "TypeScript"],
          frontend: ["React", "Redux"],
          backend: ["Node.js"],
          devops: ["Docker"],
        },
        relatedLinks: [
          { name: "GitHub", url: "https://github.com/hongdev", description: "개인 깃허브" },
        ],
        projects: [
          {
            title: "포트폴리오 사이트",
            date: "2023-01",
            description: "개인 포트폴리오 웹사이트 개발",
            url: "https://portfolio.com/hong",
            techStack: ["React", "TypeScript"],
            video: "",
          },
        ],
      },
      {
        id: uuidv4(),
        description: { title: "백엔드 엔지니어", detail: "Spring과 AWS를 다룹니다." },
        userInfo: {
          name: "이몽룡",
          birthdate: "1992-05-10",
          email: "lee@test.com",
          phone: "010-2222-2222",
          education: "고려대학교 소프트웨어학과",
          githubUsername: "leeml",
          photo: "",
        },
        techStack: {
          language: ["Java", "Kotlin"],
          frontend: ["Vue"],
          backend: ["Spring", "Express"],
          devops: ["AWS", "Jenkins"],
        },
        relatedLinks: [
          { name: "Blog", url: "https://blog.com/leeml", description: "기술 블로그" },
        ],
        projects: [
          {
            title: "API 서버",
            date: "2022-08",
            description: "대규모 API 서버 개발",
            url: "",
            techStack: ["Spring", "AWS"],
            video: "",
          },
        ],
      },
      {
        id: uuidv4(),
        description: { title: "풀스택 개발자", detail: "웹과 앱 모두 개발합니다." },
        userInfo: {
          name: "성춘향",
          birthdate: "1995-03-15",
          email: "sung@test.com",
          phone: "010-3333-3333",
          education: "연세대학교 정보대학원",
          githubUsername: "sungch",
          photo: "",
        },
        techStack: {
          language: ["Python", "JavaScript"],
          frontend: ["React Native"],
          backend: ["Django", "Flask"],
          devops: ["GitHub Actions"],
        },
        relatedLinks: [
          { name: "포트폴리오", url: "https://portfolio.com/sung", description: "대표 포트폴리오" },
        ],
        projects: [
          {
            title: "모바일 앱",
            date: "2024-02",
            description: "React Native로 앱 개발",
            url: "",
            techStack: ["React Native", "Django"],
            video: "",
          },
        ],
      },
      {
        id: uuidv4(),
        description: { title: "AI 엔지니어", detail: "머신러닝과 딥러닝 프로젝트 경험 다수" },
        userInfo: {
          name: "강감찬",
          birthdate: "1988-12-30",
          email: "kang@test.com",
          phone: "010-4444-4444",
          education: "KAIST AI 대학원",
          githubUsername: "kangai",
          photo: "",
        },
        techStack: {
          language: ["Python", "R"],
          frontend: [],
          backend: ["Flask"],
          devops: ["GCP"],
        },
        relatedLinks: [
          { name: "Kaggle", url: "https://kaggle.com/kangai", description: "캐글 프로필" },
        ],
        projects: [
          {
            title: "이미지 분류",
            date: "2023-11",
            description: "딥러닝 기반 이미지 분류 프로젝트",
            url: "",
            techStack: ["PyTorch", "Flask"],
            video: "",
          },
        ],
      },
      {
        id: uuidv4(),
        description: { title: "DevOps 엔지니어", detail: "CI/CD와 클라우드 자동화 전문가" },
        userInfo: {
          name: "최지우",
          birthdate: "1993-07-21",
          email: "choi@test.com",
          phone: "010-5555-5555",
          education: "POSTECH 전산학과",
          githubUsername: "choidevops",
          photo: "",
        },
        techStack: {
          language: ["Go", "Shell"],
          frontend: [],
          backend: ["Go"],
          devops: ["Kubernetes", "Terraform"],
        },
        relatedLinks: [
          { name: "DevOps Blog", url: "https://devops.com/choi", description: "DevOps 관련 블로그" },
        ],
        projects: [
          {
            title: "클라우드 자동화",
            date: "2024-05",
            description: "Terraform과 Kubernetes로 클라우드 자동화",
            url: "",
            techStack: ["Terraform", "Kubernetes"],
            video: "",
          },
        ],
      },
    ];
    // 이미 추가된 id는 중복 추가 방지
    defaults.forEach((p) => {
      addPortfolio(p);
    });
  }, [addPortfolio]);

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='*' element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/view" element={<PortfolioView />} />
        <Route path="/view/:id" element={<PortfolioView />} />
        <Route path="/edit" element={<PortfolioEdit />} />
        <Route path="/edit/:id" element={<PortfolioEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
