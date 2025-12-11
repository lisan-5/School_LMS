import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import CoursesPage from './pages/CoursesPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CourseDetailPage from './pages/CourseDetailPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PricingPage from './pages/PricingPage'
import FAQPage from './pages/FAQPage'
import ContactPage from './pages/ContactPage'
import { AuthProvider, useAuth } from './auth/AuthContext'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="page">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App

