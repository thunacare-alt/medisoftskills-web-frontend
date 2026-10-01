import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PageHero, Card, Stepper, Reveal } from '../components/UI.jsx'

const steps = ['Create account', 'Verify OTP', 'Activated']

export default function Join() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', method: 'email' })
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  function submitAccount(e) {
    e.preventDefault()
    setErr('')
    if (!form.name.trim()) return setErr('Please enter your full name.')
    if (form.password.length < 8) return setErr('Password must be at least 8 characters.')
    if (form.method === 'email' && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(form.email)) return setErr('Enter a valid email address.')
    if (form.method === 'phone' && form.phone.replace(/\D/g, '').length < 10) return setErr('Enter a valid 10-digit mobile number.')
    setStep(1)
  }

  function setDigit(i, v) {
    const d = v.replace(/\D/g, '').slice(-1)
    setOtp(o => { const c = [...o]; c[i] = d; return c })
    if (d && i < 5) document.getElementById('otp-' + (i + 1))?.focus()
  }

  function verify(e) {
    e.preventDefault()
    setErr('')
    if (otp.join('').length !== 6) return setErr('Enter the 6-digit code.')
    setStep(2)
  }

  const dest = form.method === 'email' ? form.email : '+' + form.phone.replace(/\D/g, '')

  return (
    <>
      <PageHero eyebrow="Join the course" title="Create your account and activate it"
        lead="Three quick steps — account, OTP verification, activation. KYC documents come next." />
      <section className="section tight">
        <div className="container" style={{ maxWidth: 720 }}>
          <Stepper steps={steps} current={step} />
          {err && <div className="note bad sm" style={{ marginBottom: 14 }}>{err}</div>}
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                <Card>
                  <h3>Create your account</h3>
                  <p className="sm">Register with your email or phone number. This is the number/ID you will use for OTP and course access.</p>
                  <form onSubmit={submitAccount}>
                    <div className="field">
                      <label className="label">Full name</label>
                      <input className="input" value={form.name} onChange={set('name')} placeholder="Dr. A. Sharma" />
                    </div>
                    <div className="field">
                      <label className="label">Register using</label>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <label className={'chip'} style={{ cursor: 'pointer', borderColor: form.method === 'email' ? 'var(--brand)' : 'var(--line)' }}>
                          <input type="radio" name="m" checked={form.method === 'email'} onChange={() => setForm(f => ({ ...f, method: 'email' }))} /> Email
                        </label>
                        <label className={'chip'} style={{ cursor: 'pointer', borderColor: form.method === 'phone' ? 'var(--brand)' : 'var(--line)' }}>
                          <input type="radio" name="m" checked={form.method === 'phone'} onChange={() => setForm(f => ({ ...f, method: 'phone' }))} /> Phone number
                        </label>
                      </div>
                    </div>
                    <div className="two-col">
                      <div className="field">
                        <label className="label">Email address</label>
                        <input className="input" type="email" value={form.email} onChange={set('email')} placeholder="you@hospital.com" />
                      </div>
                      <div className="field">
                        <label className="label">Mobile number</label>
                        <input className="input" value={form.phone} onChange={set('phone')} placeholder="98765 43210" />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <input className="input" type="password" value={form.password} onChange={set('password')} placeholder="Minimum 8 characters" />
                      <div className="hint">Use at least 8 characters with a number and a capital letter.</div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <button className="btn" type="submit">Create account</button>
                      <span className="xs muted">Already registered? <Link to="/dashboard">Learner login</Link></span>
                    </div>
                  </form>
                </Card>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                <Card>
                  <h3>Activate your account</h3>
                  <p className="sm">We sent a 6-digit OTP to <b>{dest}</b>. Enter it below to activate your account.</p>
                  <form onSubmit={verify}>
                    <div className="otp-boxes" style={{ margin: '18px 0' }}>
                      {otp.map((d, i) => (
                        <input key={i} id={'otp-' + i} className="input" inputMode="numeric" value={d}
                          onChange={e => setDigit(i, e.target.value)} onKeyDown={e => { if (e.key === 'Backspace' && !otp[i] && i > 0) document.getElementById('otp-' + (i - 1))?.focus() }} />
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <button className="btn" type="submit">Verify &amp; activate</button>
                      <button type="button" className="btn ghost sm" onClick={() => setErr('A new OTP has been sent.')}>Resend OTP</button>
                    </div>
                  </form>
                  <div className="hint" style={{ marginTop: 12 }}>Didn’t get it? Check spam, or resend — the code stays valid for 10 minutes.</div>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                <Card className="tint-teal">
                  <h3>Account activated ✓</h3>
                  <p className="sm">Your account is active. Next: submit your KYC documents — ID, qualification and registration details.</p>
                  <div className="grid g2" style={{ marginTop: 8 }}>
                    <Link to="/kyc" className="btn teal">Continue to KYC</Link>
                    <Link to="/packages" className="btn ghost">View packages first</Link>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
          <Reveal delay={0.1}>
            <div className="note info sm" style={{ marginTop: 20 }}>
              Your account stays in <b>pending KYC</b> state until documents are approved. You can browse packages meanwhile, but course access starts after approval.
            </div>
          </Reveal>
          <div style={{ marginTop: 18 }} className="xs muted">
            Demo flow — in the live build these buttons call <code>/api/auth/signup</code>, <code>/api/auth/otp</code> and create a learner record.
          </div>
        </div>
      </section>
    </>
  )
}
