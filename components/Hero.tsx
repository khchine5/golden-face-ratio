export default function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <span className="eyebrow">Facial proportion analysis</span>
        <h1>
          How close is your face to the <em>golden ratio</em>?
        </h1>
        <p className="lede">
          The golden ratio, phi (1.618), has been credited with everything from
          the Parthenon to the layout of this page. Drop in a photo and we will
          measure ten of the proportions artists and orthodontists have argued
          about for two thousand years — and tell you, honestly, where you land.
        </p>
        <div className="row">
          <a className="btn" href="#analyze">
            Analyze a photo
          </a>
          <a className="btn ghost" href="#evidence">
            Read what the research says
          </a>
        </div>
        <div className="chips">
          <span>
            <b>100%</b> private — runs in your browser
          </span>
          <span>
            <b>468</b> facial landmarks
          </span>
          <span>
            <b>10</b> proportions measured
          </span>
          <span>
            <b>No</b> signup, no account
          </span>
        </div>
      </div>
    </header>
  );
}
