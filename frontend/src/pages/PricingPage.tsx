const tiers = [
  {
    name: 'Starter',
    price: 'Free',
    desc: 'Explore the platform and publish a course.',
    features: ['1 instructor', 'Up to 3 courses', 'Email support'],
  },
  {
    name: 'Pro',
    price: '$29/mo',
    desc: 'Grow your catalog and onboard more learners.',
    features: ['3 instructors', 'Unlimited courses', 'Priority support', 'Custom branding'],
    highlight: true,
  },
  {
    name: 'Teams',
    price: 'Contact',
    desc: 'For academies and orgs needing SSO and SLAs.',
    features: ['Unlimited instructors', 'SSO/SAML', 'Analytics exports', 'Dedicated success'],
  },
]

const PricingPage = () => (
  <div className="page">
    <div className="hero">
      <div>
        <p className="eyebrow">Pricing</p>
        <h1>Pick a plan that fits</h1>
        <p className="muted">Start free, upgrade when you need more seats and features.</p>
      </div>
    </div>

    <div className="grid">
      {tiers.map((tier) => (
        <div key={tier.name} className="card" style={tier.highlight ? { borderColor: '#2563eb' } : {}}>
          <div className="card-body">
            <p className="eyebrow">{tier.name}</p>
            <h3>{tier.price}</h3>
            <p className="muted">{tier.desc}</p>
            <ul style={{ paddingLeft: 16, color: '#0f172a' }}>
              {tier.features.map((f) => (
                <li key={f} style={{ marginBottom: 6 }}>{f}</li>
              ))}
            </ul>
            <button className={tier.highlight ? 'primary' : 'ghost'}>Choose {tier.name}</button>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default PricingPage

