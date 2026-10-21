import Analyzer from "@/components/Analyzer";
import EvidenceSection from "@/components/EvidenceSection";
import FaqSection from "@/components/FaqSection";
import Hero from "@/components/Hero";
import IdeaSection from "@/components/IdeaSection";
import MeasureSection from "@/components/MeasureSection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <Hero />

      <section className="band" id="analyze">
        <div className="wrap">
          <Analyzer />
        </div>
      </section>

      <MeasureSection />
      <IdeaSection />
      <EvidenceSection />
      <FaqSection />

      <section className="band alt">
        <div className="wrap">
          <p className="closing">
            <b>Measure the geometry, keep the judgement.</b> The proportions are a
            way of looking at a face closely, and a good deal of fun to compare
            with other people. They are not a score card, and the research is
            honest about that.
          </p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
