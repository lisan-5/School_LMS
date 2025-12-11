const ContactPage = () => (
  <div className="page">
    <div className="hero">
      <div>
        <p className="eyebrow">Contact</p>
        <h1>We’d love to hear from you</h1>
        <p className="muted">Questions about courses or onboarding? Send us a note.</p>
      </div>
      <div className="hero-card">
        <p className="muted small">Support</p>
        <h3>support@novalms.dev</h3>
        <p className="muted small">We typically respond within one business day.</p>
      </div>
    </div>

    <form className="form">
      <label>
        Name
        <input placeholder="Your name" required />
      </label>
      <label>
        Email
        <input placeholder="you@example.com" type="email" required />
      </label>
      <label>
        Message
        <textarea rows={4} placeholder="How can we help?" required />
      </label>
      <button className="primary" type="submit" disabled>
        Submit (demo)
      </button>
      <p className="muted small">Demo form — wire to backend when ready.</p>
    </form>
  </div>
)

export default ContactPage

