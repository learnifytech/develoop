const FEATURES = [
  {
    title: 'Reach Thousands of Learners',
    desc:  'We market your course across our platform and social media.',
  },
  {
    title: 'Full Control Over Your Course',
    desc:  'You set the price, schedule, and content — always.',
  },
  {
    title: 'We Handle Everything Else',
    desc:  'Marketing, payments, and platform support all taken care of.',
  },
  {
    title: 'Start Earning Immediately',
    desc:  'No delays. Get paid as soon as students enroll.',
  },
  {
    title: 'Dedicated Team Support',
    desc:  'Our team supports you every step of the journey.',
  },
];

export default function ForInstructors() {
  return (
    <section id="instructors">
      <div className="wrap">
        <div className="two-col two-col-reverse">
          {/* Visual side */}
          <div className="vis-box">
            <span className="vis-ico">💼</span>
            <div className="vis-title">
              Share your <span className="accent">expertise</span>
            </div>
            <div className="vis-desc">
              Turn the skills you already have into a steady and growing income
              stream on Develoopini.
            </div>
            <div className="vis-tag">✦ You are in full control</div>
          </div>

          {/* Text side */}
          <div>
            <div className="tag">💼 For Instructors</div>
            <h2 className="sec-title">
              Teach and <span className="accent">earn</span>
            </h2>
            <p className="sec-desc">
              Have a skill? Share it. We handle marketing, payments, and platform
              management so you focus on teaching.
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
              href="https://docs.google.com/forms/d/e/1FAIpQLSdemqpjMjuWgqQDjDpMWREHxwCCh5mA_1Zve0mIm0gB5XTPEg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
            >
              <span>Join as Instructor →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
