const STATS = [
  { num: '10+',  label: 'Expert Instructors'  },
  { num: '50+',  label: 'Learners Registered' },
  { num: '10+',  label: 'Skills Available'    },
  { num: '100%', label: 'Algerian Platform'   },
];

export default function Stats() {
  return (
    <div className="stats-bar">
      <div className="stats-inner">
        {STATS.map((s, i) => (
          <div className="stat-item" key={i}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
