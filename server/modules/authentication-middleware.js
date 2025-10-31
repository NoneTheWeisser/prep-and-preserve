const pool = require("./pool");

const rejectUnauthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // We've verified the request came from an authenticated user, so
    // we call `next()` to advance to the next middleware function or
    // the route's callback function.I
    next();
  } else {
    // The request came from an unauthenticated user, so we reply with
    // HTTP status code 403:
    res.sendStatus(403);
  }
};

// For admin access ONLY
const rejectIfNotAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user?.is_admin) {
    next();
  } else {
    res.sendStatus(403);
  }
};

// Admin and Recipe Owner
const rejectIfNotOwnerOrAdmin = async (req, res, next) => {
  const userId = req.user.id;
  const recipe_id = req.body.recipe_id || req.params.recipeId;
  // Admin can do all
  if (req.user?.is_admin) {
    return next();
  }
  const sqlText = `SELECT user_id FROM recipes WHERE id = $1;`;
  try {
    const result = await pool.query(sqlText, [recipe_id]);
    if (result.rows.length === 0) {
      return res.sendStatus(404);
    }
    if (result.rows[0].user_id === userId) {
      return next();
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.error("Error checking recipe ownership:", error);
    res.sendStatus(500);
  }
};

module.exports = {
  rejectUnauthenticated,
  rejectIfNotAdmin,
  rejectIfNotOwnerOrAdmin,
};
