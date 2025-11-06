const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const router = express.Router();

// GET the favorites
router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT recipes.*, favorites.id AS favorite_id
            FROM favorites
            JOIN recipes ON favorites.recipe_id = recipes.id
            WHERE favorites.user_id = $1`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.sendStatus(500);
  }
});

// POST favorite
router.post("/", rejectUnauthenticated, async (req, res) => {
  const { recipe_id } = req.body;
  try {
    // check if recipe has already been favorited
    const checkResult = await pool.query(
      `SELECT * FROM favorites WHERE user_id = $1 AND recipe_id =$2`,
      [req.user.id, recipe_id]
    );
    if (checkResult.rows.length > 0) {
      return res.status(409).json({ error: "Recipe already favorited" });
    }

    const result = await pool.query(
      ` INSERT INTO favorites (user_id, recipe_id)
            VALUES ($1, $2)
            RETURNING *`,
      [req.user.id, recipe_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding favorites:", error);
    res.sendStatus(500);
  }
});

// DELETE favorite
router.delete("/:recipe_id", rejectUnauthenticated, async (req, res) => {
  const { recipe_id } = req.params;
  try {
    await pool.query(
      `DELETE FROM favorites WHERE user_id =$1 AND recipe_id = $2`,
      [req.user.id, recipe_id]
    );
    res.sendStatus(204);
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
