const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// Get recent made recipes
router.get("/recent", async (req, res) => {
  try {
    const query = `
        SELECT 
        made_recipes.id AS made_record_id,
        made_recipes.created_at AS made_record_created_at,

        recipes.id AS recipe_id,
        recipes.title AS recipe_title,
        recipes.image_url AS recipe_image_url,

        "user".username AS recipe_owner_username
        FROM made_recipes
        JOIN recipes
        ON recipes.id = made_recipes.recipe_id
        JOIN "user"
        ON "user".id = recipes.user_id

        ORDER BY made_recipes.created_at DESC
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
