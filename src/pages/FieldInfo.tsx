import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { JobPosting } from '../types';
import { motion } from 'motion/react';
import { MapPin, Building2, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FieldInfo() {
  const [fields, setFields] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const fetchedFields = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobPosting));
        setFields(fetchedFields);
      } catch (error) {
        console.error('Error fetching fields:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  return (
    <div className="max-w-6xl mx-auto pb-24 space-y-12">
      <div>
        <h1 className="text-4xl font-black tracking-tighter mb-2">현장정보</h1>
        <p className="text-gray-500 font-medium">전국의 주요 분양 현장 정보를 한눈에 확인하세요.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fields.map((field, idx) => (
            <motion.div 
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/30 transition-all duration-500"
            >
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${field.id}/800/600`} 
                  alt={field.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-sm">
                  {field.category}
                </div>
              </div>
              <div className="p-8 space-y-6">
                <h3 className="text-xl font-black tracking-tight group-hover:text-blue-600 transition-colors line-clamp-1">
                  {field.title}
                </h3>
                <div className="space-y-3 text-sm text-gray-500 font-bold">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                      <MapPin size={12} />
                    </div>
                    <span>{field.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                      <Building2 size={12} />
                    </div>
                    <span>{field.companyName}</span>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">수수료</span>
                    <span className="text-sm font-black text-blue-600">{field.commission}</span>
                  </div>
                  <Link 
                    to={`/jobs/${field.id}`}
                    className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-black hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <span>상세보기</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
          {fields.length === 0 && (
            <div className="col-span-full text-center py-24 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
              <p className="text-gray-400 font-bold">등록된 현장 정보가 없습니다.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
