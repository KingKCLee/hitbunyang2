import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment, addDoc, collection, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { JobPosting, UserProfile, JobApplication } from '../types';
import { User } from 'firebase/auth';
import ReactMarkdown from 'react-markdown';
import { MapPin, Briefcase, Calendar, Building2, Share2, Heart, CheckCircle2, AlertCircle, Map as MapIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { motion } from 'motion/react';
import KakaoMap from '../components/KakaoMap';

interface JobDetailProps {
  user: User | null;
  profile: UserProfile | null;
}

export default function JobDetail({ user, profile }: JobDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isScrapped, setIsScrapped] = useState(false);

  useEffect(() => {
    if (profile?.scrappedJobs?.includes(id!)) {
      setIsScrapped(true);
    }
  }, [profile, id]);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'jobs', id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data() as JobPosting;
          setJob({ id: snapshot.id, ...data });
          // Increment views
          await updateDoc(docRef, { views: increment(1) });
          
          // Check if user has already applied
          if (user) {
            const q = query(
              collection(db, 'applications'), 
              where('jobId', '==', id), 
              where('applicantUid', '==', user.uid)
            );
            const appSnapshot = await getDocs(q);
            setHasApplied(!appSnapshot.empty);
          }
        } else {
          navigate('/jobs');
        }
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, user, navigate]);

  const handleScrap = async () => {
    if (!user || !profile) {
      navigate('/login');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const newScrappedJobs = isScrapped 
        ? (profile.scrappedJobs || []).filter(jobId => jobId !== id)
        : [...(profile.scrappedJobs || []), id!];

      await updateDoc(userRef, { scrappedJobs: newScrappedJobs });
      setIsScrapped(!isScrapped);
      setMessage({ type: 'success', text: isScrapped ? '스크랩이 취소되었습니다.' : '스크랩되었습니다.' });
    } catch (error) {
      console.error('Error scrapping job:', error);
      setMessage({ type: 'error', text: '스크랩 중 오류가 발생했습니다.' });
    }
  };

  const handleApply = async () => {
    if (!user || !id || !job) {
      navigate('/login');
      return;
    }

    if (profile?.role !== 'agent') {
      setMessage({ type: 'error', text: '분양사원 회원만 지원 가능합니다.' });
      return;
    }

    setApplying(true);
    setMessage(null);
    try {
      await addDoc(collection(db, 'applications'), {
        jobId: id,
        applicantUid: user.uid,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setHasApplied(true);
      setMessage({ type: 'success', text: '지원이 완료되었습니다.' });
    } catch (error) {
      console.error('Error applying:', error);
      setMessage({ type: 'error', text: '지원 중 오류가 발생했습니다.' });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="bg-hit-red/10 text-hit-red text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{job.category}</span>
              <span className="text-xs text-gray-400 font-bold">
                {format(job.createdAt && (job.createdAt as any).toDate ? (job.createdAt as any).toDate() : new Date(job.createdAt), 'yyyy.MM.dd', { locale: ko })} 등록
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-hit-navy">{job.title}</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-10 border-y border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-400"><Building2 size={24} /></div>
                <div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">회사명</p>
                  <p className="text-sm font-black text-gray-700">{job.companyName}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-400"><MapPin size={24} /></div>
                <div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">근무지역</p>
                  <p className="text-sm font-black text-gray-700">{job.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-400"><Briefcase size={24} /></div>
                <div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">수수료/급여</p>
                  <p className="text-sm font-black text-hit-red">{job.commission}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-hit-red rounded-full"></span>
              상세 모집 요강
            </h2>
            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm leading-relaxed text-gray-700 whitespace-pre-wrap font-medium">
              <ReactMarkdown>{job.content}</ReactMarkdown>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-hit-gold rounded-full"></span>
              근무지 위치
            </h2>
            <div className="bg-white p-4 rounded-[3rem] border border-gray-100 shadow-sm">
              <KakaoMap address={job.siteAddr || job.locationAddr} title={job.siteName || job.title} />
              <div className="p-6 flex items-start gap-3">
                <MapPin className="text-hit-red mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-sm font-black text-hit-navy mb-1">{job.siteAddr || job.locationAddr}</p>
                  <p className="text-xs text-gray-400 font-medium">{job.siteDetail || job.locationDetail}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-2xl shadow-hit-navy/5 space-y-8"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-black tracking-tight">지원하기</h3>
                <p className="text-sm text-gray-400 font-bold leading-relaxed">
                  이 현장에 관심이 있으신가요? <br />
                  지금 바로 지원하고 담당자와 상담하세요.
                </p>
              </div>

              {message && (
                <div className={`p-4 rounded-2xl text-xs font-black text-center ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {message.text}
                </div>
              )}

              {hasApplied ? (
                <div className="flex items-center gap-3 p-5 bg-green-50 text-green-700 rounded-[2rem] text-sm font-black">
                  <CheckCircle2 size={20} />
                  <span>이미 지원한 공고입니다.</span>
                </div>
              ) : (
                <button 
                  onClick={handleApply}
                  disabled={applying || job.status === 'closed'}
                  className="w-full bg-hit-red text-white py-5 rounded-[2rem] font-black hover:bg-red-700 transition-all shadow-xl shadow-hit-red/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {applying ? '지원 중...' : job.status === 'closed' ? '모집 마감' : '즉시 지원하기'}
                </button>
              )}

              <div className="flex gap-4">
                <button 
                  onClick={handleScrap}
                  className={`flex-grow flex items-center justify-center gap-2 border py-4 rounded-full text-xs font-black transition-all ${isScrapped ? 'bg-hit-navy/5 border-hit-navy/10 text-hit-navy' : 'border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                >
                  <Heart size={16} fill={isScrapped ? 'currentColor' : 'none'} />
                  <span>{isScrapped ? '스크랩됨' : '스크랩'}</span>
                </button>
                <button className="flex-grow flex items-center justify-center gap-2 border border-gray-100 py-4 rounded-full text-xs font-black text-gray-400 hover:bg-gray-50 transition-all">
                  <Share2 size={16} />
                  <span>공유</span>
                </button>
              </div>

              <div className="pt-6 border-t border-gray-50 flex items-center gap-3 text-[10px] text-gray-300 font-bold">
                <AlertCircle size={14} />
                <p>허위 공고일 경우 신고해 주세요.</p>
              </div>
            </motion.div>

            <div className="bg-hit-navy text-white p-8 rounded-[3rem] space-y-4 shadow-2xl">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-hit-gold">Recruiter Info</h4>
              <p className="text-xl font-black tracking-tight">{job.companyName}</p>
              <p className="text-xs text-gray-400 font-bold leading-relaxed opacity-80">
                본 채용 정보는 {job.companyName}에서 제공한 자료를 바탕으로 히트분양에서 편집 및 재구성하였습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
