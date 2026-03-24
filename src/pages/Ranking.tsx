import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { JobPosting } from '../types';
import { Trophy, TrendingUp, Building2, ChevronRight, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

const Ranking = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'sites' | 'agencies'>('sites');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, 'jobs'), orderBy('hitIndex', 'desc'), limit(20));
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

  // Aggregate agencies
  const agencyStats = jobs.reduce((acc: any, job) => {
    const agency = job.agency || '기타';
    if (!acc[agency]) {
      acc[agency] = { name: agency, count: 0, totalViews: 0, avgHitIndex: 0 };
    }
    acc[agency].count += 1;
    acc[agency].totalViews += (job.views || 0);
    acc[agency].avgHitIndex += (job.hitIndex || 0);
    return acc;
  }, {});

  const sortedAgencies = Object.values(agencyStats)
    .map((a: any) => ({ ...a, avgHitIndex: Math.round(a.avgHitIndex / a.count) }))
    .sort((a: any, b: any) => b.totalViews - a.totalViews);

  const totalViews = jobs.reduce((acc, job) => acc + (job.views || 0), 0);
  const totalInquiries = jobs.reduce((acc, job) => acc + (job.inquiryCount || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hit-red"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-hit-red p-2 rounded-xl shadow-lg shadow-hit-red/20">
                <Trophy size={24} className="text-white" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-hit-navy">히트랭킹</h1>
            </div>
            <p className="text-gray-500 font-bold">전국의 분양 현장과 대행사의 실시간 성과를 확인하세요.</p>
          </motion.div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-8 px-6 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">누적 조회수</p>
                <p className="text-sm font-black text-hit-navy">{totalViews.toLocaleString()}</p>
              </div>
              <div className="w-px h-8 bg-gray-100"></div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">누적 문의수</p>
                <p className="text-sm font-black text-hit-red">{totalInquiries.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
              <button 
                onClick={() => setActiveTab('sites')}
                className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'sites' ? 'bg-hit-navy text-white shadow-lg' : 'text-gray-400 hover:text-hit-navy'}`}
              >
                현장 랭킹
              </button>
              <button 
                onClick={() => setActiveTab('agencies')}
                className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'agencies' ? 'bg-hit-navy text-white shadow-lg' : 'text-gray-400 hover:text-hit-navy'}`}
              >
                대행사 랭킹
              </button>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {activeTab === 'sites' ? (
            jobs.slice(0, 3).map((job, idx) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative bg-white rounded-[3rem] p-8 border-2 transition-all hover:shadow-2xl ${
                  idx === 0 ? 'border-hit-red scale-105 z-10' : 'border-transparent'
                }`}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black shadow-xl ${
                    idx === 0 ? 'bg-hit-red text-white' : idx === 1 ? 'bg-gray-400 text-white' : 'bg-orange-400 text-white'
                  }`}>
                    {idx + 1}
                  </div>
                </div>
                <div className="text-center pt-4">
                  <span className="text-[10px] font-black text-hit-blue uppercase tracking-widest mb-2 block">{job.location}</span>
                  <h3 className="text-xl font-black text-hit-navy mb-4 line-clamp-2">{job.title}</h3>
                  <div className="flex items-center justify-center gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-xs font-bold text-gray-400 mb-1">HIT</div>
                      <div className="text-lg font-black text-hit-red">{job.hitIndex}</div>
                    </div>
                    <div className="w-px h-8 bg-gray-100"></div>
                    <div className="text-center">
                      <div className="text-xs font-bold text-gray-400 mb-1">VIEWS</div>
                      <div className="text-lg font-black text-hit-navy">{job.views || 0}</div>
                    </div>
                  </div>
                  <a 
                    href={`/jobs/${job.id}`}
                    className={`block w-full py-4 rounded-2xl text-sm font-black transition-all ${
                      idx === 0 ? 'bg-hit-red text-white hover:bg-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    상세보기
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            sortedAgencies.slice(0, 3).map((agency: any, idx) => (
              <motion.div 
                key={agency.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative bg-white rounded-[3rem] p-8 border-2 transition-all hover:shadow-2xl ${
                  idx === 0 ? 'border-hit-navy scale-105 z-10' : 'border-transparent'
                }`}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black shadow-xl ${
                    idx === 0 ? 'bg-hit-navy text-white' : idx === 1 ? 'bg-gray-400 text-white' : 'bg-orange-400 text-white'
                  }`}>
                    {idx + 1}
                  </div>
                </div>
                <div className="text-center pt-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <Building2 size={32} />
                  </div>
                  <h3 className="text-xl font-black text-hit-navy mb-4">{agency.name}</h3>
                  <div className="flex items-center justify-center gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-xs font-bold text-gray-400 mb-1">현장수</div>
                      <div className="text-lg font-black text-hit-navy">{agency.count}</div>
                    </div>
                    <div className="w-px h-8 bg-gray-100"></div>
                    <div className="text-center">
                      <div className="text-xs font-bold text-gray-400 mb-1">총 조회수</div>
                      <div className="text-lg font-black text-hit-red">{agency.totalViews.toLocaleString()}</div>
                    </div>
                  </div>
                  <button className="w-full py-4 rounded-2xl bg-gray-100 text-gray-600 text-sm font-black hover:bg-gray-200 transition-all">
                    대행사 정보
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* List Ranking */}
        <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-xl font-black flex items-center gap-2">
              <TrendingUp className="text-hit-red" size={24} />
              {activeTab === 'sites' ? '전체 현장 랭킹' : '전체 대행사 랭킹'}
            </h3>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
              <Calendar size={14} />
              2024년 3월 4주차 기준
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {activeTab === 'sites' ? (
              jobs.slice(3, 10).map((job, idx) => (
                <div key={job.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-8">
                    <span className="text-xl font-black text-gray-200 w-8">{idx + 4}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:bg-hit-red/5 group-hover:text-hit-red transition-colors">
                        <Building2 size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black text-hit-blue uppercase tracking-widest">{job.location}</span>
                          <span className="text-[10px] font-bold text-gray-300">{job.category}</span>
                        </div>
                        <h4 className="font-black text-hit-navy group-hover:text-hit-red transition-colors">{job.title}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-12">
                    <div className="hidden md:flex items-center gap-8">
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-gray-400 mb-0.5">조회수</div>
                        <div className="text-sm font-black text-hit-navy">{job.views || 0}</div>
                      </div>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <div className="text-[10px] font-bold text-gray-400 mb-0.5">히트지수</div>
                      <div className="text-lg font-black text-hit-red">{job.hitIndex}</div>
                    </div>
                    <ChevronRight size={20} className="text-gray-200 group-hover:text-hit-navy transition-colors" />
                  </div>
                </div>
              ))
            ) : (
              sortedAgencies.slice(3, 10).map((agency: any, idx) => (
                <div key={agency.name} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-8">
                    <span className="text-xl font-black text-gray-200 w-8">{idx + 4}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:bg-hit-navy/5 group-hover:text-hit-navy transition-colors">
                        <Building2 size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-hit-navy group-hover:text-hit-navy transition-colors">{agency.name}</h4>
                        <p className="text-[10px] font-bold text-gray-400">{agency.count}개 현장 관리 중</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-12">
                    <div className="hidden md:flex items-center gap-8">
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-gray-400 mb-0.5">평균 히트지수</div>
                        <div className="text-sm font-black text-hit-navy">{agency.avgHitIndex}</div>
                      </div>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <div className="text-[10px] font-bold text-gray-400 mb-0.5">총 조회수</div>
                      <div className="text-lg font-black text-hit-red">{agency.totalViews.toLocaleString()}</div>
                    </div>
                    <ChevronRight size={20} className="text-gray-200 group-hover:text-hit-navy transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
