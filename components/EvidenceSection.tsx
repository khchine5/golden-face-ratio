export default function EvidenceSection() {
  return (
    <section className="band alt" id="evidence">
      <div className="wrap">
        <div className="shead">
          <span className="kicker">The evidence</span>
          <h2>What the research actually says about golden ratios and faces</h2>
          <p>
            Here is the short version, with the sources at the bottom of the
            section. We would rather you know where the evidence is thin than get
            a beautiful number and a false story.
          </p>
        </div>

        <div className="prose">
          <p>
            The story usually starts with Fechner. He raised the question in 1865,
            and by 1876 he was showing people rectangles and asking which they
            preferred; the golden rectangle came out on top often enough to look
            like a law of taste. A century and a half later, in 1995,{" "}
            <strong>Christopher Green</strong> went back through the entire
            literature and reached a more careful conclusion: there probably is a
            real psychological effect attached to the golden section, but it is
            sensitive to sloppy methods. It survives careful work and evaporates
            under careless work. That single sentence is the fairest summary of
            the field.
          </p>
          <p>
            When the question moves from rectangles to faces, the evidence gets
            messier, and the popular story gets thinner.
          </p>
        </div>

        <div className="study">
          <span className="tag mix">Mixed evidence</span>
          <h4>The golden ratio is not the number that flatters a face</h4>
          <div className="who">Pallett, Link &amp; Lee (2010)</div>
          <p>
            These researchers asked a sharper question than “does phi work”: for a
            given face, is there one spacing of the features that flatters it?
            Across four experiments, yes — but the winning numbers were not the
            classical ones. Attractiveness peaked when the distance from the eyes
            to the mouth was about <strong>36% of face length</strong>, and when
            the distance between the eyes was about <strong>46% of face width</strong>.
            Both differ significantly from the 0.38 the golden section predicts.
          </p>
          <p>
            Their new ratios match an average face, which points at a result that
            has been robust for decades: composite faces, built by averaging many
            real ones, tend to be rated more attractive than the individuals they
            came from. “Attractive faces are only average” was the title of the
            1990 paper that established it.
          </p>
        </div>

        <div className="study">
          <span className="tag mix">Mixed evidence</span>
          <h4>Proportion explains surprisingly little</h4>
          <div className="who">
            Kiekens et al. (2008) · Rossetti et al. (2013) · Zwahlen et al. (2022)
          </div>
          <p>
            In adolescents, Kiekens and colleagues tested nineteen candidate golden
            proportions against beauty ratings. Only four of the nineteen
            correlated with the ratings, and together they accounted for about 16%
            of the variance — which the authors themselves called too small to
            matter clinically.
          </p>
          <p>
            A 2013 study went further and used 3D stereophotogrammetry, the gold
            standard for facial anthropometry, on 400 people, then compared ten
            ratios with 1.618. Seven of the ten came out statistically different
            from the golden value, and none of the ratios tracked how attractive a
            panel of dental professionals judged the face to be. A 2022 study in
            Hong Kong Chinese faces reached a similar conclusion: most “ideal”
            measurements differed significantly from the recommended targets, and
            only a handful of parameters actually tracked attractiveness ratings.
          </p>
        </div>

        <div className="study">
          <span className="tag no">The popular version fails</span>
          <h4>The “phi mask” does not describe an ideal face</h4>
          <div className="who">Holland (2008)</div>
          <p>
            The most widely reproduced version of the golden-ratio face is Stephen
            Marquardt’s phi mask, a face outline drawn from the ratio in the early
            2000s. It is handsome, it is everywhere, and it does not hold up.
            Holland checked the fit properly, using Procrustes analysis rather than
            the eyeballing the mask was usually judged by, and found the mask
            describes the proportions of{" "}
            <strong>masculinised white female fashion models</strong> far better
            than any other group. It fits sub-Saharan African and East Asian faces
            poorly, and its proportions run against what most people actually
            prefer.
          </p>
        </div>

        <div className="study">
          <span className="tag no">No clear link</span>
          <h4>
            Systematic reviews keep landing on the same uncomfortable answer
          </h4>
          <div className="who">Londono et al. (2024)</div>
          <p>
            A 2024 systematic review in the{" "}
            <em>Journal of Prosthetic Dentistry</em> searched PubMed, Web of
            Science, Embase, Scopus and the Cochrane database for work on the
            golden proportion in natural facial esthetics. Its conclusion:{" "}
            <strong>
              no significant association was found between the golden ratio and
              facial evaluation scores across ethnicities.
            </strong>{" "}
            Other cross-population work — Malaysian and multiracial samples — finds
            the same thing: the proportions that count as “golden” shift with the
            population you measure.
          </p>
        </div>

        <div className="prose" style={{ marginTop: 34 }}>
          <div className="pull">
            Proportion is one input among several. Symmetry, averageness,
            youthfulness cues and sex-specific shape all contribute — and none of
            them is a formula.
          </div>
          <p>
            The more useful literature is not about the golden ratio at all. It is
            about what people actually respond to: faces close to the population
            average, faces that are bilaterally symmetric, faces with the shape and
            colouring associated with health and youth. Even that literature is
            careful with its claims. Perrett and colleagues showed that the
            “average face” is attractive but not optimally attractive, and that
            preferences shift between cultures and between sexes. Work on how
            attractiveness is computed from photographs has found that low-level
            image properties — the kind of thing you get from lighting and
            sharpening — move ratings on their own, with no change to the geometry
            whatsoever.
          </p>
          <p>
            <strong>So what is this tool for?</strong> It measures proportions
            consistently and shows you the numbers, which is a genuinely useful
            thing to do with a face: it turns a vague sense of “balanced?” into
            specific distances you can reason about. It is not a verdict, and it
            was never validated as a beauty scale. The score here is our own
            arithmetic, tuned so that a face with every ratio exactly on target
            scores 100 and a face that is 50% off on every ratio scores 0. Real
            faces cluster in the middle, and that is what you should expect.
          </p>
        </div>

        <h3
          style={{
            font: "600 13px/1 system-ui,sans-serif",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "var(--ink-3)",
            margin: "44px 0 18px",
          }}
        >
          References
        </h3>
        <ol className="refs">
          <li>
            Fechner, G. T. (1865). <em>On the question of the golden section</em>.{" "}
            <em>Archiv für zeichnende Künste</em>, 11, 100–112. (Expanded in{" "}
            <em>Vorschule der Ästhetik</em>, 1876.)
          </li>
          <li>
            Green, C. D. (1995). All that glitters: A review of psychological
            research on the aesthetics of the golden section. <em>Perception</em>,
            24(8), 937–968.{" "}
            <a
              href="https://doi.org/10.1068/p240937"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.1068/p240937
            </a>
          </li>
          <li>
            Langlois, J. H., &amp; Roggman, L. A. (1990). Attractive faces are only
            average. <em>Psychological Science</em>, 1(2), 115–121.{" "}
            <a
              href="https://doi.org/10.1111/j.1467-9280.1990.tb00079.x"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.1111/j.1467-9280.1990.tb00079.x
            </a>
          </li>
          <li>
            Perrett, D. I., May, K. A., &amp; Yoshikawa, S. (1994). Facial shape
            and judgements of female attractiveness. <em>Nature</em>, 368,
            239–242.{" "}
            <a
              href="https://doi.org/10.1038/368239a0"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.1038/368239a0
            </a>
          </li>
          <li>
            Little, A. C., Jones, B. C., &amp; DeBruine, L. M. (2005). Facial
            attractiveness: Evolutionary based research.{" "}
            <em>Philosophical Transactions of the Royal Society B</em>, 360(1448),
            1638–1659.
          </li>
          <li>
            Jones, B. C., DeBruine, L. M., &amp; Little, A. C. (2007). The role of
            symmetry in attraction to average faces.{" "}
            <em>Perception &amp; Psychophysics</em>, 69(8), 1273–1277.{" "}
            <a
              href="https://doi.org/10.3758/BF03192944"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.3758/BF03192944
            </a>
          </li>
          <li>
            Marquardt, S. R. (2002). Marquardt on the golden decagon and human
            facial beauty: Interview by Dr. Gottlieb.{" "}
            <em>Journal of Clinical Orthodontics</em>, 36(6), 339–347. (PMID
            12101544.)
          </li>
          <li>
            Holland, E. (2008). Marquardt’s phi mask: Pitfalls of relying on
            fashion models and the golden ratio to describe a beautiful face.{" "}
            <em>Aesthetic Plastic Surgery</em>, 32(2), 200–208.{" "}
            <a
              href="https://doi.org/10.1007/s00266-007-9080-z"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.1007/s00266-007-9080-z
            </a>
          </li>
          <li>
            Schmid, K., Marx, D., &amp; Samal, A. (2008). Computation of a face
            attractiveness index based on neoclassical canons, symmetry, and golden
            ratios. <em>Pattern Recognition</em>, 41(9), 2710–2717.{" "}
            <a
              href="https://doi.org/10.1016/j.patcog.2007.11.022"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.1016/j.patcog.2007.11.022
            </a>
          </li>
          <li>
            Kiekens, R. M. A., Kuijpers-Jagtman, A. M., van’t Hof, M. A., van’t
            Hof, B. E., &amp; Maltha, J. C. (2008). Putative golden proportions as
            predictors of facial esthetics in adolescents.{" "}
            <em>American Journal of Orthodontics and Dentofacial Orthopedics</em>,
            134(4), 480–483.{" "}
            <a
              href="https://doi.org/10.1016/j.ajodo.2006.10.041"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.1016/j.ajodo.2006.10.041
            </a>
          </li>
          <li>
            Pallett, P. M., Link, S., &amp; Lee, K. (2010). New “golden” ratios
            for facial beauty. <em>Vision Research</em>, 50(2), 149–154.{" "}
            <a
              href="https://doi.org/10.1016/j.visres.2009.11.003"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.1016/j.visres.2009.11.003
            </a>
          </li>
          <li>
            Prokopakis, E. P., Vlastos, I. M., Picavet, V. A., Nolst Trenité, G.,
            Thomas, R., Cingi, C., et al. (2013). The golden ratio in facial
            symmetry. <em>Rhinology</em>, 51(1), 18–21.{" "}
            <a
              href="https://doi.org/10.4193/Rhino12.111"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.4193/Rhino12.111
            </a>
          </li>
          <li>
            Rossetti, A., De Menezes, M., Rosati, R., Ferrario, V. F., &amp;
            Sforza, C. (2013). The role of the golden proportion in the evaluation
            of facial esthetics. <em>The Angle Orthodontist</em>, 83(5), 801–808.{" "}
            <a
              href="https://doi.org/10.2319/111812-883.1"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.2319/111812-883.1
            </a>
          </li>
          <li>
            Packiriswamy, V., Kumar, P., &amp; Rao, M. (2012). Identification of
            facial shape by applying golden ratio to the facial measurements: An
            interracial study in Malaysian population.{" "}
            <em>North American Journal of Medical Sciences</em>, 4(11), 624–629.{" "}
            <a
              href="https://doi.org/10.4103/1947-2714.104312"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.4103/1947-2714.104312
            </a>
          </li>
          <li>
            Alam, M. K., Mohd Noor, N. F., Basri, R., Yew, T. F., &amp; Wen, T. H.
            (2015). Multiracial facial golden ratio and evaluation of facial
            appearance. <em>PLOS ONE</em>, 10(11), e0142914.{" "}
            <a
              href="https://doi.org/10.1371/journal.pone.0142914"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.1371/journal.pone.0142914
            </a>
          </li>
          <li>
            Bronstad, P. M., Langlois, J. H., &amp; Russell, R. (2008).
            Computational models of facial attractiveness judgments.{" "}
            <em>Perception</em>, 37(1), 126–142.{" "}
            <a
              href="https://doi.org/10.1068/p5805"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.1068/p5805
            </a>
          </li>
          <li>
            Menzel, C., Hayn-Leichsenring, G. U., Langner, O., Wiese, H., &amp;
            Redies, C. (2015). Fourier power spectrum characteristics of face
            photographs: Attractiveness perception depends on low-level image
            properties. <em>PLOS ONE</em>, 10(4), e0122801.{" "}
            <a
              href="https://doi.org/10.1371/journal.pone.0122801"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.1371/journal.pone.0122801
            </a>
          </li>
          <li>
            Zwahlen, R. A., Tang, A. T. H., Leung, W. K., &amp; Tan, S. K. (2022).
            Does 3-dimensional facial attractiveness relate to golden ratio,
            neoclassical canons, ‘ideal’ ratios and ‘ideal’ angles?{" "}
            <em>Maxillofacial Plastic and Reconstructive Surgery</em>, 44, 28.{" "}
            <a
              href="https://doi.org/10.1186/s40902-022-00358-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.1186/s40902-022-00358-2
            </a>
          </li>
          <li>
            Londono, J., Ghasmi, S., Lawand, G., Mirzaei, F., Akbari, F., &amp;
            Dashti, M. (2024). Assessment of the golden proportion in natural
            facial esthetics: A systematic review.{" "}
            <em>Journal of Prosthetic Dentistry</em>, 131(5), 804–810.{" "}
            <a
              href="https://doi.org/10.1016/j.prosdent.2022.04.026"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.1016/j.prosdent.2022.04.026
            </a>
          </li>
        </ol>
      </div>
    </section>
  );
}
