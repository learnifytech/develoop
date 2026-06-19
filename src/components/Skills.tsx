const SKILLS = [
  { emoji: '🎨', name: 'Graphic Design'  },
  { emoji: '💻', name: 'Web Development' },
  { emoji: '📱', name: 'Social Media'    },
  { emoji: '🎬', name: 'Video Editing'   },
  { emoji: '📊', name: 'Data Analysis'   },
  { emoji: '🤖', name: 'AI Tools'        },
  { emoji: '✍️', name: 'Copywriting'     },
  { emoji: '💰', name: 'E-commerce'      },
  { emoji: '🎙️', name: 'Soft Skills'    },
  { emoji: '📈', name: 'Entrepreneurship'},
];

export default function Skills() {
  return (
    <section className="skills-sec" id="skills">
      <div className="wrap text-center">
        <div className="tag">🛠️ Skills</div>
        <h2 className="sec-title">
          What can you <span className="accent">learn?</span>
        </h2>
        <p className="sec-desc sec-desc-center">
          From design to development, marketing, and beyond.
        </p>
        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <div className="skill-card" key={i}>
              <span className="skill-emoji">{s.emoji}</span>
              <div className="skill-name">{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
