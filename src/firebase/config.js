import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

/**
 * Firebase is configured exclusively via Vite env (VITE_*).
 * Copy .env.example to .env and paste values from Firebase Console → Project settings → Your apps.
 * Never commit .env or real keys.
 *
 * measurementId is optional (Google Analytics). Omit VITE_FIREBASE_MEASUREMENT_ID if Analytics is disabled.
 */
function readWebConfig() {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
  const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
  const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
  const appId = import.meta.env.VITE_FIREBASE_APP_ID
  const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID

  const required = [apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId]
  if (required.some((v) => !v || String(v).trim() === '')) {
    return null
  }

  const config = {
    apiKey: String(apiKey).trim(),
    authDomain: String(authDomain).trim(),
    projectId: String(projectId).trim(),
    storageBucket: String(storageBucket).trim(),
    messagingSenderId: String(messagingSenderId).trim(),
    appId: String(appId).trim(),
  }

  if (measurementId && String(measurementId).trim() !== '') {
    config.measurementId = String(measurementId).trim()
  }

  return config
}

const webConfig = readWebConfig()

export const isFirebaseConfigured = Boolean(webConfig)

if (import.meta.env.DEV && !webConfig) {
  console.info('[Gooomly] Firebase disabled: set VITE_FIREBASE_* in .env (see .env.example).')
}

function getOrInitApp() {
  if (!webConfig) return null
  const existing = getApps()[0]
  if (existing) return existing
  return initializeApp(webConfig)
}

const app = getOrInitApp()

export { app }
export const db = app ? getFirestore(app) : null
export const auth = app ? getAuth(app) : null
export const storage = app ? getStorage(app) : null

/** Google Analytics when measurementId is present (browser only; null in unsupported environments). */
let analytics = null
if (app && webConfig?.measurementId && typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app)
  } catch {
    analytics = null
  }
}
export { analytics }
