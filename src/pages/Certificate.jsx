import { Link } from 'react-router-dom'
import { Reveal, SectionHead, Card, Badge, PageHero } from '../components/UI.jsx'

// Re-created from the supplied official sample (AMSS E-LEARNING COURSE CERTIFICATE.pdf).
// CSS only — no image file, nothing added to the first-paint budget.
const cert = {
  course: 'Advanced Medical Soft Skills E-learning Course',
  subjects: 'Lifelong Learning · Communication · Ethics · Professionalism · Leadership · Teamwork',
  awardFrom: ['Royal College of Surgeons of Edinburgh, UK', 'CPD Certification Service, UK'],
  hours: 16,
  director: 'Dr Vijay Jeganath',
  directorRole: 'Course Director',
}

const onCertificate = [
  ['Learner name', 'Confirmed by KYC at enrolment, so the name matches the verified ID'],
  ['Course title', cert.course],
  ['Subjects covered', 'The six non-technical skills, named exactly as assessed'],
  ['Awarding bodies', cert.awardFrom.join(' and ')],
  ['CPD award', '16 CPD hours on the e-learning certificate — up to 56 across all five packages'],
  ['Date and venue', 'Date of completion and delivery mode (online)'],
  ['Certificate number', 'Unique, sequential — used to verify authenticity'],
  ['Course Director', cert.director + ' — countersigned authority'],
]

export default function Certificate() {
  return (
    <>
      <PageHero
        eyebrow="Certification"
        title="This is what your learners actually receive."
        lead="Reproduced from our own certificate template. Every element is verified: the name against KYC, the CPD award against the completed packages, and the certificate number against our issued record.">
        <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
          <Link to="/packages" className="btn">See the packages</Link>
          <Link to="/journey" className="btn ghost">How learners get here</Link>
        </div>
      </PageHero>

      <section className="section tight">
        <div className="container">
          <Reveal>
            <div className="cert-wrap">
              <div className="cert">
                <div className="cert-inner">
                  <div className="cert-crest">M</div>
                  <p className="cert-kicker">Certificate of Completion</p>
                  <div className="cert-rule" />
                  <p className="cert-line">This is to certify that</p>
                  <p className="cert-name">Dr Aisha Rahman</p>
                  <p className="cert-course">
                    has successfully completed the<br />
                    <b>{cert.course}</b>
                  </p>
                  <p className="cert-subjects">on {cert.subjects}</p>
                  <p className="cert-award">
                    with the following CPD award from the<br />
                    <b>{cert.awardFrom[0]}</b> and <b>{cert.awardFrom[1]}</b>
                  </p>
                  <div className="cert-hours">
                    <span className="cert-hours-n">{cert.hours}</span>
                    <span className="cert-hours-l">CPD hours</span>
                  </div>
                  <div className="cert-meta">
                    <span>Date 14/03/2026</span>
                    <span>Venue Online</span>
                    <span>Certificate No. MSS-2026-0271</span>
                  </div>
                  <div className="cert-sign">
                    <span className="cert-sig-line" />
                    <b>{cert.director}</b>
                    <span>{cert.directorRole}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="xs muted center" style={{ marginTop: 14 }}>
              Sample certificate. Each certificate is issued in the learner's own name with a unique number.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="On the certificate" title="Eight fields, each one traceable." />
          <div className="grid g2">
            {onCertificate.map((r, i) => (
              <Reveal key={r[0]} delay={i * 0.03}>
                <div className="kpi" style={{ height: '100%' }}>
                  <span className="xs muted">{r[0]}</span>
                  <b style={{ display: 'block', marginTop: 6, fontSize: 15, fontWeight: 700 }}>{r[1]}</b>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="grid g3">
            <Card className="card tint-brand">
              <Badge tone="b1">Verification</Badge>
              <h3 style={{ marginTop: 12 }}>Certificate numbers are sequential</h3>
              <p className="sm">
                Each certificate carries a unique number issued from a single register. Institutions can ask us to
                confirm any certificate against that record.
              </p>
            </Card>
            <Card className="card tint-teal">
              <Badge tone="b2">CPD ledger</Badge>
              <h3 style={{ marginTop: 12 }}>Hours are earned, not assumed</h3>
              <p className="sm">
                The CPD award on the certificate follows the packages completed — 16 hours for the e-learning module,
                up to 56 across all five packages.
              </p>
            </Card>
            <Card className="card tint-violet">
              <Badge tone="b4">MAcadMEd route</Badge>
              <h3 style={{ marginTop: 12 }}>Certification Plus unlocks the route</h3>
              <p className="sm">
                The MAcadMEd fast-track route from the Academy of Medical Educators (UK) requires Certification Plus
                and completion of all requirements within one year.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="note">
            <b>For institutions:</b> certificates can be issued in bulk against a single institution voucher code,
            with a coordinator-level record of every learner's award. <Link to="/institutions">See the institution
            option</Link>.
          </div>
        </div>
      </section>
    </>
  )
}
