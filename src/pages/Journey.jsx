import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Reveal, PageHero, Card, SectionHead, useInViewOnce } from '../components/UI.jsx'
import { useScrollProgress, useActiveIndex } from '../components/Motion.jsx'
import { journeyStages, rules } from '../data/site.js'

/* One stage. Marks itself "seen" the first time it enters the viewport, which is
   what fires the node pop and the staggered screen tiles in CSS. */
function Stage({ stage }) {
  const [ref, seen] = useInViewOnce(0.25)
  return (
    <div ref={ref} className={'tl-stage' + (seen ? ' seen' : '')}>
      <div className="tl-node">{stage.n}</div>
      <div className="tl-head">
        <b>{stage.stage}</b>
        <span className="tl-agent">{stage.agent}</span>
      </div>
      <div className="tl-screens">
        {stage.screens.map((sc, j) => (
          <div key={sc.t} className={'scr ' + (sc.tone || '')} style={{ '--i': j }}>
            <b>{sc.t}</b><span>{sc.d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Three-phase flow map — inline SVG, ~1 KB, connectors drawn with animated
   dashes. Scales to any width, no image request, no runtime. */
function JourneyMap() {
  const rows = [
    { t: 'Before you enrol', d: 'Discover · Account · KYC' },
    { t: 'Enrol & learn', d: 'Package · Payment · E-learning' },
    { t: 'Complete & certify', d: 'Labs · Assessment · Certificate' }
  ]
  return (
    <svg className="jmap" viewBox="0 0 900 152" role="img"
      aria-label="The learner journey in three phases: before you enrol, enrol and learn, complete and certify">
      <defs>
        <linearGradient id="jmapGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0d5bd1" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      {rows.map((r, i) => (
        <g key={r.t} transform={'translate(' + (20 + i * 293) + ',34)'}>
          <rect width="274" height="84" rx="16" fill="#fff" stroke="#e6e8ee" />
          <rect width="274" height="3" rx="1.5" fill="url(#jmapGrad)" />
          <text x="20" y="34" fontSize="15" fontWeight="600" fill="#0f172a">{r.t}</text>
          <text x="20" y="58" fontSize="12" fill="#667085">{r.d}</text>
          <text x="20" y="76" fontSize="10.5" fontWeight="700" letterSpacing="1.2" fill="#0d5bd1">PHASE {i + 1}</text>
        </g>
      ))}
      {[0, 1].map(i => (
        <line key={i} className="flow" x1={294 + i * 293} y1="76" x2={313 + i * 293} y2="76"
          stroke="#0d5bd1" strokeWidth="2" strokeLinecap="round" />
      ))}
    </svg>
  )
}

// Seven stages read as a flat list. Grouping them into three phases gives the
// page a spine: what happens before you enrol, while you learn, and at the end.
const phases = [
  { from: 1, to: 3, t: 'Before you enrol', d: 'Discover the course, create your account and clear KYC.' },
  { from: 4, to: 5, t: 'Enrol & learn', d: 'Choose your package, pay, then work through the e-learning.' },
  { from: 6, to: 7, t: 'Complete & certify', d: 'Practise in the skills labs, get assessed, download your certificate.' }
]

export default function Journey() {
  const phaseOf = n => phases.find(p => n >= p.from && n <= p.to)
  const tlRef = useRef(null)
  useScrollProgress(tlRef)                        // writes --p on the timeline
  const active = useActiveIndex(tlRef, '.tl-stage')
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
                  <span className={'dot' + (i === active ? ' on' : '')}><i>{s.n}</i>{s.stage}</span>
                  {i < journeyStages.length - 1 && <span className={'sep' + (i < active ? ' on' : '')} />}
                </span>
              ))}
            </div>
          </Reveal>

          <JourneyMap />

          <div className="tl" ref={tlRef} style={{ marginTop: 30 }}>
            <div className="head-dot" aria-hidden="true" />
            {journeyStages.map((s) => {
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
                  <Stage stage={s} />
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
