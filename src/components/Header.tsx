import { Link } from 'react-router';

const Header = () => {
  return (
    <div className="w-full h-16 flex items-center justify-between px-6 shadow-md bg-white mb-1">
      {/* 로고 */}
      <Link to="/" className="text-xl font-bold">
        PortfolioMaker
      </Link>

      {/* 네비게이션 링크 */}
      <nav className="space-x-4">
        <Link to="/signup" className="text-sm text-gray-700 hover:text-blue-500">
          회원가입
        </Link>
        <Link to="/login" className="text-sm text-gray-700 hover:text-blue-500">
          로그인
        </Link>
        <Link to="/portfolio/0" className="text-sm text-gray-700 hover:text-blue-500">
          포트폴리오뷰
        </Link>
        <Link to="/edit" className="text-sm text-gray-700 hover:text-blue-500">
          포트폴리오에딧
        </Link>
      </nav>
    </div>
  );
};

export default Header;
