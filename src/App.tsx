import './App.css'
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import { usePortfolioStore } from '@/stores/useportfolioStore';
import { Spinner } from '@/components/ui/spinner';
import AOS from 'aos'
import 'aos/dist/aos.css'
import ScrollToTop from '@/components/ScrollToTop';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import PortfolioView from '@/pages/PortfolioView';
import PortfolioEdit from '@/pages/PortfolioEdit';
import MyPage from '@/pages/MyPage';

function App() {
  const loadAllPortfolios = usePortfolioStore((state) => state.loadAllPortfolios)
  const loading = usePortfolioStore((state) => state.loading)
  const setLoading = usePortfolioStore((state) => state.setLoading)

  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await loadAllPortfolios();
      setLoading(false);
    };
    fetchData();
  }, [loadAllPortfolios]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Header/>
        <main className="flex-grow">
          <Routes>
            <Route path='*' element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/view" element={!loading ? <PortfolioView /> : <div className="flex justify-center items-center h-full pt-20"><Spinner size="large" /></div>} />
            <Route path="/view/:id" element={!loading ? <PortfolioView /> : <div className="flex justify-center items-center h-full pt-20"><Spinner size="large" /></div>} />
            <Route path="/edit" element={!loading ? <PortfolioEdit /> : <div className="flex justify-center items-center h-full pt-20"><Spinner size="large" /></div>} />
            <Route path="/edit/:id" element={!loading ? <PortfolioEdit /> : <div className="flex justify-center items-center h-full pt-20"><Spinner size="large" /></div>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App
