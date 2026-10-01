import { Link } from 'react-router-dom'
import { Card, Badge, Reveal, SectionHead } from '../components/UI.jsx'
import { packages } from '../data/site.js'

const state = [
  { pct: 100, status: 'Completed' },
  { pct: 65, status: 'In progress' },
  { pct: 0, status: 'Locked' },
  { pct: 0, status: 'Locked' },
  { pct: 0, status: 'Locked' }
]

export default function Dashboard() {
  return (
    <>
      <section className="section tight" style={{ background: 'var(--bg)', paddingTop: 34 }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div>
              <div className="eyebrow">Learner dashboard</div>
              <h1 style={{ fontSize: 32, marginBottom: 4 }}>Welcome back, Dr. Sharma</h1>
              <p className="sm muted" style={{ marginBottom: 0 }}>KYC: approved · Course: {packages[0].name} completed · Access window: 47 days left</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/checkout" className="btn">Buy next package</Link>
              <button className="btn ghost">Download certificate</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="grid g4" style={{ marginBottom: 26 }}>
            <Card className="flat"><div className="kpi">24</div><div className="sm muted">CPD hours completed</div></Card>
            <Card className="flat"><div className="kpi">47</div><div className="sm muted">Days access remaining</div></Card>
            <Card className="flat"><div className="kpi">2/5</div><div className="sm muted">Packages started</div></Card>
            <Card className="flat"><div className="kpi">1</div><div className="sm muted">Certificate pending</div></Card>
          </div>

          <SectionHead eyebrow="My packages" title="Sequential progress" lead="The next package unlocks automatically when the current one is completed." />
          <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
            {packages.map((p, i) => {
              const s = state[i]
              return (
                <Reveal key={p.id} delay={i * 0.04}>
                  <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
                      <div style={{ flex: '1 1 320px' }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <b>Package {p.order} · {p.name}</b>
                          <Badge tone={s.pct === 100 ? 'b2' : s.pct > 0 ? 'b3' : 'grey'}>{s.status}</Badge>
                        </div>
                        <div className="xs muted" style={{ margin: '6px 0 10px' }}>{p.contents.join(' + ')} · {p.hours}</div>
                        <div className="prog"><i style={{ width: s.pct + '%' }} /></div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {s.pct === 100 && <Link className="btn ghost sm" to="/packages">Review modules</Link>}
                        {s.pct > 0 && s.pct < 100 && <Link className="btn sm" to="/journey">Resume module 2</Link>}
                        {s.pct === 0 && <button className="btn ghost sm" disabled>Locked — complete previous</button>}
                      </div>
                    </div>
                  </Card>
                </Reveal>
              )
            })}
          </div>

          <div className="grid g2" style={{ marginTop: 26 }}>
            <Card className="tint-teal">
              <h4>Next actions</h4>
              <ul className="list dash">
                <li>Finish practice lab module 2 of 6 (Basic Plus)</li>
                <li>Course test unlocks after all Basic Plus modules</li>
                <li>Submit course feedback form to close the package</li>
              </ul>
            </Card>
            <Card className="tint-crimson">
              <h4>Certification route</h4>
              <p className="sm">Certification Plus is the qualifying package for MAcadMEd through the Academy of Medical Educators (AoME), UK — all requirements must be completed within one year.</p>
              <Link to="/checkout?p=certification-plus" className="btn sm">Purchase Certification Plus</Link>
            </Card>
          </div>
          <div className="xs muted" style={{ marginTop: 18 }}>Demo data — the live dashboard reads learner, package and progress records from the API.</div>
        </div>
      </section>
    </>
  )
}
