const {
  deriveUsernameFromEmail,
  nextUsernameCandidate,
} = require("./oauth-helpers");

class InactiveUserError extends Error {
  constructor() {
    super("Your account is inactive. Contact admin with questions.");
    this.name = "InactiveUserError";
  }
}

const stripPassword = (user) => {
  if (user) {
    delete user.password;
  }
  return user;
};

const assertActive = (user) => {
  if (user && user.is_active === false) {
    throw new InactiveUserError();
  }
};

const createFindOrCreateGoogleUser = (pool) => {
  const findAvailableUsername = async (email) => {
    const base = deriveUsernameFromEmail(email);

    for (let attempt = 1; attempt < 100; attempt += 1) {
      const candidate = nextUsernameCandidate(base, attempt);
      const { rows } = await pool.query(
        `SELECT id FROM "user" WHERE username = $1`,
        [candidate]
      );

      if (rows.length === 0) {
        return candidate;
      }
    }

    throw new Error("Could not generate a unique username");
  };

  return async ({ googleId, email, profileImageUrl }) => {
    const byGoogleId = await pool.query(
      `SELECT * FROM "user" WHERE google_id = $1`,
      [googleId]
    );

    if (byGoogleId.rows.length > 0) {
      const user = byGoogleId.rows[0];
      assertActive(user);
      return stripPassword(user);
    }

    const byEmail = await pool.query(
      `SELECT * FROM "user" WHERE email = $1`,
      [email]
    );

    if (byEmail.rows.length > 0) {
      const existing = byEmail.rows[0];
      assertActive(existing);

      const { rows } = await pool.query(
        `UPDATE "user"
         SET google_id = $1,
             profile_image_url = COALESCE(profile_image_url, $2),
             updated_at = NOW()
         WHERE id = $3
         RETURNING *`,
        [googleId, profileImageUrl || null, existing.id]
      );

      return stripPassword(rows[0]);
    }

    const username = await findAvailableUsername(email);
    const { rows } = await pool.query(
      `INSERT INTO "user"
        (username, password, email, profile_image_url, google_id, auth_provider)
       VALUES
        ($1, NULL, $2, $3, $4, 'google')
       RETURNING *`,
      [username, email, profileImageUrl || null, googleId]
    );

    return stripPassword(rows[0]);
  };
};

const pool = require("./pool");
const findOrCreateGoogleUser = createFindOrCreateGoogleUser(pool);

module.exports = {
  InactiveUserError,
  createFindOrCreateGoogleUser,
  findOrCreateGoogleUser,
};
