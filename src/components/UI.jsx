import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0, y = 18, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
    >{children}</motion.div>
  )
}

export function Chip({ children }) {
  return <span className="chip"><span className="dot" />{children}</span>
}

export function Badge({ tone = 'b1', children }) {
  return <span className={'badge ' + tone}>{children}</span>
}

export function Card({ children, className = '', hover = false, as = 'div' }) {
  const Tag = as
  return <Tag className={'card ' + (hover ? 'hover ' : '') + className}>{children}</Tag>
}

export function SectionHead({ eyebrow, title, lead, center = false }) {
  return (
    <Reveal className={center ? 'center' : ''}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      {lead && <p className="lead" style={{ marginLeft: center ? 'auto' : 0, marginRight: center ? 'auto' : 0 }}>{lead}</p>}
    </Reveal>
  )
}

export function Stepper({ steps, current }) {
  return (
    <div className="stepper">
      {steps.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className={'dotstep ' + (i === current ? 'on' : '') + (i < current ? ' done' : '')}>
            <span className="n">{i < current ? '✓' : i + 1}</span><span>{s}</span>
          </div>
          {i < steps.length - 1 && <span className="sep" />}
        </div>
      ))}
    </div>
  )
}

export function PageHero({ eyebrow, title, lead, children }) {
  return (
    <section className="hero">
      <div className="container">
        <div style={{ padding: '56px 0 26px', maxWidth: 860 }}>
          <Reveal>
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            <h1>{title}</h1>
            {lead && <p className="lead">{lead}</p>}
          </Reveal>
          {children && <Reveal delay={0.08}>{children}</Reveal>}
        </div>
      </div>
    </section>
  )
}

export function Price({ pkg }) {
  if (!pkg.price) return <div><span className="kpi">Fee on request</span><div className="xs muted">per learner · GST extra</div></div>
  return <div><span className="kpi">₹{pkg.price.toLocaleString('en-IN')}</span><div className="xs muted">per learner · GST extra</div></div>
}
