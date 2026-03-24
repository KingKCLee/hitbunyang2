import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-black text-blue-600 tracking-tighter mb-4 block text-blue-600">히트분양</span>
            <p className="text-sm text-gray-500 max-w-md leading-relaxed font-medium">
              히트분양은 더블유부동산에서 제공하는 분양상담사 구인구직 1위 서비스입니다. 
              가장 빠르고 정확한 분양 현장 정보를 제공하여 최고의 인재와 현장을 연결합니다.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6">서비스</h4>
            <ul className="text-sm text-gray-400 space-y-3 font-bold">
              <li><Link to="/jobs" className="hover:text-blue-600 transition-colors">채용정보</Link></li>
              <li><Link to="/field-info" className="hover:text-blue-600 transition-colors">현장정보</Link></li>
              <li><Link to="/community" className="hover:text-blue-600 transition-colors">커뮤니티</Link></li>
              <li><Link to="/events" className="hover:text-blue-600 transition-colors">이벤트</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6">고객지원</h4>
            <ul className="text-sm text-gray-400 space-y-3 font-bold">
              <li><Link to="/notice" className="hover:text-blue-600 transition-colors">공지사항</Link></li>
              <li><Link to="/support" className="hover:text-blue-600 transition-colors">고객센터</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 transition-colors">이용약관</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">개인정보처리방침</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">© 2026 히트분양. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] text-gray-400 font-bold">
            <span>상호: 더블유부동산</span>
            <span>대표: 이광철</span>
            <span>사업자번호: 589-24-01721</span>
            <span>브랜드: 히트분양</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
