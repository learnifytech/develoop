const CARDS = [
  {
    icon:  '🎯',
    title: 'Real Skills Only',
    desc:  'Every course is practical, hands-on, and designed to get you results fast. No fluff. No filler. Pure value.',
  },
  {
    icon:  '🇩🇿',
    title: 'Made for Algeria',
    desc:  'Our instructors understand the Algerian market and teach content that is directly applicable here and now.',
  },
  {
    icon:  '💰',
    title: 'Learn and Earn',
    desc:  'Whether you are here to learn or to teach, Develoopini helps you turn your skills into real income.',
  },
];

export default function About() {
  return (
    <section id="about">
      <div className="wrap text-center">
        {/* Section header */}
        <div className="tag">✦ About Develoopini</div>
        <h2 className="sec-title">
          Built <span className="accent">for Algeria.</span>
          <br />Built for You.
        </h2>
        <p className="sec-desc sec-desc-center">
          We believe every Algerian deserves access to quality practical education.
          No outdated theory. No wasted time. Just real skills that open real doors.
        </p>

        {/* Cards */}
        <div className="cards-3">
          {CARDS.map((c, i) => (
            <div className="card" key={i}>
              <div className="card-ico">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
