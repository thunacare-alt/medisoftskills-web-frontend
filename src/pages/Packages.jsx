import { Link } from 'react-router-dom'
import { Reveal, SectionHead, Card, Badge, Price, PageHero } from '../components/UI.jsx'
import { packages, faqs } from '../data/site.js'

export default function Packages() {
  return (
    <>
      <PageHero eyebrow="Packages & fees" title="Choose your package — buy any time, complete in sequence."
        lead="Five packages, 56 CPD hours in total. Each package is open for 60 days from activation, and the next one unlocks when the previous is completed.">
        <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
          <Link to="/join" className="btn">Join the Course</Link>
          <Link to="/journey" className="btn ghost">See the learner journey</Link>
        </div>
      </PageHero>

      <section className="section tight">
        <div className="container">
          <div className="grid g3">
            {packages.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <Card hover className={'card ' + (p.final ? 'tint-crimson' : 'tint-brand')}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Badge tone={p.tone}>Package {p.order}</Badge>
                    <span className="xs muted">{p.hours}</span>
                  </div>
                  <h3 style={{ marginTop: 14 }}>{p.name}</h3>
                  <p className="sm">{p.summary}</p>
                  <ul className="list">{p.contents.map(c => <li key={c}>{c}</li>)}</ul>
                  <div style={{ marginTop: 14, borderTop: '1px solid var(--line)', paddingTop: 14 }}>
                    <Price pkg={p} />
                  </div>
                  <Link to={'/checkout?p=' + p.id} className="btn block sm" style={{ marginTop: 14 }}>
                    {p.final ? 'Purchase Certification Plus' : 'Purchase ' + p.name}
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Comparison" title="Contents, hours and pathway at a glance" />
          <Reveal>
            <div className="tbl-wrap">
              <table className="tbl">
                <thead>
                  <tr><th>Order</th><th>Package</th><th>Contents</th><th>CPD hours</th><th>Completion pathway</th><th>Fee</th></tr>
                </thead>
                <tbody>
                  {packages.map(p => (
                    <tr key={p.id}>
                      <td>{p.order}</td>
                      <td><b>{p.name}</b>{p.final && <div className="xs muted">Qualifies for MAcadMEd route</div>}</td>
                      <td>{p.contents.join(' + ')}</td>
                      <td>{p.hours}</td>
                      <td>{p.pathway === 'lab' ? 'Practice lab + feedback form' : p.pathway === 'certification' ? 'Self-assessment, assignment, certification' : 'E-learning modules, test, feedback form'}</td>
                      <td>{p.price ? '₹' + p.price.toLocaleString('en-IN') : 'On request'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="note info" style={{ marginTop: 22 }}>
              <b>Sequential purchase rule:</b> packages may be bought at any time but must be completed in the order
              Basic → Basic Plus → Advanced → Advanced Plus → Certification Plus. Access to the next package opens automatically on completion.
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <SectionHead center eyebrow="FAQs" title="Questions learners ask before buying" />
          <div style={{ marginTop: 26 }}>
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <Card style={{ marginBottom: 12 }}>
                  <h4>{f.q}</h4>
                  <p className="sm" style={{ marginBottom: 0 }}>{f.a}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
