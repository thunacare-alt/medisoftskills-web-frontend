import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageHero, Card, Stepper, Badge } from '../components/UI.jsx'
import { packages } from '../data/site.js'

export default function Checkout() {
  const [sp] = useSearchParams()
  const initial = packages.find(p => p.id === sp.get('p')) || packages[0]
  const [pkg, setPkg] = useState(initial)
  const [coupon, setCoupon] = useState('')
  const [applied, setApplied] = useState(null)
  const [method, setMethod] = useState('card')
  const [stage, setStage] = useState(0) // 0 form, 1 processing, 2 receipt
  const [err, setErr] = useState('')

  function applyCoupon() {
    const c = coupon.trim().toUpperCase()
    setErr('')
    if (!c) return
    if (c === 'CPD10') { setApplied({ code: c, off: 10 }); return }
    if (c === 'INST500') { setApplied({ code: c, off: 500 }); return }
    setErr('That coupon/voucher code was not recognised. Try CPD10 or INST500.')
  }

  const base = pkg.price || 0
  const off = applied ? Math.min(applied.off, base) : 0
  const taxable = Math.max(base - off, 0)
  const gst = Math.round(taxable * 0.18)
  const total = taxable + gst

  function pay() {
    if (!applied && coupon.trim()) return setErr('Apply or clear the coupon code before paying.')
    setErr(''); setStage(1)
    setTimeout(() => setStage(2), 1200)
  }

  return (
    <>
      <PageHero eyebrow="Checkout" title="Choose your package and pay"
        lead="Pay by card, or use a coupon or institution discount voucher. Access and the 60-day clock start as soon as payment succeeds." />
      <section className="section tight">
        <div className="container">
          <Stepper steps={['Account & KYC', 'Choose package', 'Payment', 'Access unlocked']} current={3} />
          <div className="grid g2" style={{ alignItems: 'start' }}>
            <Card>
              <h3>1. Select package</h3>
              <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
                {packages.map(p => (
                  <label key={p.id} className="file-row" style={{ cursor: 'pointer', borderColor: pkg.id === p.id ? 'var(--brand)' : 'var(--line)', borderWidth: pkg.id === p.id ? 2 : 1 }}>
                    <input type="radio" name="pkg" checked={pkg.id === p.id} onChange={() => { setPkg(p); setStage(0) }} />
                    <div style={{ flex: 1 }}>
                      <b className="sm">Package {p.order} · {p.name}</b>
                      <div className="xs muted">{p.contents.join(' + ')} · {p.hours}</div>
                    </div>
                    <Badge tone={p.tone}>{p.price ? '₹' + p.price.toLocaleString('en-IN') : 'On request'}</Badge>
                  </label>
                ))}
              </div>

              <h3 style={{ marginTop: 22 }}>2. Coupon or voucher</h3>
              <div style={{ display: 'flex', gap: 10 }}>
                <input className="input" placeholder="Enter code (try CPD10 or INST500)" value={coupon} onChange={e => setCoupon(e.target.value)} />
                <button className="btn ghost" type="button" onClick={applyCoupon}>Apply</button>
              </div>
              {applied && <div className="note ok sm" style={{ marginTop: 10 }}>Code <b>{applied.code}</b> applied — ₹{applied.off} off.</div>}

              <h3 style={{ marginTop: 22 }}>3. Payment method</h3>
              <div style={{ display: 'grid', gap: 10 }}>
                {[['card', 'Credit / debit card'], ['netbanking', 'Net banking'], ['institution', 'Institution invoice (bulk)']].map(([id, label]) => (
                  <label key={id} className="file-row" style={{ cursor: 'pointer', borderColor: method === id ? 'var(--brand)' : 'var(--line)', borderWidth: method === id ? 2 : 1 }}>
                    <input type="radio" name="pm" checked={method === id} onChange={() => setMethod(id)} />
                    <span className="sm">{label}</span>
                  </label>
                ))}
              </div>
              <div className="hint">Payment gateway integration is wired at the API layer — this is the front-end flow.</div>
            </Card>

            <Card className="tint-brand">
              <h3>Order summary</h3>
              <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
                <Row k={'Package'} v={pkg.name} />
                <Row k={'CPD hours'} v={pkg.hours} />
                <Row k={'Contents'} v={pkg.contents.join(', ')} />
                <Row k={'Fee'} v={base ? '₹' + base.toLocaleString('en-IN') : 'On request'} />
                {applied && <Row k={'Discount'} v={'− ₹' + off} />}
                <Row k={'GST (18%)'} v={base ? '₹' + gst.toLocaleString('en-IN') : '—'} />
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
                  <b>Payable</b><b>{base ? '₹' + total.toLocaleString('en-IN') : 'On request'}</b>
                </div>
              </div>
              {err && <div className="note bad sm" style={{ marginTop: 12 }}>{err}</div>}
              <>
                {stage === 0 && <button key="pay" className="btn block anim-in" style={{ marginTop: 16 }} onClick={pay}>Pay now</button>}
                {stage === 1 && <div key="proc" className="note info sm anim-in" style={{ marginTop: 16 }}>Processing payment… connecting to gateway.</div>}
                {stage === 2 && (
                  <div key="done" style={{ marginTop: 16 }}>
                    <div className="note ok sm"><b>Payment successful ✓</b><br />Receipt issued. Course access unlocked — your 60-day access window starts today.</div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
                      <Link to="/dashboard" className="btn teal sm">Go to my courses</Link>
                      <button className="btn ghost sm">Download receipt</button>
                    </div>
                  </div>
                )}
              </>
              <ul className="list dash" style={{ marginTop: 16 }}>
                <li>Access: 60 days from activation.</li>
                <li>Next package unlocks on completion.</li>
                <li>Certification Plus is the MAcadMEd qualifying package.</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

function Row({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, fontSize: 14 }}>
      <span className="muted">{k}</span><span style={{ textAlign: 'right', fontWeight: 500 }}>{v}</span>
    </div>
  )
}
