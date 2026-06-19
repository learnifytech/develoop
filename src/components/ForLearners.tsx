const FEATURES = [
  {
    title: 'Expert Algerian Instructors',
    desc:  'Learn from professionals who understand your context.',
  },
  {
    title: 'Learn at Your Own Pace',
    desc:  'Study when you want, as much as you want.',
  },
  {
    title: 'Verified Certificate',
    desc:  'Get a Develoopini certificate when you complete each course.',
  },
  {
    title: 'Affordable Pricing',
    desc:  'Start learning from as low as 2000 DA per course.',
  },
  {
    title: 'Direct Instructor Access',
    desc:  'Ask questions and get real answers anytime.',
  },
];

export default function ForLearners() {
  return (
    <section id="learners">
      <div className="wrap">
        <div className="two-col">
          {/* Text side */}
          <div>
            <div className="tag">🎓 For Learners</div>
            <h2 className="sec-title">
              Master skills that <span className="accent">matter</span>
            </h2>
            <p className="sec-desc">
              Stop watching random videos. Start learning structured courses from
              real Algerian experts.
            </p>
            <ul className="feat-list">
              {FEATURES.map((f, i) => (
                <li key={i}>
                  <div className="fcheck">✓</div>
                  <div className="ftxt">
                    <strong>{f.title}</strong>
                    <span>{f.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeSJl2ibyn5rt079TjeF23-bgQoYKKX6WsAuaSF650Q5bacdA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
            >
              <span>Start Learning Now →</span>
            </a>
          </div>

          {/* Visual side */}
          <div className="vis-box">
            <span className="vis-ico">📚</span>
            <div className="vis-title">
              Ready to <span className="accent">grow?</span>
            </div>
            <div className="vis-desc">
              Join Algerians who are already learning real skills and building real
              careers with Develoopini.
            </div>
            <div className="vis-tag">✦ New courses every week</div>
          </div>
        </div>
      </div>
    </section>
  );
}
