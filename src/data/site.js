export const brand = {
  name: 'Medisoftskills',
  tagline: 'Certificate in Healthcare Professional Skills',
  strap: 'Flexible Learning · Practical Application · Professional Growth',
  site: 'medisoftskills.com'
}

// Fill these in to switch the floating enquiry button on. WhatsApp number must be
// country code + number, digits only (e.g. '919876543210'). While it is empty the
// button is not rendered at all.
export const contact = {
  whatsapp: '',
  whatsappMessage: 'Hi, I would like details about the Medisoftskills certificate course.',
  email: '',
  phone: ''
}

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/packages', label: 'Packages & Fees' },
  { to: '/journey', label: 'How it works' },
  { to: '/institutions', label: 'For Institutions' }
]

export const packages = [
  {
    id: 'basic', order: 1, name: 'Basic', tone: 'b1',
    hours: '16 CPD Hours',
    price: null,
    contents: ['Basic Theory', 'Basic Knowledge', 'E-Learning'],
    pathway: 'e-learning',
    summary: 'Core theory and knowledge foundation — fully online, self-paced.'
  },
  {
    id: 'basic-plus', order: 2, name: 'Basic Plus', tone: 'b2',
    hours: '8 CPD Hours',
    price: null,
    contents: ['Basic Practice Lab', 'Supplementary E-Learning'],
    pathway: 'lab',
    summary: 'Hands-on virtual skills lab that sits on top of the Basic package.'
  },
  {
    id: 'advanced', order: 3, name: 'Advanced', tone: 'b3',
    hours: '16 CPD Hours',
    price: null,
    contents: ['Advanced Theory', 'Advanced Knowledge', 'E-Learning'],
    pathway: 'e-learning',
    summary: 'Advanced theory and clinical knowledge, with course test.'
  },
  {
    id: 'advanced-plus', order: 4, name: 'Advanced Plus', tone: 'b4',
    hours: '8 CPD Hours',
    price: null,
    contents: ['Advanced Practice Lab', 'Supplementary E-Learning'],
    pathway: 'lab',
    summary: 'Advanced virtual practice with feedback and grading.'
  },
  {
    id: 'certification-plus', order: 5, name: 'Certification Plus', tone: 'b5', final: true,
    hours: '8 CPD Hours',
    price: null,
    contents: ['Self-Assessment', 'Reflective Assignment', 'Certification'],
    pathway: 'certification',
    summary: 'Assessed route to certification — the qualifying package for MAcadMEd (AoME, UK).'
  }
]

export const journeyStages = [
  { n: 1, stage: 'Discover', agent: 'Lead Agent', screens: [
    { t: 'Landing page', d: 'Course overview, outcomes, CTA “Join the Course”' },
    { t: 'Packages & fees', d: 'Five packages, CPD hours, FAQs' },
    { t: 'Enquiry', d: 'Web form or WhatsApp — lead captured' }
  ]},
  { n: 2, stage: 'Join & activate', agent: 'Onboarding Agent', screens: [
    { t: 'Create account', d: 'Name, email / phone, password' },
    { t: 'OTP screen', d: 'Code verification with resend' },
    { t: 'Account active', d: 'Limited dashboard unlocked' }
  ]},
  { n: 3, stage: 'KYC', agent: 'KYC Agent', screens: [
    { t: 'Upload KYC', d: 'ID, qualification, registration documents' },
    { t: 'Review queue', d: 'Checked by the admin team', tone: 'dashed' },
    { t: 'Approved / Rejected', d: 'Re-upload if rejected', tone: 'warn' }
  ]},
  { n: 4, stage: 'Package & pay', agent: 'Counsellor + Payment Agent', screens: [
    { t: 'Choose package', d: 'Basic → Certification Plus, sequential' },
    { t: 'Checkout', d: 'Card, coupon or discount voucher' },
    { t: 'Receipt + access', d: 'Invoice issued, 60-day clock starts', tone: 'teal' }
  ]},
  { n: 5, stage: 'Learn', agent: 'Support + Progress Agent', screens: [
    { t: 'My courses', d: 'Dashboard with progress and countdown' },
    { t: 'Modules & units', d: 'E-learning theory and knowledge content' },
    { t: 'Course test', d: 'Online assessment', tone: 'warn' },
    { t: 'Virtual skills lab', d: 'Practice with feedback and grading', tone: 'warn' },
    { t: 'Feedback form', d: 'Course feedback submitted' }
  ]},
  { n: 6, stage: 'Certify', agent: 'Assessment + Certification Agent', screens: [
    { t: 'Self-assessment', d: 'All sections completed online' },
    { t: 'Reflective assignment', d: 'Submitted online' },
    { t: 'Course Director marking', d: 'Feedback provided (automated)', tone: 'dashed' },
    { t: 'Certificate', d: 'Download on pass — or resubmit within 30 days', tone: 'crimson' }
  ]},
  { n: 7, stage: 'After certification', agent: 'CPD Agent', screens: [
    { t: 'Certificate record', d: 'Verification ID / QR, CPD hours logged' },
    { t: 'MAcadMEd route', d: 'AoME (UK) application within one year' },
    { t: 'Next package', d: 'Sequential upgrade or re-enrolment' }
  ]}
]

export const pathways = [
  { tone: 'tint-brand', title: 'Basic & Advanced', sub: 'E-Learning pathway', items: [
    'Complete all e-learning modules and units', 'Take the course test', 'Complete the course feedback form'
  ]},
  { tone: 'tint-teal', title: 'Basic Plus & Advanced Plus', sub: 'Practice Lab pathway', items: [
    'Complete the supplementary e-learning modules', 'Practise in virtual skills labs with feedback and grading', 'Complete the course feedback form'
  ]},
  { tone: 'tint-crimson', title: 'Certification Plus', sub: 'Assessment pathway', items: [
    'Complete and submit the reflective assignment online', 'Marked by the Course Director — feedback provided (automated)',
    'Download the certificate, or resubmit the assignment within 30 days'
  ]}
]

export const rules = [
  'Each package content is accessible for 60 days from the date of enrolment activation.',
  'Packages can be purchased at any time but must be completed sequentially — Basic → Basic Plus → Advanced → Advanced Plus → Certification Plus.',
  'MAcadMEd (Academy of Medical Educators, UK) requires the Certification Plus package with all requirements completed within one year.',
  'Institution option: medical schools and training institutions get multi-learner accounts, bulk payments and institution voucher codes.'
]

export const faqs = [
  { q: 'Can I buy all five packages together?', a: 'You can purchase at any time, but the packages must be completed in sequence. Access to the next package opens once the previous one is completed.' },
  { q: 'How long do I have to finish a package?', a: 'Each package content is accessible for 60 days from the date of enrolment activation.' },
  { q: 'What is required for MAcadMEd?', a: 'The Certification Plus package plus all its requirements completed within one year — that is the route through the Academy of Medical Educators (AoME), UK.' },
  { q: 'What if my assignment is not accepted?', a: 'The assignment can be resubmitted within 30 days. Feedback from the Course Director is provided through the portal.' },
  { q: 'Do you support medical schools?', a: 'Yes. Institutions get multi-learner accounts, bulk payment options, institution-specific voucher codes and progress tracking.' }
]
