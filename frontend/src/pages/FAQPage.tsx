const faqs = [
  {
    q: 'Can I add my own courses?',
    a: 'Yes. Instructors/admins can create courses, sections, and lessons once authenticated.',
  },
  {
    q: 'How is progress tracked?',
    a: 'Lesson completion updates enrollments, rolling up to a course-level percentage.',
  },
  {
    q: 'Do you support payments?',
    a: 'The starter is free; integrate Stripe/PayPal in the API layer for paid courses.',
  },
  {
    q: 'Is there an API?',
    a: 'Yes, all functionality is exposed via the Laravel API with Sanctum auth.',
  },
]

const FAQPage = () => (
  <div className="page">
    <div className="hero">
      <div>
        <p className="eyebrow">FAQ</p>
        <h1>Answers to common questions</h1>
        <p className="muted">Everything you need to know about getting started.</p>
      </div>
    </div>

    <div className="panel">
      {faqs.map((item, idx) => (
        <div key={item.q} className="section">
          <h4>
            {idx + 1}. {item.q}
          </h4>
          <p className="muted">{item.a}</p>
        </div>
      ))}
    </div>
  </div>
)

export default FAQPage

