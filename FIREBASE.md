# Firebase integration guide — Gooomly (Vite + React)

This document describes the **end-to-end process** for connecting this project to Firebase: console setup, local configuration, how the codebase loads credentials, optional feature wiring, and deployment.

---

## Prerequisites

- A [Google account](https://accounts.google.com/)
- [Node.js](https://nodejs.org/) (LTS recommended) and npm
- This repository installed (`npm install`)
- The Firebase SDK is already listed in `package.json` (`firebase`). If dependencies were removed, run:

  ```bash
  npm install firebase
  ```

---

## Part 1 — Create a Firebase project

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** (or **Create a project**).
3. Enter a **project name** (e.g. `gooomly-web`).
4. Continue through the wizard. **Google Analytics** is optional; you may disable it for coursework or small apps.
5. Click **Create project** and wait until it finishes, then **Continue**.

---

## Part 2 — Register a Web app and obtain configuration

1. In the Firebase project **overview**, select the **Web** icon (`</>`) — **Add app** → **Web**.
2. Set an **App nickname** (e.g. `gooomly-vite`).
3. You do **not** need Firebase Hosting checked here if you will configure hosting separately via CLI; either path is valid.
4. Click **Register app**.
5. Firebase shows a **`firebaseConfig`** JavaScript object. You will map each field to environment variables in **Part 4** (do not paste the raw object into source control).

Keep this page open or copy the values to a secure note until they are in `.env`.

---

## Part 3 — Enable Firebase products (as required by your course or product)

Enable only what you need. Typical lab requirements:

### Authentication (Email / Password)

1. In the left menu: **Build** → **Authentication** → **Get started**.
2. Open the **Sign-in method** tab.
3. Enable **Email/Password** (and **Email link** only if your spec requires it).
4. Save.

### Firestore Database

1. **Build** → **Firestore Database** → **Create database**.
2. Choose a **location** close to your users (cannot be changed later).
3. For development, instructors often allow **Start in test mode**. **Important:** test rules expire and are **not** safe for production. Plan to **lock down rules** before public launch.
4. Enable.

### Cloud Storage (optional)

1. **Build** → **Storage** → **Get started**.
2. Accept default location / rules per your lab, then **Done**.

### Hosting (for deployment)

Hosting is activated when you run `firebase init hosting` (see **Part 6**). No separate console toggle is strictly required before CLI setup.

---

## Part 4 — Local environment variables (Vite)

This project reads Firebase **only** from **Vite-prefixed** environment variables. Vite exposes `import.meta.env` to client code; **never** put secrets in non-`VITE_` variables if they must stay server-only (for a static SPA, config is inherently public to the browser—still treat `.env` as private and never commit it).

### Step 1 — Create `.env`

1. In the **repository root** (same folder as `package.json`), copy the template:

   ```bash
   # Windows (PowerShell)
   Copy-Item .env.example .env

   # macOS / Linux
   cp .env.example .env
   ```

2. Open **`.env`** in your editor.

### Step 2 — Map `firebaseConfig` to `.env`

| Firebase `firebaseConfig` key | Variable in `.env` |
|------------------------------|--------------------|
| `apiKey` | `VITE_FIREBASE_API_KEY` |
| `authDomain` | `VITE_FIREBASE_AUTH_DOMAIN` |
| `projectId` | `VITE_FIREBASE_PROJECT_ID` |
| `storageBucket` | `VITE_FIREBASE_STORAGE_BUCKET` |
| `messagingSenderId` | `VITE_FIREBASE_MESSAGING_SENDER_ID` |
| `appId` | `VITE_FIREBASE_APP_ID` |
| `measurementId` (optional, Analytics) | `VITE_FIREBASE_MEASUREMENT_ID` |

Example shape (use **your** real values from the console):

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
# Optional — Google Analytics (same as measurementId in the console snippet)
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 3 — Restart the dev server

Vite reads `.env` at startup. After any change to `.env`:

```bash
npm run dev
```

### Step 4 — Verify configuration in code

The app initializes Firebase in `src/firebase/config.js`:

- If **all** variables are set: `isFirebaseConfigured === true`, and `app`, `db`, `auth`, and `storage` are non-null.
- If **any** variable is missing or empty: Firebase is **not** initialized; exports are `null` and `isFirebaseConfigured` is `false`. In development, a console info message explains that Firebase is disabled.

**Do not commit `.env`.** `.gitignore` should list `.env`. Commit **`.env.example`** only (no real secrets).

---

## Part 5 — Use Firebase in React components

Import from the single module so initialization stays consistent:

```javascript
import { auth, db, isFirebaseConfigured } from '../firebase/config.js'
```

### Pattern: guard before calling Firebase

```javascript
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../firebase/config.js'

async function signIn(email, password) {
  if (!isFirebaseConfigured || !auth) {
    throw new Error('Firebase is not configured. Check your .env file.')
  }
  return signInWithEmailAndPassword(auth, email, password)
}
```

### Firestore example (read)

```javascript
import { collection, getDocs } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase/config.js'

async function loadItems() {
  if (!isFirebaseConfigured || !db) return []
  const snap = await getDocs(collection(db, 'items'))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
```

### Code splitting (optional, recommended at scale)

Importing `firebase/auth` or `firebase/firestore` inside `React.lazy` routes or dynamic `import()` keeps the initial bundle smaller. The **first** import of `../firebase/config.js` still initializes the app when those variables are set.

---

## Part 6 — Firebase CLI, project link, and Hosting

### Install and log in

```bash
npm install -g firebase-tools
firebase login
```

### Link this folder to your Firebase project

From the project root:

```bash
cd path/to/web_lab_2
firebase use --add
```

Select your Firebase project. This creates or updates **`.firebaserc`**.

### Initialize Hosting (if not already done)

```bash
firebase init hosting
```

Recommended answers for this Vite SPA:

- **What do you want to use as your public directory?** → `dist`
- **Configure as a single-page app?** → **Yes**
- **Overwrite `firebase.json`?** → **No** if your repo already contains the correct `firebase.json` (this project includes SPA rewrites to `/index.html`).

### Build and deploy

```bash
npm run build
firebase deploy --only hosting
```

The CLI prints your **Hosting URL** when deployment succeeds.

---

## Part 6b — Deploying on Vercel (with Firebase Auth + Firestore)

Use this path when **Vercel** hosts the app and **Firebase** only provides Auth, Firestore, Storage, etc. You do **not** have to use Firebase Hosting.

### 1. Connect the repository

1. In [Vercel](https://vercel.com/), **Add New… → Project** and import your Git repo.
2. Vercel usually detects **Vite**: build command `npm run build`, output directory **`dist`**. If not, set them manually.
3. Deploy once (it may fail until step 2 is done—that is OK).

### 2. Add environment variables on Vercel

Firebase config is baked in at **build time** for this Vite app (`import.meta.env`).

1. Vercel project → **Settings → Environment Variables**.
2. Add the same names as in `.env`, for **Production** (and **Preview** if you want preview deployments to talk to Firebase):

   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID` (optional)

3. Values must match your Firebase **Web app** config (no `VITE_` prefix in the console—only in Vercel’s **name** column).
4. **Save**, then **Deployments → … → Redeploy** the latest deployment so the new variables are applied.

### 3. Allow your Vercel URL in Firebase Authentication

Otherwise sign-in can be blocked for “unauthorized domain”.

1. Firebase Console → **Authentication** → **Settings** → **Authorized domains**.
2. Add:
   - `localhost` (often already there, for local dev)
   - Your production host, e.g. `your-project.vercel.app`
   - Any **custom domain** you add in Vercel (e.g. `www.example.com`)

### 4. Firestore rules

Auth + Firestore are independent of Vercel. After enabling Firestore:

1. Open **Firestore Database → Rules**.
2. Replace **test mode** with rules that require `request.auth != null` (or your real logic) before production.
3. Publish rules.

### 5. SPA routing on Vercel

This repo includes **`vercel.json`** with a rewrite so paths like `/signin` or `/about` serve **`index.html`** and React Router can run. If you remove it, deep links may 404.

### 6. Optional: Firebase Hosting

You can keep **`firebase.json`** for later or for another environment; using Vercel does not require `firebase deploy` for the React app.

---

## Part 7 — Environment variables at build time (Hosting, CI, Vercel)

The production build is **static**: `VITE_*` variables must exist when **`npm run build`** runs (locally, on Vercel, or in CI).

**Typical approaches:**

1. **Vercel:** Project → Settings → Environment Variables (see Part 6b).
2. **Firebase Hosting / other CI:** Inject `.env` or env vars before `npm run build`.
3. **Never** commit real `.env` files to a public repository.

For multiple environments (dev / staging / prod), use separate Firebase projects or separate env var sets per Vercel environment.

---

## Part 8 — Security and compliance checklist

| Topic | Action |
|--------|--------|
| **`.env`** | Never commit; rotate keys if leaked |
| **Firestore / Storage rules** | Replace test rules before production |
| **API keys** | Firebase Web API keys are restricted by Firebase security rules and domain config; still follow [Google’s API key best practices](https://support.google.com/googleapi/answer/6310037) |
| **Authentication** | Enforce email verification or MFA if your product requires it |
| **Dependencies** | Run `npm audit` periodically |

---

## Part 9 — Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| `isFirebaseConfigured` is false | Missing or empty `VITE_*` in `.env`, or dev server not restarted |
| `auth/invalid-api-key` | Wrong `VITE_FIREBASE_API_KEY` or typo |
| `permission-denied` (Firestore) | Security rules block the request |
| Blank page after deploy | Wrong `public` folder (`dist` for Vite) or missing SPA rewrite to `index.html` |
| `main.jsx` MIME type `text/jsx` error | Vercel is serving **source** files, not the build. Set **Output Directory** to `dist` and ensure **Build Command** is `npm run build` (see `vercel.json` in this repo). |
| Variables undefined in browser | Name must start with `VITE_`; rebuild after changing `.env` |

---

## Reference — Files in this repository

| File | Purpose |
|------|---------|
| `src/firebase/config.js` | Reads env, initializes Firebase, exports `app`, `db`, `auth`, `storage`, `isFirebaseConfigured` |
| `.env.example` | Documented variable names (no secrets) |
| `.env` | Your real values (local only, gitignored) |
| `firebase.json` | Optional Firebase Hosting: `public: dist`, SPA rewrites |
| `.firebaserc` | Default Firebase project ID (created by `firebase use`) |
| `vercel.json` | Vercel SPA rewrite so client-side routes work |

---

## Summary

1. Create a Firebase project and register a **Web** app.  
2. Enable **Authentication**, **Firestore**, and **Storage** as needed.  
3. Copy `.env.example` → `.env` and fill **all** `VITE_FIREBASE_*` values.  
4. Restart **`npm run dev`**; use `isFirebaseConfigured` before calling Auth/Firestore.  
5. Use **`npm run build`** then **`firebase deploy --only hosting`** for production.  

For questions specific to Firebase products, see the [Firebase documentation](https://firebase.google.com/docs).
