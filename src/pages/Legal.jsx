import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PageHero } from '../components/UI.jsx'
import { brand } from '../data/site.js'

/* Three legal documents, one lazy chunk. The route decides which one renders,
   so /terms, /privacy and /refunds cost a single download between them. */

const CONTACT = 'admin@medisoftskills.com'

/* Items only the company can confirm. Rendered highlighted so they can never
   ship unnoticed. Replace the text, drop the <Ph /> wrapper. */
function Ph({ children }) {
  return <span className="ph" title="To be confirmed before launch">{children}</span>
}

const DOCS = {
  terms: {
    eyebrow: 'Legal',
    title: 'Terms & Conditions',
    lead: 'These terms govern your use of the Medisoftskills website, your learner account, and the Certificate in Healthcare Professional Skills.',
    summary: [
      'You must give us accurate details and complete identity verification before starting.',
      'Each package includes 60 days of access from the day your payment succeeds.',
      'Packages must be taken in the approved sequence, and certificates are issued in the verified name.',
      'One learner per account. Course material may not be copied or shared.'
    ],
    sections: [
      { h: 'Who we are and what these terms cover', p: [
        'This website and the courses offered on it are operated by <Ph>[registered entity name]</Ph>, registered at <Ph>[registered office address]</Ph> ("we", "us", "our").',
        'By creating an account, or by paying for a package, you agree to these terms. If you do not accept them, please do not use the service. Where a separate written agreement exists — for example an institutional bulk enrolment — that agreement takes precedence over these terms for the seats it covers.'
      ] },
      { h: 'Eligibility', p: [
        'The course is intended for healthcare professionals, and for students and trainees in healthcare disciplines. By registering you confirm that the information you give us is true, and that you are at least 18 years old.',
        'You are responsible for making sure the qualification and registration details you give us are current. Certificates cannot be issued in a name or registration number that our verification records do not support.'
      ] },
      { h: 'Your account', p: ['Your account is personal to you and gives access for one learner only. You are responsible for keeping your password confidential and for activity that happens under your account. Tell us promptly if you believe someone else has access to it.'],
        ul: ['Do not share your login, or let another person complete the course under your account.', 'Do not create duplicate accounts to obtain additional access or repeat discounts.', 'Tell us immediately if your registration with a professional council lapses or is suspended.'] },
      { h: 'The course, packages and access period', p: [
        'The programme is made up of sequential packages. Each package combines online learning with self-assessment and reflective work, and some packages include practical or assigned components.',
        'Access to a package runs for 60 days from the day payment for that package succeeds. You must complete the package within that window; where a later package depends on an earlier one, the earlier package must be completed first.',
        'We may update module content to keep it current and accurate. We will not reduce the CPD hours or the learning outcomes you have paid for.'
      ] },
      { h: 'Identity and qualification verification', p: [
        'Before you begin learning you must complete verification. We ask for three documents: government photo identification, your qualification certificate, and your professional council registration.',
        'We use these documents only to confirm who you are and that you are eligible for the course, and to issue your certificate correctly. Documents are held under restricted access — see our Privacy Policy for how they are stored, who can see them, and how long we keep them.',
        'If a document is unreadable, expired or does not match your account details, we will tell you what needs to change and you may resubmit. If we find that a document has been altered or falsified, we may suspend the account, cancel the enrolment without refund, and withdraw any certificate already issued.'
      ] },
      { h: 'Fees, taxes and payment', p: [
        'The fee for each package is shown at checkout before you pay, along with any applicable tax. Where tax applies it is added to the amount shown and itemised on your receipt.',
        'We accept payment by card, and by coupon or institutional voucher code. Access and the 60-day clock begin when payment succeeds. Coupon and voucher codes are single-use, are not transferable once redeemed, and may not be combined unless we say so in writing.',
        'Refunds and cancellations are governed by our Refund & Cancellation Policy.'
      ] },
      { h: 'Assessment, completion and certification', p: [
        'To complete a package you must satisfy its assessment requirements: complete the learning units, submit the required self-assessment and reflective work, and pass any assigned assessment.',
        'On completing the final package you receive the Certificate in Healthcare Professional Skills, issued in the name and registration details verified at the identity check stage. CPD hours are recorded on the certificate.',
        'The certificate evidences completed learning. It is not a licence to practise, and it does not replace any registration, licensure or training requirement of a regulator, employer or institution. Third-party bodies — including the awarding and accrediting organisations named on this site — set and apply their own rules, and we cannot guarantee that they will accept any particular completion pathway.'
      ] },
      { h: 'Acceptable use and intellectual property', p: [
        'All course material, video, text, assessments, templates and the certificate design are our property or licensed to us, and are protected by copyright.',
        'You may use the material for your own learning. You may not copy, record, distribute, resell, publish or use it to train others, and you may not use automated tools to extract it. Access may be suspended where we reasonably believe material is being shared or reproduced.'
      ] },
      { h: 'Availability', p: [
        'We aim to keep the service available, but we do not promise uninterrupted access. We may suspend it for maintenance, updates or reasons outside our control.',
        'Where a fault prevents you from accessing a package for a sustained period, we will extend your access or refund the affected package — see the Refund & Cancellation Policy.'
      ] },
      { h: 'Our responsibility to you', p: [
        'We provide the service with reasonable skill and care, and to the standard described on this site. We are not responsible for clinical decisions made by you or anyone else, for the outcome of any examination or application you make to a third party, or for indirect or consequential loss.',
        'Where we are liable, our liability for a package is limited to the fee you paid for that package, except where the law does not allow such a limit.'
      ] },
      { h: 'Changes to these terms, governing law and contact', p: [
        'We may update these terms to reflect changes in the service or the law. The version in force is the one published when you paid for your package; where changes materially affect you, we will give notice on this page or by email.',
        'These terms are governed by the laws of <Ph>[governing law and courts]</Ph>. Questions about these terms: ' + CONTACT + '.'
      ] }
    ]
  },

  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    lead: 'What we collect when you join and verify, why we need it, who can see it, and how to have it removed.',
    summary: [
      'We collect your account details, your professional details, and three verification documents.',
      'Verification documents are used only to confirm your identity and eligibility, and to issue your certificate correctly.',
      'We never sell your data and we do not use your documents for marketing.',
      'You can ask to see, correct or delete what we hold.'
    ],
    sections: [
      { h: 'Who is responsible for your data', p: [
        'The data controller is <Ph>[registered entity name]</Ph>, <Ph>[registered office address]</Ph>. Questions, requests and complaints go to ' + CONTACT + '.'
      ] },
      { h: 'What we collect', p: ['We collect only what the course and the certificate require:'],
        ul: [
          'Account details — your name, email address, phone number and password (stored in hashed form, never in plain text).',
          'Professional details — your qualification and your professional council registration.',
          'Verification documents — government photo identification, your qualification certificate, and your registration record. Accepted as PDF, JPG or PNG, up to 5 MB per file.',
          'Payment and transaction records — the amount, date, method, coupon or voucher applied, and the transaction reference. Card numbers are handled by our payment processor and are not stored on our systems.',
          'Learning records — package progress, assessment submissions, reflective work, completion dates and CPD hours recorded.',
          'Technical data — device type, browser, IP address and access logs, used for security and to keep the service working.'
        ] },
      { h: 'Why we need it', p: ['We use your data for these purposes, and on these bases:'],
        ul: [
          'To create your account and give you the access you paid for — necessary to perform our contract with you.',
          'To verify your identity and eligibility, and to issue your certificate in the correct name — necessary to perform the contract, and to keep the integrity of the certification we award.',
          'To keep financial and enrolment records, and to meet tax requirements — a legal obligation.',
          'To prevent fraud, misuse and account sharing, and to keep the service secure — our legitimate interest.',
          'To send you service messages about your enrolment, verification and certificate — necessary to perform the contract.',
          'To send you course updates or related opportunities — only with your consent, which you can withdraw at any time.'
        ] },
      { h: 'Your verification documents in particular', p: [
        'These documents are the most sensitive thing we hold, so they are handled differently from the rest of your record. Access is restricted to the small review team that decides verification outcomes, and every decision is logged against your account.',
        'They are used for one purpose only: confirming that you are who you say you are, that you hold the qualification you claim, and that your registration supports the certificate we issue. They are not used for marketing or profiling, they are not shown to other learners, and they are not shared with faculty, assessors or sponsors.',
        'If your verification is rejected, you are told why and may submit a replacement. We keep the record of the decision — including the reason — so that a later review can be answered.'
      ] },
      { h: 'Who we share it with', p: ['We share data only where it is needed:'],
        ul: [
          'Service providers who run parts of the platform for us — hosting, payment processing, email delivery and file storage — under contract and only on our instructions.',
          'Awarding and accrediting bodies, where a certificate, transcript or CPD record must be confirmed in your name.',
          'A professional council or regulator, where we are lawfully required to confirm a registration or where you ask us to.',
          'Authorities, where the law requires it.',
          'A buyer or successor, if the business is ever transferred — you would be told before your data moved.'
        ],
        p2: ['We do not sell your data, and we do not share it for advertising.'] },
      { h: 'How long we keep it', p: [
        'Account and learning records are kept while your account is active and afterwards for as long as we must keep financial and certification records.',
        'Verification documents are kept only as long as needed to support the certificate awarded, to answer a verification query, or to meet a legal or professional record-keeping requirement. When that period ends, they are deleted.',
        'Coupon and voucher redemption records are kept to prevent reuse.',
        'Where you ask us to delete your account, we delete what we can and tell you what we must keep, and why.'
      ] },
      { h: 'How we protect it', p: [
        'Data is encrypted in transit, access to learner records is role-restricted and logged, and verification files are held separately from ordinary course data. Only the review team can open them.',
        'No system is perfect. If a breach ever affected your data, we would tell you and the relevant authority without undue delay, as required.'
      ] },
      { h: 'Your rights', p: ['You can ask us to:'],
        ul: [
          'Show you the data we hold about you, and give you a copy.',
          'Correct anything inaccurate — including your name or registration details, which must match your verified documents for the certificate to be valid.',
          'Delete what we are not required to keep.',
          'Restrict or object to a particular use, and withdraw consent you previously gave.',
          'Move your data to another provider where that is technically possible.'
        ],
        p2: ['Write to ' + CONTACT + ' from your registered email address. We aim to reply within 30 days. If you are not satisfied with our response, you may complain to your local data protection authority.'] },
      { h: 'Cookies', p: [
        'We use the cookies and local storage needed to keep you signed in and to remember your progress. We do not use advertising or cross-site tracking cookies on this site.'
      ] },
      { h: 'Where your data is held and changes to this policy', p: [
        'Your data may be processed on servers outside your country of residence by the providers listed above, under contractual protections. Our records are held and processed on the basis of the laws of <Ph>[governing law and courts]</Ph>.',
        'If this policy changes in a way that affects you, we will update the date at the top of this page and, where the change is significant, tell you by email.'
      ] }
    ]
  },

  refunds: {
    eyebrow: 'Legal',
    title: 'Refund & Cancellation Policy',
    lead: 'When you can cancel and get your money back, and when you cannot — stated plainly, with the timelines we work to.',
    summary: [
      'Cancel within 7 days of payment, before you start learning, and you get a full refund.',
      'No refund once a package has been completed or a certificate has been issued.',
      'If we cancel, or a fault blocks your access, you are refunded in full.',
      'Institutional bulk enrolments follow the signed agreement, which takes precedence.'
    ],
    sections: [
      { h: 'What this policy covers', p: [
        'This policy applies to packages bought directly from us by card, coupon or voucher code. Institutional bulk enrolments are covered by the written agreement signed with the institution, which takes precedence over this policy.'
      ] },
      { h: 'Before you pay', p: [
        'The fee, the inclusions and the access period for the package appear at checkout before payment, together with any applicable tax. Please read them and make sure you have chosen the right package before you pay — packages must be taken in the approved sequence, so the right starting point matters.'
      ] },
      { h: 'Cooling-off: cancel within 7 days of payment', p: [
        'You may cancel a package and receive a full refund if you ask us within 7 days of the payment date, provided you have not started the learning content of that package and no certificate has been issued.',
        'Request it by email from your registered address, quoting your order reference. To keep the 7-day window fair to everyone, we treat the learning content as started once you open the first unit of the package you are cancelling.'
      ] },
      { h: 'When we refund in full, whatever the date', p: [
        'You are entitled to a full refund of the affected package where:'
      ],
        ul: [
          'You were charged twice for the same package, or charged in error.',
          'Payment succeeded but access was not provided, and we could not fix it.',
          'A technical fault on our side prevented you from accessing a package for a sustained period, and an extension of your access was not acceptable to you.',
          'We withdraw or discontinue a package before you have been able to complete it.',
          'We cancel or suspend your enrolment for a reason that is not your fault.'
        ] },
      { h: 'When a refund is not available', p: ['We do not refund where:'],
        ul: [
          'You have already begun the learning content of the package you are asking us to refund, and the 7-day cooling-off window has passed.',
          'A certificate has already been issued for that package or for the programme.',
          'Your 60-day access period has simply expired, or you did not complete the work in time.',
          'We have suspended or cancelled the enrolment because you shared your account, reproduced or distributed course material, or used falsified documents.',
          'The issue is with a third party — for example a professional body, employer or institution declining to recognise the certificate — for which we are not the decision maker.',
          'A coupon or voucher code is the subject of the request. Codes are not refundable, but where a code has not been redeemed we may transfer it to another learner of your institution on request.'
        ] },
      { h: 'Switching packages instead of a refund', p: [
        'If you realise you started at the wrong point, or your plans change, we would rather move you than lose you. Where a package is untouched, we will usually apply its value as credit toward the correct or next package. Any difference in fee is settled when the change is made. Credit is not refundable in cash once applied.'
      ] },
      { h: 'How to request a refund, and how long it takes', p: [],
        ul: [
          'Email ' + CONTACT + ' from your registered address, with your order reference, the package, the date of payment, and a short note on the reason.',
          'We acknowledge the request and tell you the outcome within 5 business days.',
          'Approved refunds are made to the original payment method within 10 business days of approval. Tax charged on the fee is refunded with it.',
          'Bank or card processing times after that are outside our control. Coupon-funded portions, where a voucher covered part of the fee, are returned to the institution that issued the voucher.'
        ] },
      { h: 'If we cancel', p: [
        'If we cancel a package you have paid for, we will offer you the choice of the equivalent package at a later date, credit toward another package, or a full refund. If we cancel a package you have already partly completed, we refund the fee for that package in full.'
      ] },
      { h: 'Please talk to us before raising a chargeback', p: [
        'A payment dispute can freeze your access while it is investigated, and takes longer than asking us directly. If something has gone wrong, write to ' + CONTACT + ' first and give us the 5 business days above.'
      ] },
      { h: 'Institution and bulk purchases', p: [
        'Seats bought on behalf of an institution — including seats issued as voucher codes — are governed by the signed agreement. Where that agreement sets different cancellation terms, or names a different notice period, its terms apply to those seats. Address queries to ' + CONTACT + '.'
      ] },
      { h: 'Governing law', p: [
        'This policy is governed by the laws of <Ph>[governing law and courts]</Ph>. Nothing in it removes any right you have under consumer law in your country of residence, where that law gives you stronger protection.'
      ] }
    ]
  }
}

function useScrollSpy(handler) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const heads = Array.from(el.querySelectorAll('h2[id]'))
    if (!heads.length) return
    const io = new IntersectionObserver(entries => {
      const seen = entries.filter(e => e.isIntersecting)
      if (seen.length) handler(seen[seen.length - 1].target.id)
    }, { rootMargin: '-96px 0px -62% 0px', threshold: 0 })
    heads.forEach(h => io.observe(h))
    return () => io.disconnect()
  }, [handler])
  return ref
}

export default function Legal() {
  const { pathname } = useLocation()
  const key = pathname.replace(/^\//, '') || 'terms'
  const doc = DOCS[key] || DOCS.terms
  const [active, setActive] = useState('sec-1')
  const articleRef = useScrollSpy(setActive)

  const updated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <>
      <PageHero eyebrow={doc.eyebrow} title={doc.title} lead={doc.lead}>
        <p className="xs muted" style={{ marginTop: 10 }}>Last updated {updated} · {brand.name}</p>
      </PageHero>

      <section className="section tight">
        <div className="container legal-wrap">
          <aside className="legal-side">
            <div className="legal-side-in">
              <h4>On this page</h4>
              <ol>
                {doc.sections.map((s, i) => (
                  <li key={s.h}>
                    <a href={'#' + 'sec-' + (i + 1)} className={active === 'sec-' + (i + 1) ? 'on' : ''}>{s.h}</a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <article className="legal" ref={articleRef}>
            <div className="card legal-summary">
              <h4>In short</h4>
              <ul>{doc.summary.map(t => <li key={t}>{t}</li>)}</ul>
            </div>

            {doc.sections.map((s, i) => (
              <section key={s.h} id={'sec-' + (i + 1)}>
                <h2>{s.h}</h2>
                {(s.p || []).map((t, j) => <p key={j}>{t}</p>)}
                {s.ul && <ul>{s.ul.map(t => <li key={t}>{t}</li>)}</ul>}
                {(s.p2 || []).map((t, j) => <p key={'b' + j}>{t}</p>)}
              </section>
            ))}

            <div className="note sm" style={{ marginTop: 34 }}>
              <b>Questions about this document?</b> Write to <a href={'mailto:' + CONTACT}>{CONTACT}</a> from your registered email address.
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
