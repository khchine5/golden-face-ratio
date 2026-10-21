export default function SiteHeader() {
  return (
    <div className="top">
      <div className="wrap">
        <div className="brand">
          <span className="phi">φ</span>
          <b>Golden Face Ratio</b>
          <small>proportion lab</small>
        </div>
        <nav className="topnav">
          <a href="#analyze">Analyze</a>
          <a href="#measure">What we measure</a>
          <a href="#evidence">The evidence</a>
          <a href="#faq">FAQ</a>
          <a className="cta" href="#analyze">
            Try your photo
          </a>
        </nav>
      </div>
    </div>
  );
}
