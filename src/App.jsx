import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

  // Warm the remaining route chunks once the browser is idle: navigation feels
  // instant without paying for those bytes during first paint.
  useEffect(() => {
    const warm = () => {
      import('./pages/Packages.jsx')
      import('./pages/Journey.jsx')
      import('./pages/Institutions.jsx')
      import('./pages/Join.jsx')
      import('./pages/KYC.jsx')
      import('./pages/Checkout.jsx')
      import('./pages/Dashboard.jsx')
    }
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(warm, { timeout: 2500 })
      : setTimeout(warm, 2000)
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id)
      else clearTimeout(id)
    }
  }, [])

  return (
    <Layout>
      <ScrollTop />
      <FloatEnquiry />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
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
        </motion.main>
      </AnimatePresence>
    </Layout>
  )
}
