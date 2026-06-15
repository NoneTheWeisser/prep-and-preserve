import { describe, it, expect } from "vitest";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const {
  deriveUsernameFromEmail,
  nextUsernameCandidate,
  sanitizeUsername,
} = require("./oauth-helpers");

describe("oauth-helpers", () => {
  it("derives username from email local part", () => {
    expect(deriveUsernameFromEmail("jane.doe@gmail.com")).toBe("jane.doe");
  });

  it("sanitizes invalid characters", () => {
    expect(sanitizeUsername("Hello World!")).toBe("helloworld");
    expect(sanitizeUsername("@@@")).toBe("user");
  });

  it("applies collision suffix", () => {
    expect(nextUsernameCandidate("jane.doe", 1)).toBe("jane.doe");
    expect(nextUsernameCandidate("jane.doe", 2)).toBe("jane.doe-2");
    expect(nextUsernameCandidate("jane.doe", 3)).toBe("jane.doe-3");
  });
});
