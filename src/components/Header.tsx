import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '@/components/ui/button';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const username = useAuthStore((state) => state.username);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-full h-16 flex items-center justify-between px-6 shadow-md bg-white mb-1">
      <Link to="/" className="text-xl font-bold hover:text-slate-600 transition">
        PortfolioMaker
      </Link>

      <nav className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <span className="text-sm text-gray-600 mr-2">
              <b>{username}</b>님 환영합니다
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
    </div>
  );
};

export default Header;