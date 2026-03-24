import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from 'firebase/auth';
import { UserProfile } from '../types';
import { motion } from 'motion/react';
import { MessageSquare, ThumbsUp, Eye, User as UserIcon, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Post {
  id: string;
  title: string;
  content: string;
  authorUid: string;
  authorName: string;
  createdAt: any;
  views: number;
  likes: number;
}

interface CommunityProps {
  user: User | null;
  profile: UserProfile | null;
}

export default function Community({ user, profile }: CommunityProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setPosts(fetchedPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newPostTitle.trim() || !newPostContent.trim()) return;

    setIsPosting(true);
    try {
      await addDoc(collection(db, 'posts'), {
        title: newPostTitle,
        content: newPostContent,
        authorUid: user.uid,
        authorName: user.displayName || '익명',
        createdAt: serverTimestamp(),
        views: 0,
        likes: 0,
      });
      setNewPostTitle('');
      setNewPostContent('');
    } catch (error) {
      console.error('Error adding post:', error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 space-y-12">
      <div>
        <h1 className="text-4xl font-black tracking-tighter mb-2">커뮤니티</h1>
        <p className="text-gray-500 font-medium">분양 전문가들과 정보를 공유하고 소통하세요.</p>
      </div>

      {user && (
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handlePostSubmit}
          className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-100/20 space-y-6"
        >
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="제목을 입력하세요" 
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
            />
            <textarea 
              placeholder="내용을 입력하세요" 
              rows={4}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none leading-relaxed"
            />
          </div>
          <div className="flex justify-end">
            <button 
              disabled={isPosting || !newPostTitle.trim() || !newPostContent.trim()}
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl text-sm font-black hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
            >
              <Send size={16} />
              <span>{isPosting ? '등록 중...' : '글쓰기'}</span>
            </button>
          </div>
        </motion.form>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post, idx) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:border-blue-200 transition-all shadow-sm hover:shadow-xl hover:shadow-blue-100/20 group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-black group-hover:text-blue-600 transition-colors">{post.title}</h3>
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md">
                  {post.createdAt ? formatDistanceToNow(post.createdAt.toDate ? post.createdAt.toDate() : new Date(post.createdAt), { addSuffix: true, locale: ko }) : '방금 전'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-6 line-clamp-3 font-medium leading-relaxed">
                {post.content}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <UserIcon size={14} />
                  </div>
                  <span className="text-xs font-bold text-gray-700">{post.authorName}</span>
                </div>
                <div className="flex items-center gap-6 text-xs text-gray-400 font-bold">
                  <div className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer">
                    <Eye size={16} />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-orange-600 transition-colors cursor-pointer">
                    <ThumbsUp size={16} />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-24 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
              <p className="text-gray-400 font-bold">첫 번째 게시글을 작성해 보세요!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
