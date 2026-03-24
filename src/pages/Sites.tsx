import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Filter, SlidersHorizontal, ChevronDown, Building2, Flame, Calendar, Clock, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const regions = ['전체', '서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];
const categories = ['전체', '아파트', '오피스텔', '상가', '지식산업센터', '생활숙박시설', '도시형생활주택', '빌라/타운하우스', '기타'];
const jobTypes = ['전체', '팀장', '팀원', '각개', '본부장'];

export default function Sites() {
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedJobType, setSelectedJobType] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const jobs = [
    { id: '1', title: '강남 루시아 도산 208', location: '서울 강남', category: '오피스텔', jobType: '팀원', commission: '1,500만원', experience: '무관', date: '방금 전', hitIndex: 98, agency: '대우건설', tags: ['HOT', '급구'] },
    { id: '2', title: '해운대 엘시티 더샵', location: '부산 해운대', category: '아파트', jobType: '팀장', commission: '2,000만원', experience: '1년 이상', date: '5분 전', hitIndex: 95, agency: '포스코이앤씨', tags: ['NEW'] },
    { id: '3', title: '송도 아크베이', location: '인천 연수', category: '아파트', jobType: '팀원', commission: '1,200만원', experience: '무관', date: '12분 전', hitIndex: 92, agency: '현대건설', tags: ['HOT'] },
    { id: '4', title: '판교 밸리자이', location: '경기 성남', category: '오피스텔', jobType: '팀장', commission: '1,800만원', experience: '3년 이상', date: '20분 전', hitIndex: 89, agency: 'GS건설', tags: ['급구'] },
    { id: '5', title: '광주 상무 센트럴자이', location: '광주 서구', category: '아파트', jobType: '팀원', commission: '1,400만원', experience: '무관', date: '45분 전', hitIndex: 87, agency: 'GS건설', tags: ['NEW'] },
    { id: '6', title: '평택 브레인시티 중흥S-클래스', location: '경기 평택', category: '아파트', jobType: '팀원', commission: '1,000만원', experience: '무관', date: '1시간 전', hitIndex: 82, agency: '중흥건설', tags: [] },
    { id: '7', title: '천안 아이파크 시티', location: '충남 천안', category: '아파트', jobType: '팀장', commission: '1,600만원', experience: '2년 이상', date: '2시간 전', hitIndex: 79, agency: 'HDC현대산업개발', tags: ['HOT'] },
    { id: '8', title: '청주 동일하이빌 파크레인', location: '충북 청주', category: '아파트', jobType: '팀원', commission: '900만원', experience: '무관', date: '3시간 전', hitIndex: 75, agency: '동일토건', tags: [] },
  ];

  const filteredJobs = jobs.filter(job => {
    const regionMatch = selectedRegion === '전체' || job.location.includes(selectedRegion);
    const categoryMatch = selectedCategory === '전체' || job.category === selectedCategory;
    const jobTypeMatch = selectedJobType === '전체' || job.jobType === selectedJobType;
    const searchMatch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return regionMatch && categoryMatch && jobTypeMatch && searchMatch;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="현장명, 지역, 수수료 등 검색" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-hit-red outline-none font-bold transition-all"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black transition-all ${showFilters ? 'bg-hit-navy text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              <SlidersHorizontal size={20} />
              필터 상세
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-gray-50">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">지역별</h4>
                    <div className="flex flex-wrap gap-2">
                      {regions.map(r => (
                        <button 
                          key={r}
                          onClick={() => setSelectedRegion(r)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedRegion === r ? 'bg-hit-red text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">업종별</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(c => (
                        <button 
                          key={c}
                          onClick={() => setSelectedCategory(c)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedCategory === c ? 'bg-hit-navy text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">직종별</h4>
                    <div className="flex flex-wrap gap-2">
                      {jobTypes.map(j => (
                        <button 
                          key={j}
                          onClick={() => setSelectedJobType(j)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedJobType === j ? 'bg-hit-blue text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                          {j}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm font-bold text-gray-500">총 <span className="text-hit-navy">{filteredJobs.length}</span>개의 현장이 검색되었습니다.</p>
          <div className="flex items-center gap-2">
            <select className="bg-transparent border-none text-sm font-bold text-gray-600 outline-none cursor-pointer">
              <option>최신순</option>
              <option>히트지수순</option>
              <option>수수료순</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <Link 
              key={job.id} 
              to={`/jobs/${job.id}`}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all border border-transparent hover:border-gray-100 group block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-hit-blue uppercase tracking-widest">{job.location}</span>
                    <span className="text-[10px] font-bold text-gray-300">|</span>
                    <span className="text-[10px] font-bold text-gray-400">{job.category}</span>
                  </div>
                  <h3 className="text-base font-black text-hit-navy line-clamp-2 leading-tight group-hover:text-hit-red transition-colors">{job.title}</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-hit-red/5 group-hover:text-hit-red transition-colors">
                  <Building2 size={20} />
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-6">
                {job.tags.map(tag => (
                  <span key={tag} className={`text-[9px] font-black px-2 py-0.5 rounded ${tag === 'HOT' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-400">직종</span>
                  <span className="text-hit-navy">{job.jobType}</span>
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
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                    <Flame size={12} className="text-hit-red" fill="currentColor" /> 히트지수
                  </div>
                  <span className="text-[10px] font-black text-hit-red">{job.hitIndex}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${job.hitIndex}%` }}
                    className="h-full bg-hit-red rounded-full"
                  ></motion.div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-300">
                  <Clock size={10} /> {job.date}
                </div>
                <span className="text-[10px] font-bold text-gray-400">{job.agency}</span>
              </div>
            </Link>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="py-32 text-center">
            <Search className="mx-auto text-gray-200 mb-4" size={48} />
            <p className="text-gray-400 font-bold">검색 결과가 없습니다.</p>
            <button 
              onClick={() => {
                setSelectedRegion('전체');
                setSelectedCategory('전체');
                setSelectedJobType('전체');
                setSearchQuery('');
              }}
              className="mt-4 text-hit-blue font-bold hover:underline"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
