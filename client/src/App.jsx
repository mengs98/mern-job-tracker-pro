import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  About,
  Auth,
  Blog,
  ContactUs,
  DashboardAllJobs,
  DashboardFavoritedArticles,
  DashboardProfile,
  DashboardResumeBuilder,
  DashboardSharedLayout,
  DashboardStats,
  Features,
  Landing,
  LandingSharedLayout,
  NotFound,
  ProtectedRoute,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingSharedLayout />}>
          <Route index element={<Landing />} />
          <Route path='about' element={<About />} />
          <Route path='features' element={<Features />} />
          <Route path='blog' element={<Blog />} />
          <Route path='contact-us' element={<ContactUs />} />
          <Route path='auth' element={<Auth />} />
        </Route>
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <DashboardSharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardStats />} />
          <Route path='/dashboard/all-jobs' element={<DashboardAllJobs />} />
          <Route path='/dashboard/profile' element={<DashboardProfile />} />
          <Route path='/dashboard/resume-builder' element={<DashboardResumeBuilder />} />
          <Route
            path='/dashboard/favorited-articles'
            element={<DashboardFavoritedArticles />}
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
