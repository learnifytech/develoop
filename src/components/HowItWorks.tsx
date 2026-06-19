const STEPS = [
  {
    num:   '1',
    title: 'Register Free',
    desc:  'Fill our quick form and tell us if you want to learn or teach.',
  },
  {
    num:   '2',
    title: 'Choose Your Path',
    desc:  'Browse available courses or set up your instructor profile with our help.',
  },
  {
    num:   '3',
    title: 'Start Growing',
    desc:  'Learn new skills from experts or start teaching and earning immediately.',
  },
  {
    num:   '4',
    title: 'Get Certified',
    desc:  'Complete your course and receive your official Develoopini certificate.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how">
      <div className="wrap text-center">
        <div className="tag">⚡ Process</div>
        <h2 className="sec-title">
          Simple as <span className="accent">1 2 3 4</span>
        </h2>
        <p className="sec-desc sec-desc-center">
          Getting started on Develoopini takes less than 5 minutes.
        </p>
        <div className="steps-grid">
          {STEPS.map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
