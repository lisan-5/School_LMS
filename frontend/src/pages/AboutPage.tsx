const AboutPage = () => (
  <div className="page">
    <div className="hero">
      <div>
        <p className="eyebrow">About</p>
        <h1>Why NovaLMS exists</h1>
        <p className="muted">
          We built NovaLMS to give instructors and learners a streamlined path from course creation to
          completion with zero fluff.
        </p>
      </div>
      <div className="hero-card">
        <p className="muted small">Built for teams</p>
        <h3>Fast to launch</h3>
        <p className="muted small">API + React front-end ready out of the box.</p>
      </div>
    </div>

    <div className="grid">
      {[
        { title: 'Foundation', desc: 'Laravel API with Sanctum and role-aware permissions.' },
        { title: 'Speed', desc: 'React + Vite + React Query for snappy experiences.' },
        { title: 'Extensibility', desc: 'Sections, lessons, progress, enrollments — ready to extend.' },
        { title: 'Design', desc: 'A focused UI with gradients, chips, and helpful states.' },
      ].map((item) => (
        <div key={item.title} className="card">
          <div className="card-body">
            <h3>{item.title}</h3>
            <p className="muted">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default AboutPage

