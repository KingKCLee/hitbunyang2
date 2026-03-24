import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile } from './types';

// Pages
import Home from './pages/Home';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import PostJob from './pages/PostJob';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Community from './pages/Community';
import FieldInfo from './pages/FieldInfo';
import RegionalRecruit from './pages/RegionalRecruit';
import SiteMap from './pages/SiteMap';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile);
        } else {
          // New user - default to agent role
          const newProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
            role: 'agent',
            createdAt: new Date().toISOString(),
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), {
            ...newProfile,
            createdAt: serverTimestamp(),
          });
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900 font-sans">
        <Header user={user} profile={profile} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/recruit/regional" element={<RegionalRecruit />} />
            <Route path="/siteMap" element={<SiteMap />} />
            <Route path="/jobs/:id" element={<JobDetail user={user} profile={profile} />} />
            <Route path="/field-info" element={<FieldInfo />} />
            <Route path="/community" element={<Community user={user} profile={profile} />} />
            <Route 
              path="/post-job" 
              element={profile?.role === 'company' ? <PostJob user={user} /> : <Navigate to="/jobs" />} 
            />
            <Route path="/profile" element={user ? <Profile user={user} profile={profile} /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
