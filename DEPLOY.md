# Deploy SmartTrack to Vercel

SmartTrack is a **Next.js** app (`smarttrack/`). Static pages (SRMD Monitoring, Profiling design) live under `public/`.

## Quick deploy (recommended)

### 1. Push to GitHub

From the `smarttrack` folder:

```bash
git add .
git commit -m "Prepare Vercel deployment"
git push origin main
```

**Important:** Include `public/srmd-monitoring/` and `public/profiling/` in the repo. On Vercel, `SecurityDashboard` (sibling folder) is not available, so the built SRMD bundle must be committed.

### 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. **Root Directory:** `smarttrack` (if the repo is the parent `SmartTrack` monorepo) or `.` (if the repo root *is* `smarttrack`)
4. Framework: **Next.js** (auto-detected)

### 3. Environment variables

In **Project → Settings → Environment Variables**, add:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

Use the same values as in `.env.local` locally (see `.env.example`).

Apply to **Production**, **Preview**, and **Development**.

### 4. Deploy

Click **Deploy**. Build runs:

```bash
npm install
npm run build   # sync:srmd (fallback) + next build
```

### 5. URLs after deploy

| Page | Path |
|------|------|
| Home / dashboard | `/` |
| SRMD Monitoring | `/srmd-monitoring/index.html` |
| Profiling (design) | `/profiling/index.html` |
| Review patrol | `/review-patrol` |

---

## Monorepo (optional — build SRMD on Vercel)

If both `smarttrack` and `SecurityDashboard` are in **one** GitHub repo:

1. Set Vercel **Root Directory** to `smarttrack`
2. Add a **Install Command** that also installs SecurityDashboard:

```bash
npm install && npm install --prefix ../SecurityDashboard
```

Then `npm run build` will run `sync:srmd`, detect `../SecurityDashboard`, and rebuild SRMD on every deploy.

---

## CLI deploy (alternative)

```bash
cd smarttrack
npx vercel login
npx vercel          # preview
npx vercel --prod   # production
```

Set env vars with `npx vercel env add NEXT_PUBLIC_SUPABASE_URL` etc.

---

## Troubleshooting

- **Build fails on `sync:srmd`:** Commit `public/srmd-monitoring/` or use the monorepo install step above.
- **Supabase errors in production:** Check env vars are set on Vercel and redeploy.
- **404 on `/srmd-monitoring`:** Use `/srmd-monitoring/index.html` or add a rewrite in `vercel.json` if you want a shorter URL.
