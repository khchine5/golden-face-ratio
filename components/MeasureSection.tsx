import { MEASURES } from "@/lib/measures";

export default function MeasureSection() {
  return (
    <section className="band alt" id="measure">
      <div className="wrap">
        <div className="shead">
          <span className="kicker">The method</span>
          <h2>
            Ten proportions, measured the old way — but with the same eyes on
            every face
          </h2>
          <p>
            A ruler on a printed photo gives you different numbers twice. We
            detect 468 landmarks on your face, correct for the tilt of your head
            using the eye line, and measure each proportion in source-image
            pixels. Same photo in, same numbers out.
          </p>
        </div>
        <div className="grid-3">
          {MEASURES.map((m) => (
            <div className="mcard" key={m.name}>
              <div className="t">{m.name}</div>
              <h4>{m.short}</h4>
              <p>{m.desc}</p>
              <span className="target">
                Target: <b>{m.target}</b> · {m.hint}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
