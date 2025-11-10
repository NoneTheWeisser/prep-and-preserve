const express = require("express");
const pool = require("../modules/pool");
const { rejectIfNotAdmin } = require("../modules/authentication-middleware");

const router = express.Router();
// Get all tags
router.get("/tags", rejectIfNotAdmin, async (req, res) => {
  const result = await pool.query(`SELECT * FROM tags ORDER BY name;`);
  res.json(result.rows);
});

// POST new tag
router.tag("/tags", rejectIfNotAdmin, async (req, res) => {
  const { name } = req.body;
  const result = await pool.query(
    `INSERT INTO tags (name) VALUES ($1) RETURNING *;`,
    [name]
  );
  res.json(result.rows[0]);
});

// PUT update tag
router.put("/tags/:id", rejectIfNotAdmin, async (req, res) => {
  const { name } = req.body;
  const result = await pool.query(
    `UPDATE tags SET name=$1 WHERE id=$2 RETURNING *;`,
    [name, req.params.id]
  );
  res.json(result.rows[0]);
});

// DELETE tag
// PUT update tag
router.put("/tags/:id", rejectIfNotAdmin, async (req, res) => {
  const { name } = req.body;
  const result = await pool.query(
    `DELETE tags SET name=$1 WHERE id=$2 RETURNING *;`,
    [name, req.params.id]
  );
  res.json(result.rows[0]);
});

module.exports = router;
