import { describe, it, expect, vi, beforeEach } from "vitest";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { createFindOrCreateGoogleUser } = require("./google-auth");

describe("findOrCreateGoogleUser", () => {
  let mockQuery;
  let findOrCreateGoogleUser;

  beforeEach(() => {
    mockQuery = vi.fn();
    findOrCreateGoogleUser = createFindOrCreateGoogleUser({ query: mockQuery });
  });

  const googleProfile = {
    googleId: "google-123",
    email: "jane@gmail.com",
    profileImageUrl: "https://example.com/photo.jpg",
  };

  it("returns existing user by google_id", async () => {
    const user = {
      id: 1,
      username: "jane",
      email: "jane@gmail.com",
      google_id: "google-123",
      is_active: true,
      password: "hash",
    };

    mockQuery.mockResolvedValueOnce({ rows: [user] });

    const result = await findOrCreateGoogleUser(googleProfile);

    expect(result.id).toBe(1);
    expect(result.password).toBeUndefined();
    expect(mockQuery).toHaveBeenCalledTimes(1);
  });

  it("links google_id to existing email account", async () => {
    const existing = {
      id: 2,
      username: "jane",
      email: "jane@gmail.com",
      is_active: true,
      auth_provider: "local",
    };
    const linked = { ...existing, google_id: "google-123" };

    mockQuery
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [existing] })
      .mockResolvedValueOnce({ rows: [linked] });

    const result = await findOrCreateGoogleUser(googleProfile);

    expect(result.google_id).toBe("google-123");
    expect(mockQuery).toHaveBeenCalledTimes(3);
  });

  it("creates a new user with null password", async () => {
    const newUser = {
      id: 3,
      username: "jane",
      email: "jane@gmail.com",
      google_id: "google-123",
      auth_provider: "google",
      is_active: true,
      password: null,
    };

    mockQuery
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [newUser] });

    const result = await findOrCreateGoogleUser(googleProfile);

    expect(result.auth_provider).toBe("google");
    expect(result.password).toBeUndefined();
  });

  it("rejects inactive users", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 4, is_active: false, password: "hash" }],
    });

    await expect(findOrCreateGoogleUser(googleProfile)).rejects.toThrow(
      "Your account is inactive"
    );
  });
});
