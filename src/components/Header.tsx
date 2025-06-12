import { Link } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

const Header = () => {
  return (
    <div className="w-full h-16 flex items-center justify-between px-6 shadow-md bg-white mb-1">
      {/* 로고 */}
      <Link to="/" className="text-xl font-bold hover:text-slate-600 transition">
        PortfolioMaker
      </Link>

      {/* 네비게이션 링크 */}
      <nav className="space-x-4">
        <Link 
          to={`/edit/${uuidv4()}`} 
          className="text-sm text-gray-700 hover:text-slate-400 transition">
          포트폴리오 만들기
        </Link>
      </nav>
    </div>
  );
};

export default Header;
