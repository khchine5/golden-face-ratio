export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div>
          <b>Golden Face Ratio</b>
          <br />
          Landmark detection by Google MediaPipe Face Mesh. Sample photos from
          CelebA-HQ.
        </div>
        <div>
          <b>Privacy</b> — everything runs in your browser; your photo is never
          uploaded.
          <br />
          <b>Disclaimer</b> — a geometric snapshot, not a beauty grade or a
          medical assessment.
        </div>
        <div className="credit">
          Built by{" "}
          <a href="https://khchine5.gitlab.io" target="_blank" rel="noopener">
            Hamza Khchine
          </a>
          <br />
          <a href="https://khchine5.gitlab.io" target="_blank" rel="noopener">
            khchine5.gitlab.io
          </a>{" "}
          ·{" "}
          <a
            href="https://github.com/khchine5/golden-face-ratio"
            target="_blank"
            rel="noopener"
          >
            GitHub repo
          </a>
        </div>
      </div>
    </footer>
  );
}
