import { MEASURES } from "./measures";

export type Pt = {
  x: number;
  y: number;
};

export type Landmark = {
  x: number;
  y: number;
  z?: number;
};

export type FaceBox = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
};

export type View = {
  scale: number;
  ox: number;
  oy: number;
  winW: number;
  winH: number;
  bw: number;
  bh: number;
};

export type AnalysisItem = {
  name: string;
  short: string;
  note: string;
  v: {
    cur: number;
    ideal: number;
    off: number;
  };
};

export type AnalysisGrid = {
  faceC: Pt;
  eyeC: Pt;
  top: Pt;
  brow: Pt;
  nose: Pt;
  chin: Pt;
  mouthL: Pt;
  mouthR: Pt;
  nwl: Pt;
  nwr: Pt;
  faceW: number;
  faceLen: number;
  outline: Pt[];
  u: Pt;
  rl: Pt;
};

export type Analysis = {
  items: AnalysisItem[];
  grid: AnalysisGrid;
  faceBox: FaceBox;
};

export const FACE_OVAL = [
  10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379,
  378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127,
  162, 21, 54, 103, 67,
];

const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);
const mid = (a: Pt, b: Pt) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
export const lerp = (a: Pt, b: Pt, t: number): Pt => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

const rot = (p: Pt, c: Pt, ang: number): Pt => {
  const s = Math.sin(ang);
  const co = Math.cos(ang);
  const dx = p.x - c.x;
  const dy = p.y - c.y;
  return { x: c.x + dx * co - dy * s, y: c.y + dx * s + dy * co };
};

export function analyze(
  marks: Landmark[],
  srcW: number,
  srcH: number,
): Analysis {
  const P = (i: number): Pt => ({
    x: marks[i].x * srcW,
    y: marks[i].y * srcH,
  });

  const top = P(10);
  const chin = P(152);
  const nose = P(2);
  const nasion = P(168);
  const faceL = P(234);
  const faceR = P(454);
  const eyeLo = P(33);
  const eyeLi = P(133);
  const eyeRi = P(362);
  const eyeRo = P(263);
  const mouthL = P(61);
  const mouthR = P(291);
  const noseWL = P(48);
  const noseWR = P(278);
  const lipTop = P(0);
  const lipMid = P(13);
  const lipBot = P(17);
  const lipInnerLow = P(14);
  const brow = mid(P(105), P(334));
  const eyeC = mid(mid(eyeLo, eyeLi), mid(eyeRi, eyeRo));
  const faceC = mid(top, chin);

  // rotate by eye-line angle so a tilted head doesn't skew measurements
  const ang = Math.atan2(eyeRo.y - eyeLo.y, eyeRo.x - eyeLo.x);
  const R = (p: Pt) => rot(p, faceC, -ang);

  const rTop = R(top);
  const rBrow = R(brow);
  const rNose = R(nose);
  const rChin = R(chin);
  const rNasion = R(nasion);
  const rFaceC = R(faceC);
  const rEyeC = R(eyeC);
  const rFaceL = R(faceL);
  const rFaceR = R(faceR);
  const rMouthL = R(mouthL);
  const rMouthR = R(mouthR);
  const rNwl = R(noseWL);
  const rNwr = R(noseWR);
  const rLipTop = R(lipTop);
  const rLipMid = R(lipMid);
  const rLipBot = R(lipBot);
  const rLipInnerLow = R(lipInnerLow);

  // face axes in rotated space
  const v = { x: rChin.x - rTop.x, y: rChin.y - rTop.y };
  const vpn = Math.hypot(v.x, v.y) || 1;
  const u = { x: v.x / vpn, y: v.y / vpn }; // vertical axis
  const rl = { x: u.y, y: -u.x }; // lateral axis
  if ((rFaceR.x - rFaceC.x) * rl.x + (rFaceR.y - rFaceC.y) * rl.y < 0) {
    rl.x = -rl.x;
    rl.y = -rl.y;
  }

  // lateral distance from axis
  const perp = (p: Pt) =>
    Math.abs((p.x - rFaceC.x) * rl.x + (p.y - rFaceC.y) * rl.y);
  // position along the face axis
  const down = (p: Pt) => (p.x - rTop.x) * u.x + (p.y - rTop.y) * u.y;

  const faceLen = vpn;
  const faceWid = dist(rFaceL, rFaceR);
  const noseW = dist(rNwl, rNwr);
  const yBrow = down(rBrow);
  const yNose = down(rNose);
  const yChin = down(rChin);
  const yLipBot = down(rLipBot);

  const lipNose = yLipBot - yNose;
  const chinLip = yChin - yLipBot;
  const upperLip = Math.abs(down(rLipMid) - down(rLipTop));
  const lowerLip = Math.abs(down(rLipBot) - down(rLipInnerLow));
  const eyeWLeft = dist(eyeLo, eyeLi);
  const eyeWRight = dist(eyeRi, eyeRo);
  const halfL = perp(rFaceL);
  const halfR = perp(rFaceR);

  const g = (cur: number, ideal: number) => ({
    cur,
    ideal,
    off: Math.abs(cur - ideal) / ideal,
  });

  const m = {
    faceLen,
    faceWid,
    noseW,
    mouthW: dist(rMouthL, rMouthR),
    noseLen: yNose - down(rNasion),
    lipNose,
    chinLip,
    upperLip,
    lowerLip,
    midface: yNose - yBrow,
    lowerFace: yChin - yNose,
    eyeFifth: (5 * ((eyeWLeft + eyeWRight) / 2)) / faceWid,
    eyeWLeft,
    eyeWRight,
    eyeGap: dist(R(eyeLi), R(eyeRi)),
    halfL,
    halfR,
  };

  return {
    items: MEASURES.map((s) => ({
      name: s.name,
      short: s.short,
      note: s.desc,
      v: g(s.val(m), s.ideal),
    })),
    grid: {
      faceC: rFaceC,
      eyeC: rEyeC,
      top: rTop,
      brow: rBrow,
      nose: rNose,
      chin: rChin,
      mouthL: rMouthL,
      mouthR: rMouthR,
      nwl: rNwl,
      nwr: rNwr,
      faceW: faceWid,
      faceLen,
      outline: FACE_OVAL.map((i) => R(P(i))),
      u,
      rl,
    },
    faceBox: faceBox(marks, srcW, srcH),
  };
}

export function faceBox(
  marks: Landmark[],
  srcW: number,
  srcH: number,
): FaceBox {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const i of FACE_OVAL) {
    const p = { x: marks[i].x * srcW, y: marks[i].y * srcH };
    if (p.x < x0) x0 = p.x;
    if (p.y < y0) y0 = p.y;
    if (p.x > x1) x1 = p.x;
    if (p.y > y1) y1 = p.y;
  }
  return {
    x0,
    y0,
    x1,
    y1,
    w: x1 - x0,
    h: y1 - y0,
    cx: (x0 + x1) / 2,
    cy: (y0 + y1) / 2,
  };
}

// canvas bitmap matches the stage box; crop window is chosen to keep the face framed
export function computeView(
  analysis: Analysis,
  srcW: number,
  srcH: number,
  bw: number,
  bh: number,
): View {
  const scale = Math.max(bw / srcW, bh / srcH); // cover: image fills the box, no stretch
  const winW = bw / scale;
  const winH = bh / scale;
  const fb = analysis.faceBox;
  const pad = fb.h * 0.08;
  let oy: number;
  if (winH >= fb.h + 2 * pad) {
    oy = fb.cy - winH / 2; // whole face fits: centre it
  } else {
    oy = fb.y1 + pad - winH; // too tall: keep the chin, crop the forehead
  }
  oy = Math.min(Math.max(oy, 0), Math.max(0, srcH - winH));
  let ox = fb.cx - winW / 2;
  ox = Math.min(Math.max(ox, 0), Math.max(0, srcW - winW));
  return { scale, ox, oy, winW, winH, bw, bh };
}

export function score(items: AnalysisItem[]): number {
  // 100% at ideal, linear falloff: 50% deviation = 0
  const s = items.map((x) => Math.max(0, 1 - x.v.off / 0.5));
  return Math.round((s.reduce((a, b) => a + b, 0) / s.length) * 100);
}

export function idealTxt(val: number): string {
  if (val === 0.618) return "ideal 0.618";
  if (val === 1) return "ideal 1.000";
  return "ideal 1.618";
}
