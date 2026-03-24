import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, TrendingUp, Users, ChevronRight, Star, PlusCircle, Building2, Bell, User, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const stats = [
    { label: '오늘 사용자', value: '199', unit: '명', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '전체 사용자', value: '277,637', unit: '명', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: '오늘 방문회원', value: '6,244', unit: '명', icon: Star, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: '오늘 신규현장', value: '270', unit: '건', icon: Building2, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const ads = [
    { id: '1', title: '대전 문화공원 한양수자인 대행사교체', oneLiner: '계약조건변경, 수수료 익일지급, 500만원으로 입주시까지', location: '대전', siteName: '한양수자인' },
    { id: '2', title: '아산자이(민간공원 특례) 벚꽃아파트 대박분양', oneLiner: '지금이 최고의 타이밍, 준공 후 미분양아파트 혜택', location: '아산', siteName: '아산자이' },
    { id: '3', title: '포레나더샵 인천시청역 팀장,팀원 모집', oneLiner: '대박현장, 광고비 지원, 브리핑 해주는 본부장입니다', location: '인천', siteName: '포레나더샵' },
    { id: '4', title: '두산위브 더 센트럴 도화 팀장 직원 모십니다', oneLiner: '파격적인 조건 변경, 투자금 Zero~', location: '인천', siteName: '두산위브' },
    { id: '5', title: '대전 용전 마루힐 SKY 46', oneLiner: '경기불황에도 진짜민간임대는 완판됩니다', location: '대전', siteName: '마루힐 스카이' },
    { id: '6', title: '서울 건대 [더라움 펜트하우스] 모집', oneLiner: '한강뷰 복층, 바로 입주 가능한 희소성 상품', location: '서울', siteName: '더라움' },
    { id: '7', title: '잘 나가는 주상복합 현장 소수정예 팀 모집', oneLiner: '*아파트 완판* *파격조건* *최고상권*', location: '전국', siteName: '주상복합' },
    { id: '8', title: '양평 대박수수료 일반분양 비교대상 없는 아파트', oneLiner: '속보 서울 양평 고속도로 공사재개', location: '양평', siteName: '일반분양' },
    { id: '9', title: '인천 검증된 안정성! 도시개발사업현장', oneLiner: '힘든 시장에서도 꾸준히 계약 나오는 현장!', location: '인천', siteName: '도시개발' },
  ];

  return (
    <div className="space-y-12 pb-24">
      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const linkTo = idx === 3 ? '/field-info' : '/jobs';
          return (
            <Link key={idx} to={linkTo} className="block">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`${stat.bg} p-6 rounded-[2rem] border border-white shadow-sm flex flex-col items-center text-center group hover:shadow-lg transition-all h-full`}
              >
                <div className={`${stat.color} mb-3 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                  <span className="text-xs font-bold text-gray-500">{stat.unit}</span>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </section>

      {/* Search Bar */}
      <section className="max-w-3xl mx-auto w-full">
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full group-hover:bg-blue-600/30 transition-all" />
          <div className="relative bg-white p-2 rounded-full shadow-2xl border border-gray-100 flex items-center">
            <div className="flex-grow flex items-center px-6 gap-3">
              <Search className="text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="지역 또는 현장명을 입력해주세요" 
                className="w-full py-4 bg-transparent text-gray-900 focus:outline-none text-base font-medium placeholder:text-gray-300"
              />
            </div>
            <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              검색하기
            </button>
          </div>
        </div>
      </section>

      {/* AD Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            프리미엄 채용 현장
          </h2>
          <Link to="/jobs" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
            전체보기 <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad, idx) => (
            <Link
              key={ad.id}
              to={`/jobs/${ad.id}`}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white border border-gray-100 rounded-[2rem] p-6 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-50 transition-all cursor-pointer relative overflow-hidden h-full"
              >
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-bl-2xl">AD</div>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{ad.location}</span>
                    <span className="text-xs font-bold text-blue-600">{ad.siteName}</span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors leading-tight">{ad.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-6 font-medium">{ad.oneLiner}</p>
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] text-gray-300 font-bold">
                      <Calendar size={12} />
                      <span>2026-03-24</span>
                    </div>
                    <span className="text-blue-600 font-black text-xs group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      상세보기 <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-blue-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -ml-32 -mb-32" />
        
        <div className="space-y-4 text-center md:text-left relative z-10">
          <h3 className="text-3xl md:text-4xl font-black leading-tight">새로운 분양 현장을<br />지금 바로 등록해보세요!</h3>
          <p className="opacity-80 font-medium text-lg">가장 빠르고 정확한 분양 현장 정보, 히트분양에서 최고의 인재를 만나보세요.</p>
        </div>
        <Link 
          to="/post-job"
          className="bg-white text-blue-600 px-10 py-5 rounded-[2rem] font-black flex items-center gap-3 hover:scale-105 transition-transform shadow-xl relative z-10"
        >
          <PlusCircle size={24} />
          구인글 등록하기
        </Link>
      </section>
    </div>
  );
}
