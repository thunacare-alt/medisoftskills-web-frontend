import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Packages from './pages/Packages.jsx'
import Journey from './pages/Journey.jsx'
import Join from './pages/Join.jsx'
import KYC from './pages/KYC.jsx'
import Checkout from './pages/Checkout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Institutions from './pages/Institutions.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <Layout>
      <ScrollTop />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
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
        </motion.main>
      </AnimatePresence>
    </Layout>
  )
}
