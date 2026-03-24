import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, TrendingUp, Users, ChevronRight, Star, PlusCircle, Building2, Bell, User, Calendar, Play, MessageSquare, Newspaper, ArrowRight, Flame, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const hitTop5 = [
    { id: '1', title: '강남 루시아 도산 208', location: '서울 강남', commission: '1,500만원', hitIndex: 98, agency: '대우건설', tags: ['HOT', '급구'] },
    { id: '2', title: '해운대 엘시티 더샵', location: '부산 해운대', commission: '2,000만원', hitIndex: 95, agency: '포스코이앤씨', tags: ['NEW'] },
    { id: '3', title: '송도 아크베이', location: '인천 연수', commission: '1,200만원', hitIndex: 92, agency: '현대건설', tags: ['HOT'] },
    { id: '4', title: '판교 밸리자이', location: '경기 성남', commission: '1,800만원', hitIndex: 89, agency: 'GS건설', tags: ['급구'] },
    { id: '5', title: '광주 상무 센트럴자이', location: '광주 서구', commission: '1,400만원', hitIndex: 87, agency: 'GS건설', tags: ['NEW'] },
  ];

  const hitAds = [
    { id: 'a1', title: '평택 브레인시티 중흥S-클래스 대행사 모집', location: '경기 평택', commission: '800만원', deposit: '10%', dailyExp: '5만원', tier: 'hit' },
    { id: 'a2', title: '천안 아이파크 시티 팀장/팀원 급구', location: '충남 천안', commission: '1,000만원', deposit: '5%', dailyExp: '3만원', tier: 'hit' },
    { id: 'a3', title: '청주 동일하이빌 파크레인 2단지', location: '충북 청주', commission: '700만원', deposit: '10%', dailyExp: '4만원', tier: 'premium' },
    { id: 'a4', title: '김해 삼계 푸르지오 센트럴파크', location: '경남 김해', commission: '900만원', deposit: '5%', dailyExp: '5만원', tier: 'premium' },
    { id: 'a5', title: '의정부 푸르지오 클라시엘', location: '경기 의정부', commission: '600만원', deposit: '10%', dailyExp: '3만원', tier: 'standard' },
    { id: 'a6', title: '군산 지곡 한라비발디 2차', location: '전북 군산', commission: '850만원', deposit: '5%', dailyExp: '4만원', tier: 'standard' },
  ];

  const latestJobs = [
    { id: 'l1', title: '동탄역 대방 엘리움 더 시그니처', location: '경기 화성', type: '아파트', role: '팀원', commission: '1,200만원', experience: '무관', date: '방금 전', agency: '대방건설', hitIndex: 85 },
    { id: 'l2', title: '고양 장항 카이브 유보라', location: '경기 고양', type: '오피스텔', role: '팀장', commission: '1,500만원', experience: '1년 이상', date: '5분 전', agency: '반도건설', hitIndex: 78 },
    { id: 'l3', title: '청주 테크노폴리스 아테라', location: '충북 청주', type: '아파트', role: '본부장', commission: '2,000만원', experience: '5년 이상', date: '12분 전', agency: '금호건설', hitIndex: 92 },
    { id: 'l4', title: '산성역 헤리스톤', location: '경기 성남', type: '아파트', role: '팀원', commission: '1,000만원', experience: '무관', date: '20분 전', agency: '대우건설', hitIndex: 65 },
  ];

  return (
    <div className="bg-white">
      {/* Section A: Hero Area */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
            alt="Hero Background" 
            className="w-full h-full object-cover blur-[2px] brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white mb-12 tracking-tight"
          >
            대박 현장은 <span className="text-hit-red">여기서</span> 시작
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl p-2 rounded-3xl border border-white/20 shadow-2xl mb-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                <select className="bg-white/10 text-white border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-hit-red outline-none appearance-none cursor-pointer font-bold">
                  <option className="text-gray-900">전체 지역</option>
                  <option className="text-gray-900">서울</option>
                  <option className="text-gray-900">경기</option>
                  <option className="text-gray-900">인천</option>
                </select>
                <select className="bg-white/10 text-white border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-hit-red outline-none appearance-none cursor-pointer font-bold">
                  <option className="text-gray-900">전체 업종</option>
                  <option className="text-gray-900">아파트</option>
                  <option className="text-gray-900">오피스텔</option>
                  <option className="text-gray-900">상가</option>
                </select>
                <input 
                  type="text" 
                  placeholder="현장명 또는 수수료 검색" 
                  className="bg-white/10 text-white border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-hit-red outline-none placeholder:text-white/50 font-bold"
                />
              </div>
              <button className="w-full md:w-auto bg-hit-red text-white px-12 py-4 rounded-2xl font-black hover:bg-red-600 transition-all shadow-xl shadow-red-500/20">
                현장 찾기
              </button>
            </div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">오늘 신규 현장</p>
              <p className="text-white text-3xl font-black">270<span className="text-sm font-medium ml-1">건</span></p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">전체 현장</p>
              <p className="text-white text-3xl font-black">12,482<span className="text-sm font-medium ml-1">건</span></p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">지금 접속</p>
              <p className="text-white text-3xl font-black">1,244<span className="text-sm font-medium ml-1">명</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Section B: Hit TOP 5 */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-hit-navy mb-2 flex items-center gap-2">
                <Trophy className="text-hit-red" /> 히트 TOP 5
              </h2>
              <p className="text-gray-500 font-medium">실시간 히트지수 기반 가장 핫한 현장 랭킹</p>
            </div>
            <Link to="/ranking" className="text-sm font-bold text-gray-400 hover:text-hit-navy flex items-center gap-1">
              전체 랭킹 보기 <ChevronRight size={16} />
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar">
            {hitTop5.map((item, idx) => (
              <Link 
                key={item.id}
                to={`/jobs/${item.id}`}
                className="min-w-[300px] bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative group cursor-pointer block"
              >
                <motion.div whileHover={{ y: -10 }}>
                  <div className="absolute top-6 right-6 flex gap-1">
                    {item.tags.map(tag => (
                      <span key={tag} className={`text-[10px] font-black px-2 py-1 rounded-md ${tag === 'HOT' ? 'bg-red-100 text-red-600' : tag === 'NEW' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-black text-gray-100 group-hover:text-hit-red/20 transition-colors">0{idx + 1}</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                      <MapPin size={12} /> {item.location}
                    </div>
                    <h3 className="text-xl font-black text-hit-navy line-clamp-1">{item.title}</h3>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">수수료</p>
                        <p className="text-lg font-black text-hit-red">{item.commission}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-hit-red font-black text-sm mb-1">
                          <Flame size={14} fill="currentColor" /> {item.hitIndex}
                        </div>
                        <p className="text-[10px] font-bold text-gray-400">{item.agency}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section C: Hit AD */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-hit-navy">히트 AD</h2>
            <Link to="/ad-info" className="text-sm font-bold text-hit-blue hover:underline">광고 안내</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hitAds.map((ad) => (
              <Link 
                key={ad.id} 
                to={`/jobs/${ad.id}`}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all block"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${ad.id}/600/400`} 
                    alt={ad.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${ad.tier === 'hit' ? 'bg-hit-red text-white' : ad.tier === 'premium' ? 'bg-hit-navy text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {ad.tier} AD
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-hit-blue">{ad.location}</span>
                  </div>
                  <h3 className="text-lg font-black text-hit-navy mb-4 line-clamp-2 h-14 leading-tight">{ad.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-gray-50 text-gray-500 text-[11px] font-bold px-3 py-1 rounded-lg">수수료 {ad.commission}</span>
                    <span className="bg-gray-50 text-gray-500 text-[11px] font-bold px-3 py-1 rounded-lg">계약금 {ad.deposit}</span>
                    <span className="bg-gray-50 text-gray-500 text-[11px] font-bold px-3 py-1 rounded-lg">일비 {ad.dailyExp}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="py-3 rounded-xl border border-gray-100 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors text-center">자세히 보기</div>
                    <div className="py-3 rounded-xl bg-hit-navy text-white text-sm font-bold hover:bg-navy-700 transition-colors text-center">전화 문의</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section D: Latest Jobs */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-hit-navy">최신 현장 리스트</h2>
            <Link to="/sites" className="px-6 py-2 rounded-full border border-gray-200 text-sm font-bold text-gray-500 hover:bg-white hover:text-hit-navy transition-all">더보기</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestJobs.map((job) => (
              <Link 
                key={job.id} 
                to={`/jobs/${job.id}`}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-gray-100 block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{job.location} · {job.type}</span>
                    <h3 className="text-base font-black text-hit-navy line-clamp-2 leading-tight">{job.title}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300">
                    <Building2 size={20} />
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-400">직종</span>
                    <span className="text-hit-navy">{job.role}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-400">수수료</span>
                    <span className="text-hit-red">{job.commission}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-400">경력</span>
                    <span className="text-hit-navy">{job.experience}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-gray-400">히트지수</span>
                    <span className="text-[10px] font-black text-hit-red">{job.hitIndex}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-hit-red rounded-full" style={{ width: `${job.hitIndex}%` }}></div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-300">{job.date}</span>
                  <span className="text-[10px] font-bold text-gray-400">{job.agency}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section E: Heatmap Preview + TV */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-[60%]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-hit-navy">히트맵 미리보기</h2>
                <Link to="/hitmap" className="text-sm font-bold text-hit-blue flex items-center gap-1">지도에서 현장 찾기 <ArrowRight size={16} /></Link>
              </div>
              <div className="aspect-video bg-gray-100 rounded-[2.5rem] relative overflow-hidden group cursor-pointer border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" 
                  alt="Map Preview" 
                  className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur px-8 py-4 rounded-2xl shadow-2xl border border-white">
                    <p className="text-hit-navy font-black">지금 가장 핫한 지역 확인하기</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[40%]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-hit-navy">히트분양TV</h2>
                <Link to="/tv" className="text-sm font-bold text-hit-blue flex items-center gap-1">영상 더보기 <ArrowRight size={16} /></Link>
              </div>
              <div className="space-y-6">
                {[1, 2].map(i => (
                  <Link 
                    key={i} 
                    to="/tv"
                    className="flex gap-4 group cursor-pointer block"
                  >
                    <div className="w-32 h-20 bg-gray-100 rounded-2xl relative overflow-hidden shrink-0">
                      <img 
                        src={`https://picsum.photos/seed/tv${i}/300/200`} 
                        alt="Video Thumbnail" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play size={20} className="text-white fill-current" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-sm font-bold text-hit-navy line-clamp-2 group-hover:text-hit-red transition-colors mb-1">
                        {i === 1 ? '[현장리뷰] 강남 하이엔드 오피스텔 수수료 3천만원 현장 전격 공개' : '[가이드] 초보 분양상담사가 꼭 알아야 할 계약 노하우 TOP 5'}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-medium">조회수 1.2만회 · 2일 전</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section F: News + Community */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-hit-navy flex items-center gap-2">
                  <Newspaper size={24} className="text-hit-blue" /> 최신 부동산 뉴스
                </h2>
                <Link to="/news" className="text-sm font-bold text-gray-400 hover:text-hit-navy">더보기</Link>
              </div>
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm space-y-6">
                {[1, 2, 3, 4].map(i => (
                  <Link 
                    key={i} 
                    to="/news"
                    className="flex items-center justify-between group cursor-pointer block"
                  >
                    <h3 className="text-sm font-bold text-gray-600 group-hover:text-hit-navy transition-colors line-clamp-1">
                      {i === 1 ? '금리 인하 기대감에 서울 아파트값 12주 연속 상승세' : i === 2 ? '수도권 분양가 고공행진... "지금이 제일 싸다" 인식 확산' : i === 3 ? '정부, 3기 신도시 본청약 속도... 공급 물량 대폭 확대' : '지방 미분양 해소 위해 세제 혜택 카드 다시 꺼내나'}
                    </h3>
                    <span className="text-[10px] text-gray-300 font-medium shrink-0 ml-4">2026.03.24</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-hit-navy flex items-center gap-2">
                  <MessageSquare size={24} className="text-hit-red" /> 커뮤니티 핫글
                </h2>
                <Link to="/community" className="text-sm font-bold text-gray-400 hover:text-hit-navy">더보기</Link>
              </div>
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm space-y-6">
                {[1, 2, 3, 4].map(i => (
                  <Link 
                    key={i} 
                    to="/community"
                    className="flex items-center justify-between group cursor-pointer block"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-5 h-5 rounded bg-gray-50 text-[10px] font-black text-gray-300 flex items-center justify-center shrink-0">{i}</span>
                      <h3 className="text-sm font-bold text-gray-600 group-hover:text-hit-navy transition-colors line-clamp-1">
                        {i === 1 ? '이번 강남 현장 수수료 지급 정말 빠르네요. 추천합니다!' : i === 2 ? '초보인데 팀장님 잘 만나는 법 좀 알려주세요 ㅠㅠ' : i === 3 ? '대행사 블랙리스트 공유 가능한가요?' : '오늘 계약 2건 썼습니다! 기운 받아가세요~'}
                      </h3>
                    </div>
                    <span className="text-[10px] text-hit-red font-black shrink-0 ml-4">+{i * 12}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-hit-navy rounded-[3rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-hit-red/20 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-hit-blue/20 rounded-full blur-[100px] -ml-48 -mb-48" />
            
            <div className="space-y-4 text-center md:text-left relative z-10">
              <h3 className="text-3xl md:text-5xl font-black leading-tight">최고의 현장에서<br />당신의 가치를 증명하세요</h3>
              <p className="text-white/60 font-medium text-lg">히트분양은 성실한 분양상담사와 정직한 대행사를 연결합니다.</p>
            </div>
            <Link 
              to="/post-job"
              className="bg-hit-red text-white px-12 py-6 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl shadow-red-500/40 relative z-10"
            >
              <PlusCircle size={24} />
              구인글 등록하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
