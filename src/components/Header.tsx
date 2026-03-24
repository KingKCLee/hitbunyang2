import { Link, useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { auth } from '../firebase';
import { UserProfile } from '../types';
import { LogOut, User as UserIcon, PlusCircle, Search, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  profile: UserProfile | null;
}

export default function Header({ user, profile }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://kingkclee.github.io/hitbunyang2/logo.png" alt="히트분양" className="h-8 w-auto" referrerPolicy="no-referrer" />
            <span className="text-xl font-black text-hit-navy tracking-tighter hidden sm:inline">히트분양</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-bold text-gray-600">
            <Link to="/sites" className="hover:text-hit-red transition-colors">현장찾기</Link>
            <Link to="/hitmap" className="hover:text-hit-red transition-colors">히트맵</Link>
            <Link to="/ranking" className="hover:text-hit-red transition-colors">히트랭킹</Link>
            <Link to="/community" className="hover:text-hit-red transition-colors">커뮤니티</Link>
            <Link to="/tv" className="hover:text-hit-red transition-colors">히트분양TV</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:text-hit-navy transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-hit-navy transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-hit-red rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 group-hover:border-hit-blue transition-colors">
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=1C2D5A&color=fff`} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-bold text-gray-700 hidden md:inline group-hover:text-hit-navy">{user.displayName}님</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-xs font-medium text-gray-400 hover:text-hit-red transition-colors"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="text-sm font-bold text-gray-700 hover:text-hit-navy transition-colors"
            >
              로그인/회원가입
            </Link>
          )}
          
          <button className="lg:hidden p-2 text-gray-500">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
