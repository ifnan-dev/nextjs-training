# Register → Login → Jobs → Create Job — File & Function Flow

Every page is wrapped by `app/layout.tsx`, which renders `Navbar` on all routes.

---

## Big picture

```mermaid
sequenceDiagram
  participant User
  participant Register as app/register/page.tsx
  participant AuthClient as lib/auth-client.ts
  participant AuthAPI as app/api/auth/[...all]/route.ts
  participant Auth as lib/auth.ts
  participant DB as PostgreSQL
  participant Login as app/login/page.tsx
  participant Navbar as components/Navbar.tsx
  participant Jobs as app/jobs/page.tsx
  participant Service as services/jobs.service.ts
  participant Create as app/jobs/create/page.tsx
  participant JobsAPI as app/api/jobs/route.ts
  participant JobForm as components/JobForm.tsx

  User->>Register: Submit form
  Register->>Register: registerSchema validates (Zod)
  Register->>AuthClient: signUp.email()
  AuthClient->>AuthAPI: POST /api/auth/sign-up/email
  AuthAPI->>Auth: Better Auth handler
  Auth->>DB: Create user + account
  Register->>Login: router.push("/login")

  User->>Login: Submit form
  Login->>Login: loginSchema validates (Zod)
  Login->>AuthClient: signIn.email()
  AuthClient->>AuthAPI: POST /api/auth/sign-in/email
  AuthAPI->>DB: Verify password, create session
  AuthAPI-->>User: Set session cookie
  Login->>Navbar: router.refresh() + push("/")

  User->>Jobs: Click "Jobs" in Navbar
  Jobs->>Service: getJobs()
  Service->>DB: prisma.job.findMany()
  Jobs-->>User: Render job list

  User->>Create: Click "Create Job"
  Create->>AuthClient: useSession() checks login
  Create->>JobForm: Render form
  User->>JobForm: Submit
  JobForm->>JobForm: createJobSchema validates (Zod)
  Create->>JobsAPI: POST /api/jobs (with cookie)
  JobsAPI->>Auth: getSession() — who is logged in?
  JobsAPI->>Service: createJob({ ..., clientId })
  Service->>DB: prisma.job.create()
  Create->>Jobs: router.push("/jobs")
```

---

## Step 1 — Register (`/register`)

| File | Function / what it does |
|------|-------------------------|
| `app/register/page.tsx` | **`RegisterPage()`** — main page component |
| | **`useForm()`** — manages form state (name, email, password, role) |
| | **`handleSubmit(onSubmit)`** — runs validation, then calls `onSubmit` |
| | **`onSubmit(data)`** — sends data to Better Auth after Zod passes |
| `lib/validations/auth.ts` | **`registerSchema`** — rules: name ≥2, email valid, password ≥8, role enum |
| `lib/auth-client.ts` | **`authClient.signUp.email()`** — browser call to auth API |
| `app/api/auth/[...all]/route.ts` | **`GET` / `POST`** — forwards all `/api/auth/*` to Better Auth |
| `lib/auth.ts` | **`betterAuth()`** — server auth config (Prisma, email/password, `role` field) |
| `lib/db.ts` | **`prisma`** — writes to `user`, `account` tables |

**Flow:**

```
User fills form
  → registerSchema validates (client)
  → authClient.signUp.email({ email, password, name, role })
  → POST /api/auth/sign-up/email
  → Better Auth hashes password, saves user in DB
  → router.push("/login")
```

---

## Step 2 — Login (`/login`)

| File | Function / what it does |
|------|-------------------------|
| `app/login/page.tsx` | **`LoginPage()`** — main page component |
| | **`useForm()`** — manages email + password fields |
| | **`onSubmit(data)`** — calls Better Auth sign-in |
| `lib/validations/auth.ts` | **`loginSchema`** — email valid, password required |
| `lib/auth-client.ts` | **`authClient.signIn.email()`** — sends credentials to API |
| `app/api/auth/[...all]/route.ts` | Handles `POST /api/auth/sign-in/email` |
| `lib/auth.ts` | Verifies password against `account` table, creates `session` row |
| Browser | Receives **session cookie** (used on all later requests) |

**On success:**

```
router.refresh()  → re-fetches server components (Navbar updates)
router.push("/")  → goes to home page
```

---

## Step 3 — Navbar shows you're logged in (every page)

| File | Function / what it does |
|------|-------------------------|
| `components/Navbar.tsx` | **`Navbar()`** — top bar on every page |
| | **`authClient.useSession()`** — polls `GET /api/auth/get-session` |
| | If `session.user` exists → shows **name** + **Sign out** |
| | If not → shows **Log in** / **Register** buttons |
| `lib/auth-client.ts` | **`createAuthClient()`** — React hook for session state |
| `app/api/auth/[...all]/route.ts` | `GET /api/auth/get-session` — reads cookie, returns user from DB |

---

## Step 4 — View jobs (`/jobs`)

| File | Function / what it does |
|------|-------------------------|
| `components/Navbar.tsx` | User clicks **Jobs** link → navigates to `/jobs` |
| `app/jobs/page.tsx` | **`JobsPage()`** — **Server Component** (runs on server) |
| | Calls **`getJobs()`** directly (no HTTP fetch) |
| `services/jobs.service.ts` | **`getJobs()`** — `prisma.job.findMany()` with `client` included |
| `lib/db.ts` | **`prisma`** — queries `Job` table in PostgreSQL |
| `app/jobs/page.tsx` | Maps jobs into a list of links → `/jobs/{id}` |

**Flow:**

```
GET /jobs
  → JobsPage() runs on server
  → getJobs() → prisma.job.findMany()
  → HTML sent to browser with job list
```

No login required to **view** jobs.

---

## Step 5 — Create job (`/jobs/create`)

### Gate 1 — Middleware (before page loads)

| File | Function / what it does |
|------|-------------------------|
| `middleware.ts` | **`middleware(request)`** — runs on Edge before `/jobs/create` |
| | **`getSessionCookie(request)`** — checks if session cookie exists |
| | No cookie → **`NextResponse.redirect("/login")`** |

### Gate 2 — Page (client-side)

| File | Function / what it does |
|------|-------------------------|
| `app/jobs/create/page.tsx` | **`CreateJobPage()`** — Client Component |
| | **`authClient.useSession()`** — double-checks login in browser |
| | **`useEffect()`** — redirects to `/login` if no session |
| | Returns `null` while loading / unauthenticated |

### Gate 3 — Form submit

| File | Function / what it does |
|------|-------------------------|
| `components/JobForm.tsx` | **`JobForm()`** — shared form UI |
| | **`useForm()` + `zodResolver(createJobSchema)`** — client validation |
| | **`handleSubmit(onSubmit)`** — passes valid data to parent |
| `lib/validations/job.schema.ts` | **`createJobSchema`** — title ≥5, description ≥20, budget ≥50 |
| `app/jobs/create/page.tsx` | **`createJob(data)`** — `fetch POST /api/jobs` with cookie |

### Gate 4 — API (server-side, real security)

| File | Function / what it does |
|------|-------------------------|
| `app/api/jobs/route.ts` | **`POST(request)`** — API handler |
| | **`auth.api.getSession({ headers })`** — full DB session check |
| | No session → `401 "You must be logged in"` |
| | **`createJobSchema.safeParse(body)`** — server validation |
| | **`createJob({ ...data, clientId: session.user.id })`** |
| `services/jobs.service.ts` | **`createJob(data)`** — `prisma.job.create()` |
| `lib/format-api-error.ts` | **`formatApiError()`** — turns API errors into alert text |

**On success:**

```
router.push("/jobs")  → back to job list (now includes new job)
```

---

## Shared infrastructure (used throughout)

| File | Role |
|------|------|
| `app/layout.tsx` | Wraps every page with `Navbar` + footer |
| `lib/db.ts` | Single Prisma client instance |
| `lib/auth.ts` | Server-side Better Auth (sessions, users) |
| `lib/auth-client.ts` | Browser-side Better Auth (login UI, session hook) |
| `prisma/schema.prisma` | DB models: `User`, `Session`, `Job`, etc. |

---

## Quick reference

| Step | Page | Key function | Hits API? | Needs login? |
|------|------|--------------|-----------|--------------|
| Register | `app/register/page.tsx` | `onSubmit` → `signUp.email` | `POST /api/auth/sign-up/email` | No |
| Login | `app/login/page.tsx` | `onSubmit` → `signIn.email` | `POST /api/auth/sign-in/email` | No |
| Navbar | `components/Navbar.tsx` | `useSession()` | `GET /api/auth/get-session` | — |
| View jobs | `app/jobs/page.tsx` | `getJobs()` (direct Prisma) | No HTTP | No |
| Create job | `app/jobs/create/page.tsx` | `createJob()` → `fetch POST` | `POST /api/jobs` | **Yes** |

---

## Exporting the diagram as an image

The sequence diagram above uses **Mermaid** syntax inside a fenced code block. Here are ways to turn it into PNG or SVG.

### Option 1 — Mermaid Live Editor (easiest)

1. Open [https://mermaid.live](https://mermaid.live)
2. Copy everything **inside** the ` ```mermaid ` block (from `sequenceDiagram` to the last line before ` ``` `)
3. Paste into the editor — the diagram renders on the right
4. Click **Actions** → **PNG** or **SVG** to download

### Option 2 — VS Code / Cursor

1. Install the **Markdown Preview Mermaid Support** extension (or **Mermaid Preview**)
2. Open this file and use **Markdown: Open Preview**
3. Right-click the rendered diagram → **Copy Image** or use the extension’s export command if available

### Option 3 — GitHub

1. Push this file to GitHub
2. View the `.md` file on GitHub — Mermaid renders automatically
3. Screenshot the diagram, or use a browser “Save image” if your browser supports it

### Option 4 — CLI (`@mermaid-js/mermaid-cli`)

```bash
npm install -g @mermaid-js/mermaid-cli

# Save only the mermaid block to a .mmd file, then:
mmdc -i diagram.mmd -o diagram.png
mmdc -i diagram.mmd -o diagram.svg
```

### Option 5 — Notion / Confluence / Obsidian

- **Notion:** paste the mermaid block in a code block with language `mermaid`
- **Obsidian:** native Mermaid support in preview; plugins can export to PNG
- **Confluence:** use the Mermaid macro or paste as image after exporting from mermaid.live

**Recommended for a one-off export:** use [mermaid.live](https://mermaid.live) — no install, PNG/SVG in one click.
