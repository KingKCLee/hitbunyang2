import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src="https://ais-dev-4quxzxybn5bhngpvcp7rpt-340194685499.asia-east1.run.app/logo.png" alt="히트분양" className="h-10 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" referrerPolicy="no-referrer" />
            </Link>
            <p className="text-sm text-gray-500 max-w-md leading-relaxed font-medium mb-8">
              히트분양은 데이터 기반의 히트지수를 통해 가장 핫한 분양 현장을 연결하는 
              분양상담사 전문 구인구직 플랫폼입니다. 
              커뮤니티와 영상 콘텐츠를 통해 업계 최고의 정보를 제공합니다.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-hit-navy hover:text-white transition-all">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-hit-navy hover:text-white transition-all">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.359-2.618-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-hit-navy hover:text-white transition-all">
                <span className="sr-only">YouTube</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6">서비스</h4>
            <ul className="text-sm text-gray-500 space-y-4 font-medium">
              <li><Link to="/sites" className="hover:text-hit-navy transition-colors">현장찾기</Link></li>
              <li><Link to="/hitmap" className="hover:text-hit-navy transition-colors">히트맵</Link></li>
              <li><Link to="/ranking" className="hover:text-hit-navy transition-colors">히트랭킹</Link></li>
              <li><Link to="/community" className="hover:text-hit-navy transition-colors">커뮤니티</Link></li>
              <li><Link to="/tv" className="hover:text-hit-navy transition-colors">히트분양TV</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6">고객지원</h4>
            <ul className="text-sm text-gray-500 space-y-4 font-medium">
              <li><Link to="/support" className="hover:text-hit-navy transition-colors">공지사항</Link></li>
              <li><Link to="/support" className="hover:text-hit-navy transition-colors">고객센터</Link></li>
              <li><Link to="/ad-info" className="hover:text-hit-navy transition-colors">광고안내</Link></li>
              <li><Link to="/support" className="hover:text-hit-navy transition-colors">1:1 문의</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-gray-400 font-medium">
              <span>상호: 더블유부동산</span>
              <span>대표: 이광철</span>
              <span>사업자번호: 589-24-01721</span>
              <span>브랜드: 히트분양</span>
              <span>주소: 서울특별시 강남구 테헤란로</span>
            </div>
            <div className="flex gap-6 text-[13px] text-gray-500 font-bold">
              <Link to="/support" className="hover:text-hit-navy">이용약관</Link>
              <Link to="/support" className="hover:text-hit-navy">개인정보처리방침</Link>
            </div>
          </div>
          <p className="mt-8 text-[12px] text-gray-400 font-medium">© 2026 히트분양. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
