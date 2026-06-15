import { APP_VERSION, LAST_SEEN_VERSION_KEY } from "../constants/appVersion.js";

export function getLastSeenVersion() {
  try {
    return localStorage.getItem(LAST_SEEN_VERSION_KEY);
  } catch {
    return null;
  }
}

export function markVersionSeen(version = APP_VERSION) {
  try {
    localStorage.setItem(LAST_SEEN_VERSION_KEY, version);
  } catch {
    // localStorage may be unavailable in some environments
  }
}

export function shouldShowWhatsNew(version = APP_VERSION) {
  return getLastSeenVersion() !== version;
}
