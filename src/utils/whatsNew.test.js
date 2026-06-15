import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getLastSeenVersion,
  markVersionSeen,
  shouldShowWhatsNew,
} from "./whatsNew.js";
import { LAST_SEEN_VERSION_KEY } from "../constants/appVersion.js";

function createLocalStorageMock() {
  const store = new Map();

  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => {
      store.set(key, String(value));
    },
    removeItem: (key) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
  };
}

describe("whatsNew", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", createLocalStorageMock());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shouldShowWhatsNew returns true when nothing is stored", () => {
    expect(shouldShowWhatsNew("1.6.0")).toBe(true);
  });

  it("shouldShowWhatsNew returns false when versions match", () => {
    localStorage.setItem(LAST_SEEN_VERSION_KEY, "1.6.0");
    expect(shouldShowWhatsNew("1.6.0")).toBe(false);
  });

  it("shouldShowWhatsNew returns true when stored version is older", () => {
    localStorage.setItem(LAST_SEEN_VERSION_KEY, "1.5.0");
    expect(shouldShowWhatsNew("1.6.0")).toBe(true);
  });

  it("markVersionSeen persists the current app version", () => {
    markVersionSeen("1.6.0");
    expect(getLastSeenVersion()).toBe("1.6.0");
    expect(shouldShowWhatsNew("1.6.0")).toBe(false);
  });
});
