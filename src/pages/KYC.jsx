import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHero, Card, Stepper } from '../components/UI.jsx'

const docs = [
  { id: 'id', label: 'Government photo ID', hint: 'Aadhaar, passport or driving licence' },
  { id: 'qual', label: 'Qualification certificate', hint: 'Nursing / medical degree or diploma' },
  { id: 'reg', label: 'Professional registration', hint: 'State or national council registration' }
]

export default function KYC() {
  const [files, setFiles] = useState({})
  const [status, setStatus] = useState('draft') // draft | pending | approved | rejected
  const [reason] = useState('Registration certificate image was blurred — please re-upload a clear scan.')
  const [busy, setBusy] = useState(false)

  function pick(id, e) {
    const f = e.target.files?.[0]
    if (f) setFiles(v => ({ ...v, [id]: { name: f.name, size: Math.round(f.size / 1024) } }))
  }

  function submit() {
    setBusy(true)
    setTimeout(() => { setBusy(false); setStatus('pending') }, 900)
  }

  const done = Object.keys(files).length === docs.length

  return (
    <>
      <PageHero eyebrow="KYC verification" title="Upload your documents for verification"
        lead="Your KYC is reviewed by our team. Approval is usually same-day, and course access opens as soon as it clears." />
      <section className="section tight">
        <div className="container" style={{ maxWidth: 780 }}>
          <Stepper steps={['Account active', 'Submit KYC', 'KYC approved']} current={status === 'approved' ? 2 : status === 'draft' ? 1 : 1} />

          {status === 'rejected' && <div className="note bad sm" style={{ marginBottom: 14 }}><b>Documents need attention:</b> {reason}</div>}

          <Card>
            <h3>Required documents</h3>
            <p className="sm">Accepted formats: PDF, JPG or PNG · up to 5 MB per file.</p>
            <div style={{ marginTop: 14 }}>
              {docs.map(d => (
                <div key={d.id} style={{ marginBottom: 12 }}>
                  <label className="label">{d.label} <span className="muted">— {d.hint}</span></label>
                  {files[d.id] ? (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="file-row">
                      <span className="ic" style={{ width: 30, height: 30, fontSize: 14 }}>📄</span>
                      <div style={{ flex: 1 }}>
                        <b className="sm">{files[d.id].name}</b>
                        <div className="xs muted">{files[d.id].size} KB · uploaded</div>
                      </div>
                      <button className="btn ghost sm" onClick={() => setFiles(v => { const c = { ...v }; delete c[d.id]; return c })}>Replace</button>
                    </motion.div>
                  ) : (
                    <label className="drop" style={{ display: 'block' }}>
                      <input type="file" hidden onChange={e => pick(d.id, e)} />
                      <b className="sm">Click to upload {d.label.toLowerCase()}</b>
                      <div className="xs muted">PDF, JPG or PNG — max 5 MB</div>
                    </label>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
              <button className="btn" disabled={!done || busy || status === 'pending'} onClick={submit}>
                {busy ? 'Submitting…' : status === 'pending' ? 'Submitted for review' : 'Submit for review'}
              </button>
              {status === 'draft' && !done && <span className="xs muted" style={{ alignSelf: 'center' }}>Upload all three documents to submit.</span>}
            </div>
          </Card>

          <AnimatePresence>
            {status !== 'draft' && (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 18 }}>
                {status === 'pending' && (
                  <Card className="tint-warn">
                    <h4>Status: pending review</h4>
                    <p className="sm">Documents received. Our team is checking them — you will be notified on email/WhatsApp. This screen is a demo, so you can preview both outcomes below.</p>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <button className="btn teal sm" onClick={() => setStatus('approved')}>Preview: approved</button>
                      <button className="btn ghost sm" onClick={() => setStatus('rejected')}>Preview: rejected</button>
                    </div>
                  </Card>
                )}
                {status === 'approved' && (
                  <Card className="tint-teal">
                    <h4>KYC approved ✓</h4>
                    <p className="sm">You can now purchase a package and start learning. Packages must be completed in sequence.</p>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <Link to="/packages" className="btn teal">Choose your package</Link>
                      <Link to="/dashboard" className="btn ghost">Go to dashboard</Link>
                    </div>
                  </Card>
                )}
                {status === 'rejected' && (
                  <Card className="tint-crimson">
                    <h4>Action required — re-upload</h4>
                    <p className="sm">{reason}</p>
                    <ul className="list dash"><li>Re-upload the highlighted document and resubmit.</li><li>Original documents only — no screenshots.</li></ul>
                    <button className="btn sm" onClick={() => { setStatus('draft'); setFiles(v => { const c = { ...v }; delete c.reg; return c }) }}>Re-upload now</button>
                  </Card>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="xs muted" style={{ marginTop: 16 }}>
            Demo flow — live build posts to <code>/api/kyc/submit</code> and the admin portal review queue.
          </div>
        </div>
      </section>
    </>
  )
}
