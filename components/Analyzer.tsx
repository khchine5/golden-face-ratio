"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
} from "react";
import {
  analyze,
  computeView,
  idealTxt,
  score,
  type Analysis,
  type Landmark,
  type View,
} from "@/lib/analysis";
import { drawOverlay } from "@/lib/draw";
import { SAMPLES } from "@/lib/samples";

const MEDIAPIPE_VERSION = "0.10.14";
const MEDIAPIPE_CDN = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}`;
const MEDIAPIPE_WASM = `${MEDIAPIPE_CDN}/wasm`;
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

type LandmarkerResult = {
  faceLandmarks?: Landmark[][];
};

type FaceLandmarkerInstance = {
  detect: (image: HTMLCanvasElement) => LandmarkerResult;
};

type FaceLandmarkerModule = {
  FaceLandmarker: {
    createFromOptions: (
      vision: unknown,
      options: unknown,
    ) => Promise<FaceLandmarkerInstance>;
  };
  FilesetResolver: {
    forVisionTasks: (path: string) => Promise<unknown>;
  };
};

export default function Analyzer() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const analysisRef = useRef<Analysis | null>(null);
  const viewRef = useRef<View | null>(null);
  const srcRef = useRef({ w: 0, h: 0 });
  const dprRef = useRef(1);
  const markerRef = useRef<Promise<FaceLandmarkerInstance> | null>(null);

  const [result, setResult] = useState<Analysis | null>(null);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [showGrid, setShowGrid] = useState(true);
  const [showOutline, setShowOutline] = useState(true);

  const drawNow = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    const analysis = analysisRef.current;
    const view = viewRef.current;
    if (!canvas || !img || !analysis || !view) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawOverlay({
      ctx,
      image: img,
      view,
      analysis,
      dpr: dprRef.current,
      showGrid,
      showOutline,
    });
  }, [showGrid, showOutline]);

  const fitCanvas = useCallback(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const analysis = analysisRef.current;
    if (!stage || !canvas || !analysis || !imgRef.current) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.max(1, stage.clientWidth);
    const ch = Math.max(1, stage.clientHeight);
    const bw = Math.max(1, Math.round(cw * dpr));
    const bh = Math.max(1, Math.round(ch * dpr));
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }
    dprRef.current = dpr;
    viewRef.current = computeView(
      analysis,
      srcRef.current.w,
      srcRef.current.h,
      bw,
      bh,
    );
    drawNow();
  }, [drawNow]);

  const getMarker = useCallback(() => {
    if (!markerRef.current) {
      markerRef.current = (async () => {
        const dynamicImport = new Function("url", "return import(url)") as (
          url: string,
        ) => Promise<FaceLandmarkerModule>;
        const { FaceLandmarker, FilesetResolver } =
          await dynamicImport(MEDIAPIPE_CDN);
        const vision = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM);
        return FaceLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: MODEL_URL },
          runningMode: "IMAGE",
          numFaces: 1,
        });
      })();
      markerRef.current.catch(() => {
        markerRef.current = null;
      });
    }
    return markerRef.current;
  }, []);

  const run = useCallback(
    async (img: HTMLImageElement) => {
      const sw = img.naturalWidth || img.width;
      const sh = img.naturalHeight || img.height;
      if (!sw || !sh) {
        alert("Could not read the image size.");
        return;
      }

      const s = Math.min(1024 / Math.max(sw, sh), 4);
      const dw = Math.max(1, Math.round(sw * s));
      const dh = Math.max(1, Math.round(sh * s));
      const work = document.createElement("canvas");
      work.width = dw;
      work.height = dh;
      const wctx = work.getContext("2d");
      if (!wctx) return;
      wctx.drawImage(img, 0, 0, dw, dh);

      setBusy(true);
      setLoadingMsg("Analyzing (first run downloads the model)...");

      let res: LandmarkerResult;
      try {
        res = (await getMarker()).detect(work);
      } catch {
        setBusy(false);
        alert(
          "Could not run face detection. Check your internet connection and try again.",
        );
        return;
      }

      setBusy(false);
      if (!res.faceLandmarks?.length) {
        alert("No face detected. Use a clear, front-facing photo.");
        return;
      }

      const an = analyze(res.faceLandmarks[0], sw, sh);
      imgRef.current = img;
      srcRef.current = { w: sw, h: sh };
      analysisRef.current = an;
      setResult(an);
      requestAnimationFrame(() => fitCanvas());
    },
    [fitCanvas, getMarker],
  );

  useEffect(() => {
    drawNow();
  }, [drawNow]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(() => fitCanvas());
    ro.observe(stage);
    window.addEventListener("resize", fitCanvas);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fitCanvas);
    };
  }, [fitCanvas]);

  const loadLocal = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        void run(img);
        setTimeout(() => URL.revokeObjectURL(url), 0);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        alert("Could not load image.");
      };
      img.src = url;
    },
    [run],
  );

  const loadSample = useCallback(
    (url: string, el: HTMLImageElement) => {
      setSelectedUrl(url);
      const use = (image: HTMLImageElement) => {
        void run(image);
      };
      if (el.complete && el.naturalWidth > 0) use(el);
      else {
        el.onload = () => use(el);
        el.onerror = () => {
          setSelectedUrl(null);
          alert("Could not load sample image. Check your connection.");
        };
      }
    },
    [run],
  );

  const reset = useCallback(() => {
    imgRef.current = null;
    analysisRef.current = null;
    viewRef.current = null;
    setResult(null);
    setSelectedUrl(null);
    setBusy(false);
    setLoadingMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadLocal(file);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) loadLocal(file);
  };

  const openPicker = () => fileInputRef.current?.click();

  const onDropKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPicker();
    }
  };

  const pct = result ? score(result.items) : null;
  const pctColor =
    pct === null ? "var(--gold)" : pct > 70 ? "var(--ok)" : pct > 45 ? "var(--warn)" : "var(--bad)";
  const sorted = result ? [...result.items].sort((a, b) => a.v.off - b.v.off) : [];
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  return (
    <>
      <div className="analyzer-grid">
        <div>
        <div
          className="stage"
          ref={stageRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          {!busy && !result && (
            <div
              className="drop"
              onClick={openPicker}
              onKeyDown={onDropKey}
              role="button"
              tabIndex={0}
            >
              <div className="glyph">◆</div>
              <b>Click to choose a photo</b>
              <span>or drag &amp; drop one here — front-facing photos work best</span>
            </div>
          )}
          {busy && (
            <div className="loading">
              <span className="spin" />
              {loadingMsg}
            </div>
          )}
          <canvas
            id="canvas"
            ref={canvasRef}
            className={result ? "visible" : undefined}
          />
        </div>
        <p className="stage-note">
          The frame crops itself around your face so nothing important falls off
          the edge. Nothing is uploaded: the model and your photo stay on this
          device.
        </p>
      </div>

      <div className="panel">
        <div className="controls">
          <button className="primary" onClick={openPicker}>
            Upload photo
          </button>
          {result && <button onClick={reset}>New photo</button>}
        </div>

        {result && pct !== null && (
          <div className="card">
            <h3>Harmony score</h3>
            <div className="score-top">
              <div className="bignum">{pct}%</div>
              <div className="scorelab">
                How closely the ten proportions sit on their targets
              </div>
            </div>
            <div className="meter">
              <i style={{ width: `${pct}%`, background: pctColor }} />
            </div>
            <div className="note">
              100% means every ratio is exactly on target; a ratio that is 50% off
              counts as zero. This is a geometric snapshot, not a beauty grade —
              see <a href="#evidence">the evidence</a>.
            </div>
            {best && worst && (
              <div className="verdict">
                Closest to its target: {best.short}. Furthest away: {worst.short}.
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="card">
            <h3>Overlay</h3>
            <div className="legend">
              <b>Gold line</b> — centre axis
              <br />
              <b>Dashed gold</b> — brow and nose base (the mid/lower face split)
              <br />
              <b>Solid gold</b> — phi lines (38.2% / 61.8%)
              <br />
              <b>Dim verticals</b> — facial fifths
              <br />
              <b>Dim horizontal</b> — nose and mouth width
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
              />{" "}
              Show grid
            </label>
            <label className="toggle">
              <input
                type="checkbox"
                checked={showOutline}
                onChange={(e) => setShowOutline(e.target.checked)}
              />{" "}
              Show face outline
            </label>
          </div>
        )}
        </div>
      </div>

      {result && (
        <div className="card" style={{ marginTop: 30 }}>
          <h3>Measurements</h3>
          <div className="ratio-grid">
            {result.items.map((it) => {
              const color =
                it.v.off < 0.06
                  ? "var(--ok)"
                  : it.v.off < 0.15
                    ? "var(--warn)"
                    : "var(--bad)";
              const fill = Math.max(5, Math.round(100 - it.v.off * 250));
              return (
                <div className="ratio" key={it.name}>
                  <div className="rhead">
                    <span>{it.name}</span>
                    <span className="val">
                      {it.v.cur.toFixed(3)} ·{" "}
                      <b style={{ color }}>{idealTxt(it.v.ideal)}</b>
                    </span>
                  </div>
                  <div className="rbar">
                    <i style={{ width: `${fill}%`, background: color }} />
                  </div>
                  <div className="rnote">{it.note}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: 30 }}>
        <h3>Or try one of twenty strangers</h3>
        <div className="samples">
          {SAMPLES.map((s) => (
            <img
              key={s.name}
              src={s.url}
              alt={s.name}
              title={s.name}
              crossOrigin="anonymous"
              loading="lazy"
              decoding="async"
              tabIndex={0}
              role="button"
              className={selectedUrl === s.url ? "sel" : undefined}
              onClick={(e) => loadSample(s.url, e.currentTarget)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  loadSample(s.url, e.currentTarget);
                }
              }}
            />
          ))}
        </div>
        <p className="hint">
          20 portraits from the CelebA-HQ dataset (public Hugging Face mirror).
          Click any of them to run the full analysis.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onFileChange}
      />
    </>
  );
}
