export type MeasureMetrics = {
  faceLen: number;
  faceWid: number;
  noseLen: number;
  noseW: number;
  mouthW: number;
  lipNose: number;
  chinLip: number;
  midface: number;
  lowerFace: number;
  eyeFifth: number;
  eyeGap: number;
  eyeWLeft: number;
  eyeWRight: number;
  upperLip: number;
  lowerLip: number;
  halfL: number;
  halfR: number;
};

export type Measure = {
  name: string;
  short: string;
  target: string;
  hint: string;
  ideal: number;
  desc: string;
  val: (m: MeasureMetrics) => number;
};

export const MEASURES: Measure[] = [
  {
    name: "Face length : width",
    short: "face length to width",
    target: "1.618",
    hint: "golden ratio",
    ideal: 1.618,
    desc: "How tall the face is against its own width.",
    val: (m) => m.faceLen / m.faceWid,
  },
  {
    name: "Nose length : width",
    short: "nose length to width",
    target: "1.618",
    hint: "golden ratio",
    ideal: 1.618,
    desc: "The length of the nose measured against its width.",
    val: (m) => m.noseLen / m.noseW,
  },
  {
    name: "Mouth : nose width",
    short: "mouth to nose width",
    target: "1.618",
    hint: "golden ratio",
    ideal: 1.618,
    desc: "Mouth width compared with nose width.",
    val: (m) => m.mouthW / m.noseW,
  },
  {
    name: "Nose to lip : lip to chin",
    short: "the lower third split",
    target: "1.000",
    hint: "equal halves",
    ideal: 1,
    desc: "The lower third divided into two even parts.",
    val: (m) => m.lipNose / m.chinLip,
  },
  {
    name: "Vertical thirds (even)",
    short: "the vertical thirds",
    target: "1.000",
    hint: "equal thirds",
    ideal: 1,
    desc: "The middle and lower sections of the face, from the brow to the nose base and from the nose base to the chin.",
    val: (m) => m.midface / m.lowerFace,
  },
  {
    name: "Facial fifths (even)",
    short: "the facial fifths",
    target: "1.000",
    hint: "equal fifths",
    ideal: 1,
    desc: "Each eye should span about one fifth of the width of the face.",
    val: (m) => m.eyeFifth,
  },
  {
    name: "Eye gap : eye width",
    short: "eye gap to eye width",
    target: "1.000",
    hint: "equal",
    ideal: 1,
    desc: "The gap between the eyes against the width of one eye.",
    val: (m) => m.eyeGap / ((m.eyeWLeft + m.eyeWRight) / 2),
  },
  {
    name: "Upper lip : lower lip",
    short: "the lip split",
    target: "0.618",
    hint: "golden section",
    ideal: 0.618,
    desc: "The golden section in miniature, 0.618.",
    val: (m) => m.upperLip / m.lowerLip,
  },
  {
    name: "Left : right eye width",
    short: "eye symmetry",
    target: "1.000",
    hint: "equal",
    ideal: 1,
    desc: "A symmetry check on the two eyes.",
    val: (m) => Math.min(m.eyeWLeft, m.eyeWRight) / Math.max(m.eyeWLeft, m.eyeWRight),
  },
  {
    name: "Left : right face half",
    short: "facial symmetry",
    target: "1.000",
    hint: "equal",
    ideal: 1,
    desc: "A symmetry check across the jaw and cheeks. A head turned away from the camera will read uneven here even when the face is symmetric.",
    val: (m) => Math.min(m.halfL, m.halfR) / Math.max(m.halfL, m.halfR),
  },
];
