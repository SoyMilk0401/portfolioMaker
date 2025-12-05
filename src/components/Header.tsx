import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '@/components/ui/button';

const Header = () => {
  const navigate = useNavigate();
  
  const { isLoggedIn, username, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="w-full h-16 flex items-center justify-between px-6 shadow-md bg-white mb-1 border-b">
      <Link to="/" className="text-xl font-bold hover:text-slate-600 transition">
        PortfolioMaker
      </Link>

      <nav className="flex items-center space-x-4">
        {isLoggedIn && username ? (
          <>
            <span className="text-sm text-gray-600 mr-2 flex items-center gap-1">
              <span className="font-bold text-gray-800">{username}</span>님 환영합니다
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/edit')}
            >
              포트폴리오 만들기
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/mypage')}
            >
              마이페이지
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              로그인
            </Button>
            <Button size="sm" onClick={() => navigate('/signup')}>
              회원가입
            </Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;