import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { brand, nav } from '../data/site.js'

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="nav">
        <div className="container nav-in">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <span className="logo">M</span>
            <span className="brand-name">{brand.name}</span>
          </Link>
          <nav className={'nav-links' + (open ? ' open' : '')} onClick={() => setOpen(false)}>
            {nav.map(n => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? 'on' : '')} end={n.to === '/'}>{n.label}</NavLink>
            ))}
          </nav>
          <div className="nav-cta">
            <Link to="/dashboard" className="btn ghost sm">Learner login</Link>
            <Link to="/join" className="btn sm">Join the Course</Link>
            <button className="burger" onClick={() => setOpen(o => !o)} aria-label="Menu">☰</button>
          </div>
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="container">
          <div>
            <div className="brand" style={{ color: '#fff' }}>
              <span className="logo">M</span><span className="brand-name">{brand.name}</span>
            </div>
            <p style={{ color: '#9db0c8', marginTop: 12, maxWidth: 320, fontSize: 14 }}>
              {brand.tagline}. {brand.strap}.
            </p>
          </div>
          <div>
            <h4>Course</h4>
            <Link to="/packages">Packages &amp; fees</Link>
            <Link to="/journey">How it works</Link>
            <Link to="/packages">CPD hours</Link>
          </div>
          <div>
            <h4>Learners</h4>
            <Link to="/join">Join the course</Link>
            <Link to="/kyc">KYC &amp; verification</Link>
            <Link to="/dashboard">Learner dashboard</Link>
          </div>
          <div>
            <h4>Institutions</h4>
            <Link to="/institutions">Medical schools</Link>
            <Link to="/institutions">Bulk enrolment</Link>
            <Link to="/institutions">Voucher codes</Link>
          </div>
        </div>
        <div className="container foot-bot">
          <span>© {new Date().getFullYear()} {brand.name} · {brand.site}</span>
          <span>Awarded with the Royal College of Surgeons of Edinburgh (UK) and CPD Certification Service (UK) · MAcadMEd route via the Academy of Medical Educators (UK)</span>
        </div>
      </footer>
    </>
  )
}
