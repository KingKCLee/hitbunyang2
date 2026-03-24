import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { JobPosting } from '../types';
import JobCard from '../components/JobCard';
import { MapPin, Search, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function RegionalRecruit() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('전체');

  const regions = [
    '전체', '서울', '경기', '인천', '부산', '대구', '대전', '광주', '울산', '세종', 
    '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'
  ];

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

  const filteredJobs = jobs.filter(job => 
    selectedRegion === '전체' || job.location.includes(selectedRegion)
  );

  return (
    <div className="space-y-12 pb-24">
      <div className="bg-blue-600 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black tracking-tighter mb-4">지역별 채용정보</h1>
          <p className="opacity-80 font-medium text-lg">원하시는 지역의 분양 현장을 한눈에 확인하세요.</p>
        </div>
      </div>

      <section className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-3">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`py-3 rounded-2xl text-sm font-bold transition-all border ${
              selectedRegion === region 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                : 'bg-white text-gray-500 border-gray-100 hover:border-blue-200 hover:text-blue-600'
            }`}
          >
            {region}
          </button>
        ))}
      </section>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black flex items-center gap-3">
          <MapPin className="text-blue-600" size={24} />
          {selectedRegion} 지역 현장
          <span className="text-sm font-bold text-gray-300 ml-2">{filteredJobs.length}건</span>
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map((job, idx) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <JobCard job={job} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100">
          <p className="text-gray-300 font-bold">해당 지역에 등록된 현장이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
