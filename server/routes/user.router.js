const express = require("express");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { encryptPassword, comparePassword } = require("../modules/encryption");

const router = express.Router();

// If the request came from an authenticated user, this route
// sends back an object containing that user's information.
// Otherwise, it sends back an empty object to indicate there
// is not an active session.
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send({});
  }
});

// Handles the logic for creating a new user. The one extra wrinkle here is
// that we hash the password before inserting it into the database.
router.post("/register", (req, res, next) => {
  const { username, email, profile_image_url } = req.body;
  const hashedPassword = encryptLib.encryptPassword(req.body.password);

  const sqlText = `
    INSERT INTO "user"
      ("username", "password", "email", "profile_image_url")
      VALUES
      ($1, $2, $3, $4);
  `;
  const sqlValues = [username, hashedPassword, email, profile_image_url];

  pool
    .query(sqlText, sqlValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log("POST /api/user/register error: ", dbErr);
      res.sendStatus(500);
    });
});

// Handles the logic for logging in a user. When this route receives
// a request, it runs a middleware function that leverages the Passport
// library to instantiate a session if the request body's username and
// password are correct.
// You can find this middleware function in /server/strategies/user.strategy.js.
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// Clear all server session information about this user:
router.delete("/logout", (req, res, next) => {
  // Use passport's built-in method to log out the user.
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(200);
  });
});

// Update user info (profile image)
router.put("/settings", rejectUnauthenticated, async (req, res) => {
  const userId = req.user.id;
  const { profile_image_url, oldPassword, newPassword } = req.body;

  try {
    if (profile_image_url) {
      const result = await pool.query(
        `UPDATE "user"
         SET profile_image_url = $1, updated_at = NOW()
         WHERE id = $2
         RETURNING id, username, email, profile_image_url, created_at;`,
        [profile_image_url, userId]
      );
      return res.json(result.rows[0]);
    }

    if (oldPassword && newPassword) {
      // fetch current password hash
      const { rows } = await pool.query(
        `SELECT password FROM "user" WHERE id = $1`,
        [userId]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const currentHash = rows[0].password;

      const {
        comparePassword,
        encryptPassword,
      } = require("../modules/encryption");

      // compare old password
      const match = comparePassword(oldPassword, currentHash);
      if (!match) {
        return res.status(401).json({ message: "Old password is incorrect" });
      }

      // hash new password
      const hashed = encryptPassword(newPassword);

      const result = await pool.query(
        `UPDATE "user"
     SET password = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING id, username, email, profile_image_url, created_at;`,
        [hashed, userId]
      );

      return res.json(result.rows[0]);
    }

    res.status(400).json({ message: "No valid fields to update" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.sendStatus(500);
  }
});

router.put("/deactivate", rejectUnauthenticated, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `UPDATE "user"
       SET is_active = FALSE, updated_at = NOW()
       WHERE id = $1
       RETURNING id;`,
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Account deactivated successfully" });
  } catch (error) {
    console.error("Error deactivating account:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get public user info
router.get("/public/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT id, username, profile_image_url, created_at
      FROM "user"
      WHERE id = $1 AND is_active = TRUE`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching public user:", error);
    res.sendStatus(500);
  }

  // get recipes by specific user (public only recipes unless requested by owner)
  router.get("/:id/recipes", async (req, res) => {
    const targetUserId = req.params.id;
    const requesterId = req.user?.id; //undefined if logged in

    try {
      let query = ` 
      SELECT recipes.*, "user".username
      FROM recipes
      JOIN "user" ON recipes.user_id = "user".id
      WHERE recipes.user_id =$1
      `;
      let params = [targetUserId];

      if (!requesterId || requesterId != targetUserId) {
        // not the owner - only show public recipes
        query += ` AND recipes.is_public = TRUE`;
      }

      query += ` ORDER BY recipes.created_at DESC;`;

      const result = await pool.query(query, params);
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
      res.sendStatus(500);
    }
  });
});

module.exports = router;
