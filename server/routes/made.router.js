const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// Post made recipe

router.post("/", async (req, res) => {
    try {
        const userId = req.user?.id;
        const { recipe_id } = req.body; 
        
        if (!userId) return res.sendStatus(403);

        const query = `
        INSERT INTO made_recipes (user_id, recipe_id)
        VALUES ($1, $2)
        RETURNING *;
        `;
        await pool.query(query, [userId, recipe_id]);

        res.sendStatus(201);
    } catch (error) {
        console.error("Error logging made recipe:", error);
        res.sendStatus(500);
    }
});

module.exports = router;
