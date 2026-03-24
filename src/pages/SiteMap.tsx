import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { JobPosting } from '../types';
import { MapPin, Search, ChevronRight, Building2, Info, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

export default function SiteMap() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

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

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">지도현장</h1>
          <p className="text-gray-500 font-medium">전국의 분양 현장을 지도에서 한눈에 확인하세요.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
        {/* Map Placeholder */}
        <div className="lg:col-span-2 bg-blue-50 rounded-[3rem] border border-blue-100 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent scale-150" />
          </div>
          <div className="relative z-10 text-center space-y-4">
            <div className="bg-white p-6 rounded-full shadow-2xl inline-block animate-bounce">
              <MapPin className="text-blue-600" size={48} />
            </div>
            <h3 className="text-xl font-black text-blue-900">지도를 준비 중입니다</h3>
            <p className="text-blue-400 font-bold text-sm">현재 전국의 {jobs.length}개 현장이 등록되어 있습니다.</p>
          </div>

          {/* Site Markers (Simulated) */}
          {jobs.slice(0, 10).map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              style={{ 
                position: 'absolute', 
                top: `${20 + Math.random() * 60}%`, 
                left: `${20 + Math.random() * 60}%` 
              }}
              className="group cursor-pointer"
              onClick={() => setSelectedJob(job)}
            >
              <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg group-hover:scale-125 transition-transform">
                <Building2 size={16} />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white px-3 py-1 rounded-lg shadow-xl text-[10px] font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-blue-100">
                {job.title}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Site List */}
        <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Navigation className="text-blue-600" size={20} />
              현장 목록
            </h3>
            <span className="text-xs font-bold text-gray-300">{jobs.length}건</span>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : jobs.map((job) => (
              <div 
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedJob?.id === job.id 
                    ? 'bg-blue-50 border-blue-200 shadow-sm' 
                    : 'bg-white border-gray-50 hover:border-blue-100 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider">{job.location}</span>
                  <span className="text-[10px] font-bold text-gray-400">{job.siteName}</span>
                </div>
                <h4 className="text-sm font-black text-gray-900 line-clamp-1">{job.title}</h4>
              </div>
            ))}
          </div>
          {selectedJob && (
            <div className="p-6 bg-blue-600 text-white">
              <h4 className="font-black mb-2 line-clamp-1">{selectedJob.title}</h4>
              <p className="text-xs opacity-80 mb-4 line-clamp-2">{selectedJob.oneLiner}</p>
              <a 
                href={`/jobs/${selectedJob.id}`}
                className="block w-full text-center bg-white text-blue-600 py-3 rounded-xl text-xs font-black hover:bg-blue-50 transition-colors"
              >
                상세보기
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
