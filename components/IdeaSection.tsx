export default function IdeaSection() {
  return (
    <section className="band" id="idea">
      <div className="wrap">
        <div className="shead">
          <span className="kicker">Where the number comes from</span>
          <h2>Why anyone thought a face should follow a rule</h2>
          <p>
            Euclid described the proportion around 300 BC as a curiosity in
            geometry. Everything after that is a story about what that number was
            supposed to mean for people.
          </p>
        </div>
        <div className="timeline">
          <div className="tl">
            <div className="yr">c. 300 BC</div>
            <h4>Euclid</h4>
            <p>
              Defines the “extreme and mean ratio” in the <em>Elements</em>. Pure
              geometry — no talk of beauty at all.
            </p>
          </div>
          <div className="tl">
            <div className="yr">1202</div>
            <h4>Fibonacci</h4>
            <p>
              Publishes the rabbit sequence. The ratio of consecutive terms
              converges on 1.618, giving the ratio a name and a foothold in
              nature.
            </p>
          </div>
          <div className="tl">
            <div className="yr">1509</div>
            <h4>Pacioli &amp; da Vinci</h4>
            <p>
              <em>De Divina Proportione</em> ties the ratio to the human body and
              to composition, illustrated by Leonardo.
            </p>
          </div>
          <div className="tl">
            <div className="yr">1528</div>
            <h4>Dürer</h4>
            <p>
              <em>Four Books on Human Proportion</em> measures real people rather
              than idealised ones — and finds the ratio showing up often.
            </p>
          </div>
          <div className="tl">
            <div className="yr">1865–76</div>
            <h4>Fechner</h4>
            <p>
              Asks whether the golden section has any claim on taste, then runs
              the first experiments on aesthetic preference: people choose between
              rectangles of different shapes. The golden rectangle wins, often.
            </p>
          </div>
          <div className="tl">
            <div className="yr">Today</div>
            <h4>Landmark models</h4>
            <p>
              Google’s MediaPipe finds 468 points on a face in milliseconds, which
              makes the whole argument measurable — and testable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
