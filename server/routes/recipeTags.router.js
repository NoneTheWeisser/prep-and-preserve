const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated, rejectIfNotOwnerOrAdmin } = require("../modules/authentication-middleware");

const router = express.Router();

router.get("/recipe/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;
  const sqlText = `
    SELECT tag.*
    FROM recipe_tags AS recipeTag
    JOIN tags AS tag ON recipeTag.tag_id = tag.id
    WHERE recipeTag.recipe_id = $1;
    `;
  try {
    const result = await pool.query(sqlText, [recipeId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching recipe tags:", error);
    res.sendStatus(500);
  }
});

// POST - protected to user's recipe (or admin)
router.post("/", rejectUnauthenticated, rejectIfNotOwnerOrAdmin, async (req, res) => {
  const { recipe_id, tag_id } = req.body;
  const sqlText = `
    INSERT INTO recipe_tags (recipe_id, tag_id)
    VALUES ($1, $2)
    RETURNING *;
    `;
  try {
    const result = await pool.query(sqlText, [recipe_id, tag_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding tag to recipe:", error);
    res.sendStatus(500);
  }
});

// DELETE - protected user/admin
router.delete("/:recipeId/:tagId", rejectUnauthenticated, rejectIfNotOwnerOrAdmin, async (req, res) => {
  const { recipeId, tagId } = req.params;
  const sqlText = `
    DELETE FROM recipe_tags
    WHERE recipe_id = $1 AND tag_id = $2;
    `;
  try {
    await pool.query(sqlText, [recipeId, tagId]);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error removing tag to recipe:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
