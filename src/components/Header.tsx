import { Link, useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 flex items-center justify-between px-6 shadow-md bg-white mb-1">
      <Link to="/" className="text-xl font-bold hover:text-slate-600 transition">
        PortfolioMaker
      </Link>

      <nav className="space-x-4">
        <button
          onClick={() => navigate(`/edit/${uuidv4()}`)}
          className="text-sm text-gray-700 hover:text-slate-400 transition">
          포트폴리오 만들기
        </button>
        <Link 
          to={`/edit/c6e7c432-b26e-49d0-bc9f-46c98a2e4a3b`} 
          className="text-sm text-gray-700 hover:text-slate-400 transition">
          포트폴리오 만들기
        </Link>
      </nav>
    </div>
  );
};

export default Header;
