import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import { JobPosting } from '../types';
import JobCard from '../components/JobCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

export default function JobList() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('전체');

  const locations = ['전체', '서울', '경기', '인천', '부산', '대구', '대전', '광주', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

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

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === '전체' || job.location.includes(selectedLocation);
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">채용정보</h1>
          <p className="text-gray-500 font-medium">현재 활발히 모집 중인 분양 현장들을 확인하세요.</p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="현장명, 회사명 검색" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-full text-sm font-bold focus:outline-none focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          <div className="relative">
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="appearance-none pl-12 pr-12 py-4 bg-white border border-gray-100 rounded-full text-sm font-bold focus:outline-none focus:border-blue-500 transition-all shadow-sm cursor-pointer"
            >
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
        </div>
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
          <p className="text-gray-300 font-bold">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
