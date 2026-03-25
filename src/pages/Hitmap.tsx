import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { JobPosting } from '../types';
import { Flame, TrendingUp, MapPin, ChevronRight, Building2, Users, Eye, Search, Map as MapIcon, Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import KakaoMap from '../components/KakaoMap';

// Region grid layout (simulated map of Korea)
const regions = [
  { id: 'seoul', name: '서울', x: 2, y: 2 },
  { id: 'gyeonggi', name: '경기', x: 2, y: 3 },
  { id: 'incheon', name: '인천', x: 1, y: 2 },
  { id: 'gangwon', name: '강원', x: 4, y: 2 },
  { id: 'chungbuk', name: '충북', x: 3, y: 3 },
  { id: 'chungnam', name: '충남', x: 1, y: 4 },
  { id: 'sejong', name: '세종', x: 2, y: 4 },
  { id: 'daejeon', name: '대전', x: 2, y: 5 },
  { id: 'gyeongbuk', name: '경북', x: 5, y: 4 },
  { id: 'daegu', name: '대구', x: 4, y: 5 },
  { id: 'jeonbuk', name: '전북', x: 1, y: 6 },
  { id: 'gwangju', name: '광주', x: 1, y: 7 },
  { id: 'jeonnam', name: '전남', x: 2, y: 8 },
  { id: 'gyeongnam', name: '경남', x: 4, y: 7 },
  { id: 'busan', name: '부산', x: 5, y: 7 },
  { id: 'ulsan', name: '울산', x: 5, y: 6 },
  { id: 'jeju', name: '제주', x: 1, y: 9 },
];

const Hitmap = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const fetchedJobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobPosting));
        setJobs(fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Calculate heat for each region
  const regionHeat = regions.map(r => {
    const count = jobs.filter(j => j.location?.includes(r.name)).length;
    const avgHitIndex = jobs.filter(j => j.location?.includes(r.name)).reduce((acc, curr) => acc + (curr.hitIndex || 0), 0) / (count || 1);
    return {
      ...r,
      count,
      hitIndex: Math.round(avgHitIndex || (Math.random() * 40 + 50)), // Fallback to random for visual effect
      trend: Math.random() > 0.5 ? 'up' : 'down'
    };
  });

  const sortedRegions = [...regionHeat].sort((a, b) => b.hitIndex - a.hitIndex);

  return (
    <div className="bg-hit-navy min-h-screen pt-24 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Map Visualization */}
          <div className="lg:w-2/3 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-hit-red p-2 rounded-xl">
                    <Flame size={24} className="text-white" fill="currentColor" />
                  </div>
                  <h1 className="text-4xl font-black tracking-tighter">히트맵</h1>
                </div>
                <p className="text-gray-400 font-bold">전국 분양 현장의 실시간 관심도와 트렌드를 한눈에 확인하세요.</p>
              </div>

              <div className="flex bg-white/10 p-1 rounded-2xl border border-white/10">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'grid' ? 'bg-hit-red text-white shadow-lg shadow-hit-red/20' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid size={16} />
                  그리드뷰
                </button>
                <button 
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'map' ? 'bg-hit-red text-white shadow-lg shadow-hit-red/20' : 'text-gray-400 hover:text-white'}`}
                >
                  <MapIcon size={16} />
                  지도뷰
                </button>
              </div>
            </motion.div>

            <div className="bg-white/5 rounded-[3rem] p-4 md:p-12 border border-white/10 relative overflow-hidden min-h-[600px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {viewMode === 'grid' ? (
                  <motion.div 
                    key="grid"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="grid grid-cols-6 gap-3 w-full max-w-lg aspect-[6/10]"
                  >
                    {regionHeat.map((r) => (
                      <motion.button
                        key={r.id}
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedRegion(r.name)}
                        style={{ gridColumn: r.x, gridRow: r.y }}
                        className={`relative rounded-2xl p-2 flex flex-col items-center justify-center transition-all ${
                          selectedRegion === r.name 
                            ? 'ring-4 ring-hit-gold bg-hit-gold shadow-2xl shadow-hit-gold/50 z-10' 
                            : r.hitIndex > 85 
                              ? 'bg-hit-red/40 hover:bg-hit-red/60 border border-hit-red/30' 
                              : 'bg-white/10 hover:bg-white/20 border border-white/5'
                        }`}
                      >
                        <span className="text-[11px] font-black mb-0.5">{r.name}</span>
                        <div className="flex items-center gap-0.5">
                          <span className={`text-[9px] font-bold ${r.hitIndex > 80 ? 'text-white' : 'text-gray-400'}`}>
                            {r.hitIndex}
                          </span>
                          {r.hitIndex > 90 && <Flame size={8} className="text-white animate-pulse" fill="currentColor" />}
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="map"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full h-[600px] rounded-[2rem] overflow-hidden"
                  >
                    <KakaoMap address="서울특별시 강남구" title="히트분양 핫플레이스" className="w-full h-full" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Legend */}
              <div className="absolute bottom-8 left-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-hit-red"></div>
                  <span className="text-[10px] font-bold text-gray-400">High Heat</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  <span className="text-[10px] font-bold text-gray-400">Normal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Insights & Ranking */}
          <div className="lg:w-1/3 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 rounded-[3rem] p-8 border border-white/10"
            >
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <TrendingUp className="text-hit-red" size={24} />
                실시간 히트 랭킹
              </h3>
              <div className="space-y-4">
                {sortedRegions.slice(0, 5).map((r, idx) => (
                  <div key={r.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className={`text-lg font-black ${idx === 0 ? 'text-hit-red' : 'text-gray-500'}`}>0{idx + 1}</span>
                      <div>
                        <h4 className="font-black text-sm">{r.name}</h4>
                        <p className="text-[10px] font-bold text-gray-500">{r.count}개 현장 진행 중</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-black text-hit-red">{r.hitIndex}</div>
                        <div className="flex items-center justify-end gap-1 text-[9px] font-bold text-green-400">
                          <TrendingUp size={10} /> 2.4%
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-hit-red rounded-[3rem] p-8 text-white relative overflow-hidden group cursor-pointer"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-2">프리미엄 광고 문의</h3>
                <p className="text-sm font-bold opacity-80 mb-6">히트맵 상단 노출로 분양 성공을 앞당기세요.</p>
                <button className="bg-white text-hit-red px-6 py-3 rounded-xl text-xs font-black hover:bg-gray-100 transition-colors">
                  문의하기
                </button>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-20 group-hover:scale-110 transition-transform">
                <Flame size={160} fill="currentColor" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Selected Region Details */}
        {selectedRegion && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <MapPin className="text-hit-red" size={28} />
                {selectedRegion} 지역 핫플레이스
              </h2>
              <button className="text-sm font-bold text-gray-400 hover:text-white transition-colors">전체보기</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {jobs.filter(j => j.location?.includes(selectedRegion)).slice(0, 4).map((job) => (
                <div key={job.id} className="bg-white/5 rounded-3xl p-6 border border-white/10 hover:border-hit-red/50 transition-all group">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-black text-hit-red uppercase tracking-widest">{job.category}</span>
                    <span className="text-[10px] font-bold text-gray-500">|</span>
                    <span className="text-[10px] font-bold text-gray-400">{job.siteName}</span>
                  </div>
                  <h4 className="font-black text-sm mb-6 line-clamp-2 group-hover:text-hit-red transition-colors">{job.title}</h4>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                        <Eye size={12} /> {job.views || 0}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                        <Users size={12} /> {job.inquiryCount || 0}
                      </div>
                    </div>
                    <div className="text-xs font-black text-hit-red">{job.hitIndex} HIT</div>
                  </div>
                </div>
              ))}
              {jobs.filter(j => j.location?.includes(selectedRegion)).length === 0 && (
                <div className="col-span-full py-20 text-center bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                  <Search className="mx-auto text-white/10 mb-4" size={48} />
                  <p className="text-gray-500 font-bold">해당 지역에 등록된 현장이 없습니다.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hitmap;
