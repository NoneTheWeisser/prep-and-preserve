const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

router.get("/", async (req, res) => {
  const sqlText = `SELECT * FROM tags ORDER BY name ASC;`;
  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
