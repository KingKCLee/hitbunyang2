import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { Save, X, Info, ChevronRight, ChevronLeft, MapPin, Building2, Users, DollarSign, Phone, FileText, Calendar, Image as ImageIcon } from 'lucide-react';

interface PostJobProps {
  user: User | null;
}

export default function PostJob({ user }: PostJobProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    oneLiner: '',
    startDate: '',
    locationAddr: '',
    locationDetail: '',
    siteName: '',
    siteAddr: '',
    siteDetail: '',
    developer: '',
    constructor: '',
    trustee: '',
    agency: '',
    category: '아파트',
    jobType: '팀장',
    gender: '무관',
    age: '무관',
    experience: '무관',
    personnel: '0명',
    salaryType: '수수료',
    salaryInfo: '',
    meal: '상담시 안내',
    dorm: '상담시 안내',
    dailyExp: '상담시 안내',
    transport: '상담시 안내',
    salesExp: '상담시 안내',
    content: '',
    siteUrl: '',
    youtubeUrl: '',
    managerName: user?.displayName || '',
    managerPhone: '010',
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, 'jobs'), {
        ...formData,
        authorUid: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        views: 0,
        status: 'open',
      });
      navigate('/jobs');
    } catch (error) {
      console.error('Error posting job:', error);
      setError('공고 등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tighter mb-2">구인글 등록</h1>
        <p className="text-gray-500 font-medium">현장 정보를 정확하게 입력하여 더 많은 지원자를 확보하세요.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-2xl text-sm font-bold text-center">
          {error}
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-blue-100/30 overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gray-50 px-10 py-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`h-2 rounded-full transition-all duration-500 ${step >= s ? 'w-8 bg-blue-600' : 'w-2 bg-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Step {step} of 4</span>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h3 className="text-xl font-black flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><FileText size={20} /></div>
                  현장 기본 정보
                </h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">구인글 제목 *</label>
                    <input 
                      required
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="구인글 제목을 입력해주세요 (최대 50자)" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">현장 한마디 *</label>
                    <input 
                      required
                      type="text" 
                      value={formData.oneLiner}
                      onChange={(e) => setFormData({ ...formData, oneLiner: e.target.value })}
                      placeholder="현장 한마디를 입력해주세요 (최대 50자)" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">투입일</label>
                      <div className="relative">
                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="date" 
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 text-center block">현장 이미지</label>
                    <input 
                      type="file" 
                      id="image-upload" 
                      multiple 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          alert(`${files.length}개의 이미지가 선택되었습니다. (데모 버전에서는 실제 업로드가 제한됩니다)`);
                        }
                      }}
                    />
                    <label 
                      htmlFor="image-upload"
                      className="border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all cursor-pointer bg-gray-50 h-[58px]"
                    >
                      <div className="flex items-center gap-2">
                        <ImageIcon size={18} />
                        <span className="text-xs font-bold">이미지 업로드 (최대 5개)</span>
                      </div>
                    </label>
                  </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h3 className="text-xl font-black flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><MapPin size={20} /></div>
                  근무지 및 사업지 정보
                </h3>
                <div className="space-y-8">
                  <div className="p-5 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
                    <Info size={24} className="text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800 leading-relaxed font-medium">
                      정확한 주소를 입력하시면 지역별 검색 노출이 최적화됩니다. 도로명 주소가 없는 경우 근처 주소를 선택 후 '위치 보정' 기능을 이용해주세요.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <h4 className="font-black text-gray-900 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                        근무지 정보
                      </h4>
                      <input 
                        type="text" 
                        value={formData.locationAddr}
                        onChange={(e) => setFormData({ ...formData, locationAddr: e.target.value })}
                        placeholder="근무지역 주소 검색" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                      <input 
                        type="text" 
                        value={formData.locationDetail}
                        onChange={(e) => setFormData({ ...formData, locationDetail: e.target.value })}
                        placeholder="상세주소 입력" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-black text-gray-900 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
                        사업지 정보
                      </h4>
                      <input 
                        type="text" 
                        value={formData.siteName}
                        onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                        placeholder="현장명 입력" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                      <input 
                        type="text" 
                        value={formData.siteAddr}
                        onChange={(e) => setFormData({ ...formData, siteAddr: e.target.value })}
                        placeholder="사업지 주소 검색" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h3 className="text-xl font-black flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Users size={20} /></div>
                  기본 요강 및 급여
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">업종 *</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                      >
                        <option>아파트</option>
                        <option>오피스텔</option>
                        <option>상가</option>
                        <option>지식산업센터</option>
                        <option>기타</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">직종 *</label>
                      <select 
                        value={formData.jobType}
                        onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                      >
                        <option>팀장</option>
                        <option>팀원</option>
                        <option>각개</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">급여 형태 *</label>
                      <select 
                        value={formData.salaryType}
                        onChange={(e) => setFormData({ ...formData, salaryType: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                      >
                        <option>수수료</option>
                        <option>일당</option>
                        <option>월급</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">급여 정보 *</label>
                      <div className="relative">
                        <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="text" 
                          value={formData.salaryInfo}
                          onChange={(e) => setFormData({ ...formData, salaryInfo: e.target.value })}
                          placeholder="금액 또는 상세 내용 입력" 
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-2 focus:ring-blue-500 font-bold" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h3 className="text-xl font-black flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Phone size={20} /></div>
                  담당자 정보 및 상세내용
                </h3>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">담당자 이름</label>
                      <input 
                        type="text" 
                        value={formData.managerName}
                        onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500 font-bold" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">담당자 전화번호</label>
                      <input 
                        type="text" 
                        value={formData.managerPhone}
                        onChange={(e) => setFormData({ ...formData, managerPhone: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500 font-bold" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">상세 내용</label>
                    <textarea 
                      rows={8} 
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="현장의 장점, 근무 조건 등을 상세히 입력해주세요." 
                      className="w-full bg-gray-50 border border-gray-100 rounded-[2rem] py-6 px-8 outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
                    ></textarea>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-10 border-t border-gray-100 flex items-center justify-between">
            <button 
              type="button"
              disabled={step === 1}
              onClick={prevStep}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-gray-400 hover:bg-gray-100 transition-all disabled:opacity-0"
            >
              <ChevronLeft size={20} />
              이전으로
            </button>
            <div className="flex gap-4">
              <button 
                type="button"
                className="px-8 py-4 rounded-2xl font-black text-gray-500 border border-gray-100 hover:bg-gray-50 transition-all"
              >
                임시저장
              </button>
              {step < 4 ? (
                <button 
                  type="button"
                  onClick={nextStep}
                  className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  다음 단계
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? '등록 중...' : '구인글 등록하기'}
                  <Save size={20} />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
