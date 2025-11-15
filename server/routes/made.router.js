const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// Post made recipe

router.post("/", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { recipe_id } = req.body;

    if (!userId) return res.sendStatus(403);

    const sqlText = `
        INSERT INTO made_recipes (user_id, recipe_id)
        VALUES ($1, $2)
        RETURNING *;
        `;
    await pool.query(sqlText, [userId, recipe_id]);

    res.sendStatus(201);
  } catch (error) {
    console.error("Error logging made recipe:", error);
    res.sendStatus(500);
  }
});

// Get return count per recipe for current user /api/made/user
router.get("/user", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const sqlText = `
      SELECT recipe_id, COUNT(*)::int AS count, MAX(created_at) AS last_made_at
      FROM made_recipes
      WHERE user_id = $1
      GROUP BY recipe_id
    `;
    const result = await pool.query(sqlText, [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching made counts for user:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
