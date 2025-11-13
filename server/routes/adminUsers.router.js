const express = require("express");
const pool = require("../modules/pool");
const { rejectIfNotAdmin } = require("../modules/authentication-middleware");

const router = express.Router();

// GET all users (admin only)
router.get("/users", rejectIfNotAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, username, email, profile_image_url, is_admin, created_at
      FROM "user"
      ORDER BY username ASC;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.sendStatus(500);
  }
});

router.put('/users/:id', rejectIfNotAdmin, async (req, res) => {
  const userId = req.params.id;
  const { is_admin } = req.body;

  try {
    const sqlText = `UPDATE "user" SET is_admin = $1 WHERE id = $2 RETURNING *;`;
    const result = await pool.query(sqlText, [is_admin, userId]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating user:', err);
    res.sendStatus(500);
  }
});


module.exports = router;





