import { Link, useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { auth } from '../firebase';
import { UserProfile } from '../types';
import { LogOut, User as UserIcon, PlusCircle, Search } from 'lucide-react';

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
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-blue-600 tracking-tighter">히트분양</span>
          <span className="hidden sm:inline text-[10px] font-black text-white bg-blue-500 px-2 py-0.5 rounded-full uppercase tracking-widest">HIT</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-gray-600">
          <Link to="/jobs" className="hover:text-blue-600 transition-colors">채용정보</Link>
          <Link to="/recruit/regional" className="hover:text-blue-600 transition-colors">지역현장</Link>
          <Link to="/siteMap" className="hover:text-blue-600 transition-colors">지도현장</Link>
          <Link to="/field-info" className="hover:text-blue-600 transition-colors">현장정보</Link>
          <Link to="/community" className="hover:text-blue-600 transition-colors">커뮤니티</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 rounded-full transition-all border border-transparent hover:border-gray-100">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200">
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold text-gray-700 hidden sm:inline">마이페이지</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-xs font-bold text-gray-400 hover:text-red-500 px-3 py-1.5 transition-colors"
              >
                로그아웃
              </button>
              {profile?.role === 'company' && (
                <Link 
                  to="/post-job" 
                  className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full text-xs font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  <PlusCircle size={14} />
                  <span>공고등록</span>
                </Link>
              )}
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
