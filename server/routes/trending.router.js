const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// Get recent made recipes
router.get("/recent", async (req, res) => {
  try {
    const query = `
      SELECT 
        recipes.id AS recipe_id,
        recipes.title AS recipe_title,
        recipes.image_url AS recipe_image_url,
        "user".username AS recipe_owner_username,
        COUNT(made_recipes.id) AS made_count,
        MAX(made_recipes.created_at) AS last_made_at
        FROM made_recipes
        JOIN recipes ON recipes.id = made_recipes.recipe_id
        JOIN "user" ON "user".id = recipes.user_id
        GROUP BY recipes.id, recipes.title, recipes.image_url, "user".username
        ORDER BY last_made_at DESC
        LIMIT 15;
        `;
    const results = await pool.query(query);
    res.json(results.rows);
  } catch (error) {
    console.error("Error fetching trending recipes:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
