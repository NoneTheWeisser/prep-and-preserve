const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated, rejectIfNotAdmin } = require("../modules/authentication-middleware");

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

// Adding POST/PUT/DELETE for later stretch goal - Will only be admin based 
// Create Tag
router.post("/", rejectUnauthenticated, rejectIfNotAdmin, async (req, res) => {
    const { name } = req.body;
    const sqlText = `INSERT INTO tags (name) VALUES ($1) RETURNING *;`;
    try {
        const result = await pool.query(sqlText, [name]);
        res.sendStatus(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating tag:", error);
        res.sendStatus(500);
    }
});

// Update Tag
router.put("/:id", rejectUnauthenticated, rejectIfNotAdmin, async (req, res) => {
    const tagId = req.params.id;
    const { name } = req.body;
    const sqlText = `UPDATE tags SET name = $1 WHERE id = $2 RETURNING *;`;
    try {
        const result = await pool.query(sqlText, [name, tagId]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating tags:", error);
        res.sendStatus(500);
    }
});

// Delete Tag
router.delete("/:id", rejectUnauthenticated, rejectIfNotAdmin, async (req, res) => {
    const tagId = req.params.id;
    const sqlText = `DELETE FROM tags WHERE id = $1;`;
    try {
        await pool.query(sqlText, [tagId]);
        res.sendStatus(204);
    } catch(error) {
        console.error("Error deleting tag:", error);
        res.sendStatus(500);
    }
});

module.exports = router;
