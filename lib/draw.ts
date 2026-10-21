import { lerp, type Analysis, type Pt, type View } from "./analysis";

type DrawOptions = {
  ctx: CanvasRenderingContext2D;
  image: CanvasImageSource;
  view: View;
  analysis: Analysis;
  dpr: number;
  showGrid: boolean;
  showOutline: boolean;
};

export function drawOverlay({
  ctx,
  image,
  view,
  analysis,
  dpr,
  showGrid,
  showOutline,
}: DrawOptions) {
  const v = view;
  const d = dpr || 1;
  ctx.clearRect(0, 0, v.bw, v.bh);
  ctx.drawImage(image, v.ox, v.oy, v.winW, v.winH, 0, 0, v.bw, v.bh);

  const g = analysis.grid;
  const gold = "rgba(169,124,29,.9)";
  const dim = "rgba(77,71,60,.5)";
  ctx.lineCap = "round";

  const mapP = (p: Pt): Pt => ({
    x: (p.x - v.ox) * v.scale,
    y: (p.y - v.oy) * v.scale,
  });

  const line = (a: Pt, b: Pt, c: string, w?: number) => {
    const p1 = mapP(a);
    const p2 = mapP(b);
    ctx.strokeStyle = c;
    ctx.lineWidth = (w || 1.5) * d;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  };

  if (showOutline) {
    ctx.strokeStyle = dim;
    ctx.lineWidth = 1.5 * d;
    ctx.beginPath();
    g.outline.forEach((p, i) => {
      const q = mapP(p);
      if (i) ctx.lineTo(q.x, q.y);
      else ctx.moveTo(q.x, q.y);
    });
    ctx.closePath();
    ctx.stroke();
  }

  if (!showGrid) return;

  const { u, rl, faceW, faceLen, faceC } = g;
  const fw = faceW / 2;
  const at = (p: Pt, lat: number): Pt => ({
    x: p.x + rl.x * lat,
    y: p.y + rl.y * lat,
  });

  // center axis along face
  line(
    { x: faceC.x - u.x * faceLen * 0.62, y: faceC.y - u.y * faceLen * 0.62 },
    { x: faceC.x + u.x * faceLen * 0.62, y: faceC.y + u.y * faceLen * 0.62 },
    gold,
    1.6,
  );

  // vertical thirds
  ctx.setLineDash([5 * d, 4 * d]);
  for (const p of [g.brow, g.nose]) line(at(p, -fw), at(p, fw), gold, 1.2);
  ctx.setLineDash([]);

  // phi lines (38.2% / 61.8% of face length from top)
  for (const f of [0.382, 0.618]) {
    const p = lerp(g.top, g.chin, f);
    line(at(p, -fw), at(p, fw), "rgba(169,124,29,.45)", 1);
  }

  // facial fifths (vertical boundaries at ±10%,30%,50% of face width)
  ctx.strokeStyle = dim;
  ctx.lineWidth = 1 * d;
  ctx.setLineDash([2 * d, 3 * d]);
  for (const f of [-0.5, -0.3, -0.1, 0.1, 0.3, 0.5]) {
    const half = faceLen * 0.62;
    line(
      {
        x: faceC.x + rl.x * faceW * f - u.x * half,
        y: faceC.y + rl.y * faceW * f - u.y * half,
      },
      {
        x: faceC.x + rl.x * faceW * f + u.x * half,
        y: faceC.y + rl.y * faceW * f + u.y * half,
      },
      dim,
      1,
    );
  }
  ctx.setLineDash([]);

  // nose and mouth width
  line(g.nwl, g.nwr, dim, 1.3);
  line(g.mouthL, g.mouthR, dim, 1.3);

  // face width label (screen pixels)
  const np = mapP(g.nose);
  ctx.font = `${11 * d}px ui-monospace, monospace`;
  ctx.fillStyle = "rgba(169,124,29,.95)";
  ctx.fillText(
    `width ${Math.round((faceW * v.scale) / d)}px`,
    np.x + 8 * d,
    np.y - 10 * d,
  );
}
