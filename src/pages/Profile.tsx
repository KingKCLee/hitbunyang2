import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, updateDoc, collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile, UserRole, JobPosting, JobApplication } from '../types';
import { motion } from 'motion/react';
import { User as UserIcon, Building2, Phone, Mail, ShieldCheck, Save, Database, Briefcase, FileText, ChevronRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface ProfileProps {
  user: User;
  profile: UserProfile | null;
}

export default function Profile({ user, profile }: ProfileProps) {
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [role, setRole] = useState<UserRole>(profile?.role || 'agent');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [companyName, setCompanyName] = useState(profile?.companyName || '');

  const [myJobs, setMyJobs] = useState<JobPosting[]>([]);
  const [myApplications, setMyApplications] = useState<(JobApplication & { jobTitle?: string })[]>([]);
  const [scrappedJobs, setScrappedJobs] = useState<JobPosting[]>([]);
  const [fetchingData, setFetchingData] = useState(true);

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setFetchingData(true);
      try {
        if (profile?.role === 'company') {
          const q = query(collection(db, 'jobs'), where('authorUid', '==', user.uid), orderBy('createdAt', 'desc'));
          const snapshot = await getDocs(q);
          setMyJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobPosting)));
        } else {
          const q = query(collection(db, 'applications'), where('applicantUid', '==', user.uid), orderBy('createdAt', 'desc'));
          const snapshot = await getDocs(q);
          const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobApplication));
          
          // Fetch job titles for applications
          const appsWithTitles = await Promise.all(apps.map(async (app) => {
            const jobDoc = await getDoc(doc(db, 'jobs', app.jobId));
            return { ...app, jobTitle: jobDoc.exists() ? (jobDoc.data() as JobPosting).title : '삭제된 공고' };
          }));
          setMyApplications(appsWithTitles);
        }

        // Fetch scrapped jobs
        if (profile?.scrappedJobs && profile.scrappedJobs.length > 0) {
          const jobs: JobPosting[] = [];
          for (const jobId of profile.scrappedJobs) {
            const jobDoc = await getDoc(doc(db, 'jobs', jobId));
            if (jobDoc.exists()) {
              jobs.push({ id: jobDoc.id, ...jobDoc.data() } as JobPosting);
            }
          }
          setScrappedJobs(jobs);
        } else {
          setScrappedJobs([]);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, [user, profile?.role, profile?.scrappedJobs]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        role,
        phone,
        companyName,
        updatedAt: new Date().toISOString(),
      });
      setMessage({ type: 'success', text: '프로필이 업데이트되었습니다.' });
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: '업데이트 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  const seedSampleData = async () => {
    setSeeding(true);
    setMessage(null);
    try {
      // Ensure user is a company first to satisfy security rules
      if (profile?.role !== 'company') {
        await updateDoc(doc(db, 'users', user.uid), {
          role: 'company',
          updatedAt: new Date().toISOString(),
        });
      }

      const samples = [
        {
          title: '[서울] 강남 루시아 펜트하우스 분양상담사 모집',
          companyName: '(주)루시아홀딩스',
          location: '서울',
          category: '아파트',
          commission: '건당 1,500만원',
          content: '### 강남 루시아 펜트하우스\n\n최고급 럭셔리 주거 단지 강남 루시아에서 함께할 유능한 상담사분을 모십니다.\n\n* **현장위치**: 서울특별시 강남구 도산대로\n* **모집대상**: 경력 1년 이상 상담사\n* **지원혜택**: 중식 제공, 유류비 지원\n* **수수료**: 계약금 입금 시 즉시 지급',
        },
        {
          title: '[경기] 동탄 레이크 파크 자이 상가 분양팀원 모집',
          companyName: '자이건설 분양본부',
          location: '경기',
          category: '상가',
          commission: '월 300 + 인센티브',
          content: '### 동탄 레이크 파크 자이\n\n동탄 호수공원 프리미엄 상가 분양 현장입니다.\n\n* **현장위치**: 경기도 화성시 동탄순환대로\n* **모집대상**: 신입/경력 무관\n* **지원혜택**: 숙소 지원, 교육 제공\n* **특이사항**: 워킹 손님 많음',
        },
        {
          title: '[인천] 송도 국제도시 지식산업센터 영업팀장/팀원',
          companyName: '송도디벨로퍼',
          location: '인천',
          category: '지식산업센터',
          commission: '팀 5,000만원 / 원 1,000만원',
          content: '### 송도 IT 밸리 지식산업센터\n\n송도 국제도시의 중심, 대규모 지식산업센터 분양 현장입니다.\n\n* **현장위치**: 인천광역시 연수구 송도동\n* **모집대상**: 팀 단위 환영, 개인 지원 가능\n* **지원혜택**: 법인 차량 지원\n* **수수료**: 업계 최고 수준 보장',
        },
        {
          title: '[부산] 해운대 엘시티 레지던스 특별 분양',
          companyName: '엘시티 매니지먼트',
          location: '부산',
          category: '기타',
          commission: '협의 후 결정',
          content: '### 해운대 엘시티 레지던스\n\n해운대의 랜드마크, 엘시티 레지던스 특별 분양 상담사를 모집합니다.\n\n* **현장위치**: 부산광역시 해운대구 달맞이길\n* **모집대상**: VIP 상담 경력자 우대\n* **지원혜택**: 최고급 사무 환경 제공\n* **기타**: 영어/중국어 가능자 우대',
        }
      ];

      for (const sample of samples) {
        await addDoc(collection(db, 'jobs'), {
          ...sample,
          authorUid: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          views: Math.floor(Math.random() * 500),
          status: 'open',
        });
      }

      setMessage({ type: 'success', text: '샘플 데이터가 성공적으로 생성되었습니다.' });
      setTimeout(() => window.location.href = '/jobs', 1500);
    } catch (error) {
      console.error('Error seeding data:', error);
      setMessage({ type: 'error', text: '데이터 생성 중 오류가 발생했습니다. (권한 확인 필요)' });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">마이페이지</h1>
          <p className="text-gray-500 font-medium">회원님의 정보를 관리하고 활동 내역을 확인하세요.</p>
        </div>
        <button 
          onClick={seedSampleData}
          disabled={seeding}
          className="flex items-center gap-2 text-[10px] font-black text-gray-300 hover:text-blue-600 transition-colors uppercase tracking-widest"
        >
          <Database size={14} />
          <span>{seeding ? '생성 중...' : '샘플 데이터 생성'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 mb-4 shadow-inner">
              <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-black text-gray-900">{user.displayName}</h2>
            <p className="text-xs text-gray-400 font-bold mb-4">{user.email}</p>
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={12} />
              {profile?.role === 'company' ? '구인 기업' : '구직 사원'}
            </div>
          </motion.div>

          {/* Settings Form */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleUpdate}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-50 space-y-6"
          >
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest">회원 유형</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  type="button"
                  onClick={() => setRole('agent')}
                  className={`py-3 rounded-2xl border-2 text-xs font-black transition-all ${role === 'agent' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-50 text-gray-400 hover:border-gray-100'}`}
                >
                  분양사원
                </button>
                <button 
                  type="button"
                  onClick={() => setRole('company')}
                  className={`py-3 rounded-2xl border-2 text-xs font-black transition-all ${role === 'company' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-50 text-gray-400 hover:border-gray-100'}`}
                >
                  구인기업
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-2">
                연락처
              </label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {role === 'company' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-2">
                  회사명
                </label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="회사 또는 팀 이름"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-full font-black text-xs hover:bg-gray-800 transition-all shadow-lg disabled:opacity-50"
            >
              <Save size={16} />
              <span>{loading ? '저장 중...' : '정보 업데이트'}</span>
            </button>
          </motion.form>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {message && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-2xl text-xs font-black text-center ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
            >
              {message.text}
            </motion.div>
          )}

          {profile?.role === 'company' ? (
            <div className="space-y-6">
              <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                내가 등록한 공고
              </h3>
              {fetchingData ? (
                <div className="p-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div></div>
              ) : myJobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {myJobs.map(job => (
                    <Link 
                      key={job.id} 
                      to={`/jobs/${job.id}`}
                      className="bg-white p-6 rounded-[2rem] border border-gray-100 hover:border-blue-200 transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{job.category}</p>
                        <h4 className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                        <p className="text-xs text-gray-400 font-bold">{job.location} · 조회수 {job.views}</p>
                      </div>
                      <ChevronRight className="text-gray-200 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={20} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-gray-200 text-center space-y-4">
                  <Briefcase className="mx-auto text-gray-200" size={48} />
                  <p className="text-gray-400 font-bold">등록된 공고가 없습니다.</p>
                  <Link to="/post-job" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-xs font-black">첫 공고 등록하기</Link>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                지원 내역
              </h3>
              {fetchingData ? (
                <div className="p-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div></div>
              ) : myApplications.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {myApplications.map(app => (
                    <Link 
                      key={app.id} 
                      to={`/jobs/${app.jobId}`}
                      className="bg-white p-6 rounded-[2rem] border border-gray-100 hover:border-blue-200 transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-1">
                        <h4 className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">{app.jobTitle}</h4>
                        <p className="text-xs text-gray-400 font-bold">지원일: {format(app.createdAt && (app.createdAt as any).toDate ? (app.createdAt as any).toDate() : new Date(app.createdAt), 'yyyy.MM.dd')}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${app.status === 'pending' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                          {app.status === 'pending' ? '심사중' : '확인됨'}
                        </span>
                        <ChevronRight className="text-gray-200 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={20} />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-gray-200 text-center space-y-4">
                  <FileText className="mx-auto text-gray-200" size={48} />
                  <p className="text-gray-400 font-bold">지원 내역이 없습니다.</p>
                  <Link to="/jobs" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-xs font-black">공고 둘러보기</Link>
                </div>
              )}

              <h3 className="text-xl font-black tracking-tight flex items-center gap-3 pt-8">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                스크랩한 공고
              </h3>
              {fetchingData ? (
                <div className="p-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div></div>
              ) : scrappedJobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {scrappedJobs.map(job => (
                    <Link 
                      key={job.id} 
                      to={`/jobs/${job.id}`}
                      className="bg-white p-6 rounded-[2rem] border border-gray-100 hover:border-blue-200 transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{job.category}</p>
                        <h4 className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                        <p className="text-xs text-gray-400 font-bold">{job.location} · {job.companyName}</p>
                      </div>
                      <ChevronRight className="text-gray-200 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={20} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-gray-200 text-center space-y-4">
                  <Heart className="mx-auto text-gray-200" size={48} />
                  <p className="text-gray-400 font-bold">스크랩한 공고가 없습니다.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

