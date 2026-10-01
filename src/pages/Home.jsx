import { Link } from 'react-router-dom'
import { Reveal, Chip, Badge, SectionHead, Card } from '../components/UI.jsx'
import { Marquee, StatBand } from '../components/Motion.jsx'
import { packages, journeyStages, pathways, rules, brand } from '../data/site.js'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <Reveal>
              <div className="eyebrow">Certificate course · Healthcare professional skills</div>
              <h1>Build the clinical skills that get you certified.</h1>
              <p className="lead">
                {brand.tagline} — five sequential packages of e-learning, virtual practice labs and a
                reflective assessment, delivered fully online.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 22 }}>
                <Link to="/join" className="btn">Join the Course</Link>
                <Link to="/packages" className="btn ghost">View packages &amp; fees</Link>
              </div>
              <div className="trust">
                <Chip>56 CPD hours across 5 packages</Chip>
                <Chip>60-day access per package</Chip>
                <Chip>MAcadMEd route (AoME, UK)</Chip>
                <Chip>Virtual skills labs</Chip>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <DashboardPreview />
          </Reveal>
        </div>
      </section>

      <StatBand
        stats={[
          { value: 56, label: 'CPD hours on completion' },
          { value: 5, label: 'Sequential packages' },
          { value: 60, suffix: ' days', label: 'Access per package' },
          { value: 100, suffix: '%', label: 'Online & self-paced' }
        ]}
      />

      <Marquee
        items={[
          'Basic Theory', 'E-Learning', 'Virtual Skills Lab', 'Certification Plus',
          'MAcadMEd route (AoME, UK)', '56 CPD hours', 'Reflective assessment', '60-day access'
        ]}
      />

      <section className="section alt">
        <div className="container">
          <SectionHead center eyebrow="How it works" title="Your learning journey, end to end"
            lead="From the first enquiry to the certificate — eight steps, five packages, one clear path." />
          <div className="grid g4" style={{ marginTop: 34 }}>
            {journeyStages.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.04}>
                <Card hover>
                  <div className="step-n">{s.n}</div>
                  <h3 style={{ marginTop: 12 }}>{s.stage}</h3>
                  <ul className="list dash" style={{ marginTop: 6 }}>
                    {s.screens.slice(0, 3).map(sc => <li key={sc.t}><b style={{ fontWeight: 600 }}>{sc.t}</b> — {sc.d}</li>)}
                  </ul>
                </Card>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <Card hover className="tint-teal">
                <div className="step-n" style={{ background: 'var(--teal)' }}>★</div>
                <h3 style={{ marginTop: 12 }}>Certificate</h3>
                <p className="sm">Download the certificate on passing Certification Plus — or resubmit the assignment within 30 days.</p>
                <Link className="link-arrow" to="/journey">See the full flow →</Link>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Packages" title="Five packages. Buy any time, complete in sequence."
            lead="Each package carries its own CPD hours and its own pathway. Access is open for 60 days from activation." />
          <div className="grid g3" style={{ marginTop: 30 }}>
            {packages.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <Card hover className={'card tint-' + (p.id === 'certification-plus' ? 'crimson' : 'brand')}>
                  <div className="card-head">
                    <Badge tone={p.tone}>Step {p.order}</Badge>
                    <span className="xs muted cpd">{p.hours}</span>
                  </div>
                  <h3 style={{ marginTop: 14 }}>{p.name}</h3>
                  <p className="sm">{p.summary}</p>
                  <ul className="tick">{p.contents.map(c => <li key={c}>{c}</li>)}</ul>
                  <div className="card-foot">
                    <span className="cpd">{p.hours}</span>
                    <span>· 60-day access from activation</span>
                  </div>
                </Card>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <Card className="tint-teal">
                <h3>Not sure where to start?</h3>
                <p className="sm">Start with Basic. Your counsellor will confirm the right pathway for your role and speciality.</p>
                <Link to="/packages" className="btn ghost sm">Compare all packages</Link>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead center eyebrow="Completion pathways" title="How each package is completed" />
          <div className="grid g3" style={{ marginTop: 30 }}>
            {pathways.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <Card className={p.tone}>
                  <h3>{p.title}</h3>
                  <div className="xs muted" style={{ marginBottom: 8 }}>{p.sub}</div>
                  <ul className="list">{p.items.map(it => <li key={it}>{it}</li>)}</ul>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="note" style={{ marginTop: 26 }}>
              <b>Rules that apply to every learner:</b>
              <ul className="list dash" style={{ marginTop: 8 }}>
                {rules.map(r => <li key={r}>{r}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Card className="tint-brand" style={{ padding: 34 }}>
            <div className="grid g2" style={{ alignItems: 'center', gap: 30 }}>
              <div>
                <div className="eyebrow">For medical schools &amp; training institutions</div>
                <h2>Enrol a whole cohort, not one learner at a time.</h2>
                <p>Institution accounts give you multi-learner management, bulk payments, institution-specific voucher codes and live progress tracking.</p>
                <Link to="/institutions" className="btn dark">Explore the institution option</Link>
              </div>
              <div className="grid g2">
                <Card className="flat"><div className="kpi">5</div><div className="sm muted">Packages, sequential</div></Card>
                <Card className="flat"><div className="kpi">56</div><div className="sm muted">Total CPD hours</div></Card>
                <Card className="flat"><div className="kpi">60</div><div className="sm muted">Days access per package</div></Card>
                <Card className="flat"><div className="kpi">30</div><div className="sm muted">Day resubmission window</div></Card>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  )
}

function DashboardPreview() {
  return (
    <div className="card" style={{ padding: 18, boxShadow: 'var(--sh-2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <b style={{ fontFamily: '"Plus Jakarta Sans",sans-serif' }}>My courses</b>
        <Badge tone="b2">Access: 60 days</Badge>
      </div>
      {packages.slice(0, 4).map((p, i) => {
        const pct = [100, 65, 20, 0][i]
        return (
          <div key={p.id} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 5 }}>
              <span style={{ fontWeight: 600 }}>{p.order}. {p.name}</span>
              <span style={{ color: pct === 100 ? 'var(--teal)' : 'var(--muted)' }}>{pct === 100 ? 'Completed' : pct === 0 ? 'Locked' : pct + '%'}</span>
            </div>
            <div className="prog"><i style={{ width: pct + '%' }} /></div>
          </div>
        )
      })}
      <div className="note info" style={{ marginTop: 6, padding: '11px 13px' }}>
        <b className="sm">Next action:</b> <span className="sm">Basic Plus — practice lab module 2 of 6.</span>
      </div>
    </div>
  )
}
