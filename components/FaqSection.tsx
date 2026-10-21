export default function FaqSection() {
  return (
    <section className="band" id="faq">
      <div className="wrap">
        <div className="shead">
          <span className="kicker">Questions</span>
          <h2>Things people ask</h2>
        </div>
        <div className="faq-list">
          <details className="faq" open>
            <summary>Does a high score mean I am attractive?</summary>
            <p>
              No, and we would rather say so than dress it up. The score
              summarises how closely ten measurements sit on their targets.
              Attractiveness research points somewhere else entirely: averageness,
              symmetry, and cues about health and youth. A face can score well here
              and still not be the face you are used to seeing in the mirror, and
              the reverse happens too.
            </p>
          </details>
          <details className="faq">
            <summary>Is my photo uploaded anywhere?</summary>
            <p>
              No. The detection model is fetched from a public CDN and then runs
              inside this page. Your image is decoded in the browser, measured,
              drawn on a canvas, and discarded. There is no server to send it to,
              no account, and no analytics on your file.
            </p>
          </details>
          <details className="faq">
            <summary>Which photo gives the best result?</summary>
            <p>
              A clear, front-facing shot with even light and a neutral expression.
              Hair out of the way, no heavy filters, and nothing covering the chin
              or the eyebrows. If the head is tilted, the measurements are
              corrected for the tilt of the eye line, but a strongly angled face is
              still harder to measure than a straight one.
            </p>
          </details>
          <details className="faq">
            <summary>How accurate are the numbers?</summary>
            <p>
              Every landmark is an estimate from a 2D photograph, so treat the
              third decimal place as noise. The measurements are internally
              consistent and repeatable on the same photo, which is what makes them
              useful, but they are not measurements to three significant figures.
              They also cannot see depth: a face photographed from slightly
              off-axis will have its apparent proportions distorted, and no amount
              of landmark detection fixes that.
            </p>
          </details>
          <details className="faq">
            <summary>Why do most faces land in the middle of the scale?</summary>
            <p>
              Because real faces do. The scoring is deliberately unforgiving at the
              edges: a ratio 50% away from its target contributes nothing, and a
              face that misses on every ratio cannot score high. A score in the
              seventies means “proportionally ordinary, nothing extreme”, which is
              a good description of most faces.
            </p>
          </details>
          <details className="faq">
            <summary>Does the golden ratio work for every ethnicity?</summary>
            <p>
              The measurements do. The interpretation does not. Studies in
              Malaysian, multiracial, Indian and Chinese populations find that the
              proportions treated as “golden” differ between populations, and a
              2024 systematic review found no significant association between the
              golden ratio and facial evaluation scores across ethnicities. A
              number is not a standard of beauty.
            </p>
          </details>
          <details className="faq">
            <summary>Where do the twenty sample portraits come from?</summary>
            <p>
              CelebA-HQ, the high-quality version of the CelebA face dataset. The
              twenty portraits are bundled with this site rather than loaded from
              a third-party host. They are used here so you can see the tool work
              before you upload anything of your own.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
