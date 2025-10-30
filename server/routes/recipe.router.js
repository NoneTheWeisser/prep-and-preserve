const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const router = express.Router();
// GET all public recipes
router.get("/", async (req, res) => {
  const sqlText = `
    SELECT recipes.*, "user".username
    FROM recipes
    JOIN "user" ON recipes.user_id = "user".id
    WHERE is_public = true
    ORDER by recipes.created_at DESC;
    `;
  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching public recipes:", error);
    res.sendStatus(500);
  }
});

// GET logged in user's recipes
router.get("/mine", rejectUnauthenticated, async (req, res) => {
  const userId = req.user.id;
  const sqlText = `
    SELECT recipes.*, "user".username
    FROM recipes
    JOIN "user" ON recipes.user_id = "user".id
    WHERE recipes.user_id = $1
    ORDER BY recipes.created_at DESC;
    `;
  try {
    const result = await pool.query(sqlText, [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    res.sendStatus(500);
  }
});

// GET single recipe by :id
router.get("/:id", async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.user?.id;

  const sqlText = `
    SELECT recipes.*, "user".username
    FROM recipes 
    JOIN "user" ON recipes.user_id = "user".id
    WHERE recipes.id = $1;
    `;
  try {
    const result = await pool.query(sqlText, [recipeId]);
    if (result.rows.length === 0) {
      return res.sendStatus(404);
    }
    const recipe = result.rows[0];
    // check for private/public
    if (!recipe.is_public && recipe.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to view this recipe" });
    }
    res.json(recipe);
  } catch (error) {
    console.error(`Error fetching recipe by id:`, error);
    res.sendStatus(500);
  }
});

// POST new recipe
router.post("/", rejectUnauthenticated, async (req, res) => {
  const { title, description, instructions, ingredients, image_url, is_public, source_url } = req.body;
  const userId = req.user.id;

  const sqlText = `
    INSERT INTO recipes (user_id, title, description, instructions, ingredients, image_url, is_public, source_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING*;
    `;

  const sqlValues = [
    userId,
    title,
    description,
    instructions,
    ingredients,
    image_url,
    is_public ?? true,
    source_url,
  ];

  try {
    const result = await pool.query(sqlText, sqlValues);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(`Error adding recipe:`, error);
    res.sendStatus(500);
  }
});

// PUT


// DELETE

module.exports = router;
