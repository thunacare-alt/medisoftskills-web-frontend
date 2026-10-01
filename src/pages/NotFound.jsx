import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <section className="section">
      <div className="container center">
        <div className="eyebrow">404</div>
        <h1>That page isn’t part of the course flow.</h1>
        <p className="lead" style={{ margin: '0 auto 18px' }}>Try the learner journey, packages, or start with joining the course.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn">Home</Link>
          <Link to="/journey" className="btn ghost">How it works</Link>
          <Link to="/join" className="btn ghost">Join the Course</Link>
        </div>
      </div>
    </section>
  )
}
