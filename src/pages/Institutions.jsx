import { Link } from 'react-router-dom'
import { PageHero, Card, Reveal, SectionHead } from '../components/UI.jsx'

export default function Institutions() {
  return (
    <>
      <PageHero eyebrow="Institution option" title="For medical schools & training institutions"
        lead="Manage a whole cohort in one place — multi-learner accounts, bulk payments, institution voucher codes and live progress tracking.">
        <Link to="/join" className="btn" style={{ marginTop: 16 }}>Request institution access</Link>
      </PageHero>
      <section className="section tight">
        <div className="container">
          <div className="grid g3">
            <Card className="tint-teal"><h4>Multi-learner accounts</h4><p className="sm">Create and manage a full set of students under one institution account.</p></Card>
            <Card className="tint-teal"><h4>Bulk payments</h4><p className="sm">Consolidated invoicing for cohorts instead of individual card payments.</p></Card>
            <Card className="tint-teal"><h4>Voucher codes</h4><p className="sm">Institution-specific discounts released to your students at enrolment.</p></Card>
            <Card className="tint-teal"><h4>Progress tracking</h4><p className="sm">See learner progress and completion status across the cohort.</p></Card>
            <Card className="tint-teal"><h4>Assessment support</h4><p className="sm">Review and mark Certification Plus submissions, with automated feedback to candidates.</p></Card>
            <Card className="tint-teal"><h4>Certificates &amp; outcomes</h4><p className="sm">Manage certificates and Pass / Resubmit outcomes from the portal.</p></Card>
          </div>
          <Reveal delay={0.12}>
            <Card style={{ marginTop: 26 }}>
              <h3>How onboarding works for an institution</h3>
              <div className="grid g4" style={{ marginTop: 14 }}>
                {['Institution account created', 'Cohort list uploaded / shared', 'Bulk payment or voucher codes issued', 'Coordinator dashboard goes live'].map((t, i) => (
                  <div key={t} className="card flat" style={{ padding: 16 }}>
                    <div className="step-n">{i + 1}</div>
                    <div className="sm" style={{ marginTop: 10, fontWeight: 600 }}>{t}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  )
}
