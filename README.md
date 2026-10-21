# Golden Face Ratio

A private, browser-only facial proportion analyser. It detects 468 facial landmarks with
MediaPipe Face Landmarker and measures ten proportions against the golden ratio and
neoclassical canons. Everything runs on the visitor's device; no photo is uploaded.

This project is a Next.js App Router port of the original single-file page in
`reference/index.html`. The whole site is statically generated (`output: "export"`) and is
ready to deploy to Cloudflare Workers (static assets) on the free plan.

## Stack

- Next.js 16 (App Router) with `output: "export"`
- React 19 + TypeScript
- MediaPipe Tasks Vision 0.10.14, loaded from jsDelivr at runtime
- No database, no API routes, no server runtime

## Local development

Requirements: Node.js 22 (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build and preview the static site

```bash
npm run build
npm run preview
```

The export is written to `out/`. `npm run preview` serves that folder at
<http://localhost:3000> with `serve`.

## Deploy to Cloudflare Workers

The output is plain static files. Any static host works, but this repo includes Cloudflare
Workers configuration with static assets.

### Option 1: Git integration (recommended)

1. Push the repository to GitHub or GitLab.
2. In the Cloudflare dashboard go to **Workers & Pages → Create → Workers → Import a
   repository** and select the repo.
3. Use these build settings:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
4. Add an environment variable `NODE_VERSION=22` (the build image also reads `.nvmrc` on
   recent images).
5. Deploy.

`wrangler.toml` sets `[assets] directory = "./out"`, so `wrangler deploy` uploads the
static export directly. There is no Worker script, no server runtime, and no
compatibility flags or bindings.

Do not use Cloudflare Pages for this project: its build image runs an extra Pages-specific
deploy step and `pages_build_output_dir` is not configured. If the project already exists
as a Pages project, create a Worker instead or switch the deploy command to
`npx wrangler pages deploy out --project-name golden-face-ratio`.

### Option 2: CLI (direct upload)

```bash
nvm use
npm install
npm run build
npx wrangler login
npm run deploy
```

`npm run deploy` runs:

```bash
wrangler deploy
```

The first run creates the Worker. Wrangler reads `wrangler.toml`, which already points at
`out/` and serves `404.html` for missing paths.

### Headers

`public/_headers` is copied to `out/_headers` and applied by Cloudflare Workers static
assets. It sets basic security headers and long-lived caching for `/_next/static/*`.

## How it works

1. The user picks a photo or clicks one of the CelebA-HQ samples.
2. The image is drawn to an offscreen canvas (max 1024 px on the long edge).
3. MediaPipe Face Landmarker returns 468 normalised landmarks. The model and WASM runtime
   are fetched from public CDNs on first use.
4. `lib/analysis.ts` rotates the landmarks by the eye-line angle, derives the face axes,
   and computes the ten ratios in source-image pixels.
5. `lib/draw.ts` draws the crop plus the centre axis, thirds, facial fifths, phi lines and
   face outline on the visible canvas.
6. The harmony score is a linear falloff from each target: exactly on target scores 100,
   a 50% deviation scores 0, and the ten results are averaged.

The photo never leaves the browser. Network requests are limited to the MediaPipe runtime,
the model file, and the sample images.

## Project structure

```text
app/
  globals.css        Visual design, ported from the original page
  icon.svg           Favicon
  layout.tsx         Metadata and root layout
  page.tsx           Static page composition
components/
  Analyzer.tsx       Client component: upload, detection, canvas, scoring UI
  EvidenceSection.tsx
  FaqSection.tsx
  Hero.tsx
  IdeaSection.tsx
  MeasureSection.tsx
  SiteFooter.tsx
  SiteHeader.tsx
lib/
  analysis.ts        Landmark maths, view/crop calculation, scoring
  draw.ts            Canvas overlay renderer
  measures.ts        The ten measures, targets and descriptions
  samples.ts         CelebA-HQ sample paths
public/
  samples/           Bundled sample portraits (CelebA-HQ)
  _headers           Cloudflare headers
reference/
  index.html         Original standalone version, kept for comparison
```

## Privacy and limits

- No uploads, accounts, cookies or analytics.
- The analysis depends on two external CDNs; if they are blocked, detection cannot run.
- Measurements are 2D estimates. They are repeatable on the same photo but are not a
  medical or aesthetic assessment.
