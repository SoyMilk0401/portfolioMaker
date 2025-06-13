import './App.css'
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import { usePortfolioStore } from './stores/useportfolioStore';
import Header from '@/components/Header';
import HomePage from '@/pages/Home';
import PortfolioView from '@/pages/PortfolioView';
import PortfolioEdit from '@/pages/PortfolioEdit';

function App() {
  const loadAllPortfolios = usePortfolioStore((state) => state.loadAllPortfolios)

  useEffect(() => {
    const fetchData = async () => {
      await loadAllPortfolios();
    };
    fetchData();
  }, [loadAllPortfolios]);

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
  );
}

export default App
