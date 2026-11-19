/**
 * ROSCA frontend — shared configuration.
 *
 * Single source of truth for:
 *   - API base URL (per environment)
 *   - localStorage key names (so tokens are found consistently)
 *   - Platform document versions (must match backend consent.constants.ts)
 *
 * Loaded by every page via <script src="/assets/js/config.js"></script>
 * before any other script. Attaches to window.ROSCA_CONFIG.
 */

(function () {
  'use strict';

  // ── Environment detection ─────────────────────────────────────
  // Local sandbox frontend development uses the local sandbox backend
  // on port 4005. Every non-local deployment uses the sandbox backend.
  // There is deliberately no URL query override: this frontend must
  // never be redirected to the production API by a query parameter.
  const host = window.location.hostname;
  const isLocal =
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '0.0.0.0' ||
    host.endsWith('.local');

  const API_BASE = isLocal
    ? 'http://localhost:4005'
    : 'https://rosca-thrift-sandbox.onrender.com';

  // ── localStorage keys ─────────────────────────────────────────
  // These MUST be stable across deploys so that users logged in on an
  // older build are still recognised after an upgrade. Renaming them
  // silently logs everyone out.
  const ACCESS_KEY = 'rosca_access_token';
  const REFRESH_KEY = 'rosca_refresh_token';

  // ── Document versions ─────────────────────────────────────────
  // Must match packages on the backend:
  //   src/modules/consent/consent.constants.ts → CONSENT_VERSIONS
  // If the backend bumps these, the frontend MUST match, or registration
  // and onboarding will be rejected with CONSENT_VERSION_MISMATCH.
  const CONSENT_VERSIONS = {
    TERMS: '1.0.0',
    PRIVACY: '1.0.0',
  };

  // ── Public API ────────────────────────────────────────────────
  window.ROSCA_CONFIG = Object.freeze({
    // Environment
    API_BASE: API_BASE,
    IS_LOCAL: isLocal,
    IS_PROD: !isLocal,
    DEBUG: isLocal, // verbose console logging in local only

    // Storage
    ACCESS_KEY: ACCESS_KEY,
    REFRESH_KEY: REFRESH_KEY,

    // Compliance
    CONSENT_VERSIONS: CONSENT_VERSIONS,

    // Versioning (used by "About" footers / diagnostics)
    VERSION: '1.0.0',
  });
})();