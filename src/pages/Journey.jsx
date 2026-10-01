import { Link } from 'react-router-dom'
import { Reveal, PageHero, Card, SectionHead } from '../components/UI.jsx'
import { journeyStages, rules } from '../data/site.js'

export default function Journey() {
  return (
    <>
      <PageHero eyebrow="How it works" title="The learner journey, screen by screen"
        lead="Seven stages from first visit to certificate. Each stage shows the learner screens and the support that runs behind them." />
      <section className="section tight">
        <div className="container">
          <div className="rail">
            {journeyStages.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.04}>
                <div className="rail-row">
                  <div className="rail-stage">
                    <b>{s.n}. {s.stage}</b>
                    <span>{s.agent}</span>
                  </div>
                  <div className="rail-screens">
                    {s.screens.map(sc => (
                      <div key={sc.t} className={'scr ' + (sc.tone || '')}>
                        <b>{sc.t}</b><span>{sc.d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
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
