const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        {/* Brand */}
        <div>
          <div className="f-logo">
            <span className="l">Learnify</span>
            <span className="t">Tech</span>
          </div>
          <div className="f-tag">Learn · Grow · Earn — Develoopini {currentYear}</div>
        </div>

        {/* Links */}
        <nav className="f-links" aria-label="Footer navigation">
          <a
            href="https://instagram.com/learnifytech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram" style={{ marginRight: '6px' }} />
            Instagram
          </a>
          <a href="mailto:learnifytech8@gmail.com">
            <i className="fa-solid fa-envelope" style={{ marginRight: '6px' }} />
            Email Us
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeSJl2ibyn5rt079TjeF23-bgQoYKKX6WsAuaSF650Q5bacdA/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            For Learners
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdemqpjMjuWgqQDjDpMWREHxwCCh5mA_1Zve0mIm0gB5XTPEg/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            For Instructors
          </a>
        </nav>

        {/* Copyright — dynamically set to current year */}
        <div className="f-copy">
          © {currentYear} <span className="accent">LearnifyTech</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
