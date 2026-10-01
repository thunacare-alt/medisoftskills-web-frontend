import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Layout from './components/Layout.jsx'
import { FloatEnquiry } from './components/Motion.jsx'

// Home stays in the entry chunk (it is the landing page). Every other route is
// code-split so first paint ships a fraction of the JavaScript.
import Home from './pages/Home.jsx'
const Packages = lazy(() => import('./pages/Packages.jsx'))
const Journey = lazy(() => import('./pages/Journey.jsx'))
const Join = lazy(() => import('./pages/Join.jsx'))
const KYC = lazy(() => import('./pages/KYC.jsx'))
const Checkout = lazy(() => import('./pages/Checkout.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Institutions = lazy(() => import('./pages/Institutions.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function RouteFallback() {
  return <div className="route-loader"><span /></div>
}

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()

  // Fetch a route's chunk the moment a visitor shows intent — hover or keyboard focus
  // on its link — rather than downloading every route up front. Nobody pays for a page
  // they never open, and navigation still feels instant.
  useEffect(() => {
    const loaders = {
      '#/packages': () => import('./pages/Packages.jsx'),
      '#/journey': () => import('./pages/Journey.jsx'),
      '#/institutions': () => import('./pages/Institutions.jsx'),
      '#/join': () => import('./pages/Join.jsx'),
      '#/kyc': () => import('./pages/KYC.jsx'),
      '#/checkout': () => import('./pages/Checkout.jsx'),
      '#/dashboard': () => import('./pages/Dashboard.jsx')
    }
    const warm = (e) => {
      const el = e.target && e.target.closest ? e.target.closest('a[href^="#/"]') : null
      if (!el) return
      const key = el.getAttribute('href').split('?')[0]
      if (loaders[key]) loaders[key]()
    }
    document.addEventListener('pointerover', warm, { passive: true })
    document.addEventListener('focusin', warm)
    return () => {
      document.removeEventListener('pointerover', warm)
      document.removeEventListener('focusin', warm)
    }
  }, [])

  return (
    <Layout>
      <ScrollTop />
      <FloatEnquiry />
      <main key={location.pathname} className="route-fade">
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/join" element={<Join />} />
            <Route path="/kyc" element={<KYC />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/institutions" element={<Institutions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </Layout>
  )
}
