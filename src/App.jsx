import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Loader2 } from 'lucide-react';

// Lazy loads
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const SetupPage = lazy(() => import('./pages/SetupPage'));
const OverviewPage = lazy(() => import('./pages/OverviewPage'));
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const BoothPage = lazy(() => import('./pages/BoothPage'));
const ECIMapPage = lazy(() => import('./pages/ECIMapPage'));
const ParliamentPage = lazy(() => import('./pages/ParliamentPage'));
const ScenarioPage = lazy(() => import('./pages/ScenarioPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));

const PageLoader = () => (
  <div className="min-h-screen doodle-bg flex flex-col items-center justify-center gap-6" role="status" aria-label="Loading Election Sahayak">
    <div className="relative">
      <div className="w-20 h-20 rounded-full border-4 border-saffron-100 border-t-saffron-500 animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-transparent border-t-indiagreen-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.7s' }} />
      </div>
    </div>
    <div className="text-center">
      <p className="text-slate-800 font-black text-lg tracking-tight">Election Sahayak</p>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Securing your session...</p>
    </div>
    <div className="h-1 w-48 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-saffron-500 to-indiagreen-500 rounded-full animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
    </div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { currentUser, userData, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!currentUser) return <Navigate to="/auth" replace />;
  if (!userData?.profileCompleted) return <Navigate to="/setup" replace />;
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};

const AuthRequired = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!currentUser) return <Navigate to="/auth" replace />;
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};

const AppRoutes = () => {
  const { currentUser, userData, loading } = useAuth();

  if (loading) return <PageLoader />;

  return (
    <Routes>
      <Route path="/" element={
        currentUser ? (userData?.profileCompleted ? <Navigate to="/dashboard" replace /> : <Navigate to="/setup" replace />) : <Suspense fallback={<PageLoader />}><LandingPage /></Suspense>
      } />
      
      <Route path="/auth" element={
        currentUser ? (userData?.profileCompleted ? <Navigate to="/dashboard" replace /> : <Navigate to="/setup" replace />) : <Suspense fallback={<PageLoader />}><AuthPage /></Suspense>
      } />

      <Route path="/setup" element={
        <AuthRequired>
          {userData?.profileCompleted ? <Navigate to="/dashboard" replace /> : <SetupPage />}
        </AuthRequired>
      } />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<OverviewPage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="booth" element={<BoothPage />} />
        <Route path="eci-map" element={<ECIMapPage />} />
        <Route path="parliament" element={<ParliamentPage />} />
        <Route path="quiz" element={<QuizPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
