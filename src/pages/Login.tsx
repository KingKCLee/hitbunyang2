import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'motion/react';
import { LogIn } from 'lucide-react';

export default function Login() {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-12 rounded-3xl shadow-xl border border-neutral-100 text-center"
      >
        <span className="text-3xl font-bold text-blue-600 tracking-tighter mb-8 block">히트분양</span>
        <h2 className="text-2xl font-bold tracking-tight mb-4">반갑습니다!</h2>
        <p className="text-neutral-500 mb-12 font-light">
          히트분양의 모든 서비스를 이용하시려면<br />로그인이 필요합니다.
        </p>

        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-neutral-200 py-4 rounded-full font-semibold hover:bg-neutral-50 transition-all shadow-sm hover:shadow-md mb-6"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          <span>Google로 계속하기</span>
        </button>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-neutral-400 tracking-widest">OR</span>
          </div>
        </div>

        <p className="text-xs text-neutral-400 leading-relaxed">
          로그인 시 히트분양의 <a href="#" className="underline">이용약관</a> 및 <a href="#" className="underline">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
        </p>
      </motion.div>
    </div>
  );
}
