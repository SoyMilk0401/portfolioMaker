import './App.css'
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import { usePortfolioStore } from './stores/useportfolioStore';
import { Spinner } from '@/components/ui/spinner';
import AOS from 'aos'
import 'aos/dist/aos.css'
import ScrollToTop from '@/components/ScrollToTop';
import Header from '@/components/Header';
import HomePage from '@/pages/Home';
import PortfolioView from '@/pages/PortfolioView';
import PortfolioEdit from '@/pages/PortfolioEdit';

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
      <ScrollToTop />
      <Header/>
      <Routes>
        <Route path='*' element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/view" element={!loading ? <PortfolioView /> : <Spinner size="large" className='flex items-center mt-8' />} />
        <Route path="/view/:id" element={!loading ? <PortfolioView /> : <Spinner size="large" className='flex items-center mt-8' />} />
        <Route path="/edit" element={!loading ? <PortfolioEdit /> : <Spinner size="large" className='flex items-center mt-8' />} />
        <Route path="/edit/:id" element={!loading ? <PortfolioEdit /> : <Spinner size="large" className='flex items-center mt-8' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
