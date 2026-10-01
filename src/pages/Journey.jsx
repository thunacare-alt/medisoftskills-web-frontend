import { Link } from 'react-router-dom'
import { Reveal, PageHero, Card, SectionHead } from '../components/UI.jsx'
import { journeyStages, rules } from '../data/site.js'

// Seven stages read as a flat list. Grouping them into three phases gives the
// page a spine: what happens before you enrol, while you learn, and at the end.
const phases = [
  { from: 1, to: 3, t: 'Before you enrol', d: 'Discover the course, create your account and clear KYC.' },
  { from: 4, to: 5, t: 'Enrol & learn', d: 'Choose your package, pay, then work through the e-learning.' },
  { from: 6, to: 7, t: 'Complete & certify', d: 'Practise in the skills labs, get assessed, download your certificate.' }
]

export default function Journey() {
  const phaseOf = n => phases.find(p => n >= p.from && n <= p.to)
  return (
    <>
      <PageHero eyebrow="How it works" title="The learner journey, screen by screen"
        lead="Seven stages from first visit to certificate. Each stage shows the learner screens and the support that runs behind them." />
      <section className="section tight">
        <div className="container">
          <Reveal>
            <div className="stepper">
              {journeyStages.map((s, i) => (
                <span key={s.n} style={{ display: 'contents' }}>
                  <span className="dot"><i>{s.n}</i>{s.stage}</span>
                  {i < journeyStages.length - 1 && <span className="sep" />}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="tl" style={{ marginTop: 34 }}>
            {journeyStages.map((s, i) => {
              const ph = phaseOf(s.n)
              return (
                <div key={s.n}>
                  {ph && s.n === ph.from && (
                    <Reveal>
                      <div className="phase">
                        <b>{ph.t}</b>
                        <span>{ph.d}</span>
                      </div>
                    </Reveal>
                  )}
                  <Reveal delay={i * 0.03}>
                    <div className="tl-stage">
                      <div className="tl-node">{s.n}</div>
                      <div className="tl-head">
                        <b>{s.stage}</b>
                        <span className="tl-agent">{s.agent}</span>
                      </div>
                      <div className="tl-screens">
                        {s.screens.map(sc => (
                          <div key={sc.t} className={'scr ' + (sc.tone || '')}>
                            <b>{sc.t}</b><span>{sc.d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <SectionHead center eyebrow="Back-office" title="What runs behind the learner screens" />
          <div className="grid g3" style={{ marginTop: 26 }}>
            <Card className="tint-teal"><h4>Admin portal</h4><p className="sm">KYC review queue, learner records, content and test management, coupons and vouchers.</p></Card>
            <Card className="tint-teal"><h4>Institution accounts</h4><p className="sm">Bulk learners, bulk payments, institution voucher codes, coordinator dashboard.</p></Card>
            <Card className="tint-teal"><h4>Certificates &amp; outcomes</h4><p className="sm">Pass / resubmit decisions, certificate issuance, learner progress tracking.</p></Card>
          </div>
          <Reveal delay={0.12}>
            <div className="note" style={{ marginTop: 24 }}>
              <b>Rules built into the flow</b>
              <ul className="list dash" style={{ marginTop: 8 }}>{rules.map(r => <li key={r}>{r}</li>)}</ul>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/join" className="btn">Start with Create account</Link>
              <Link to="/packages" className="btn ghost">See packages</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
