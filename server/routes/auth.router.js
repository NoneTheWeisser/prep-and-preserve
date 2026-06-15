const express = require("express");
const passport = require("../strategies/user.strategy");
require("../strategies/google.strategy");

const router = express.Router();

const clientUrl = () =>
  process.env.CLIENT_URL || "http://localhost:5173";

const loginFailureRedirect = () =>
  `${clientUrl()}/#/login?error=google`;

const loginSuccessRedirect = () => `${clientUrl()}/#/`;

router.get(
  "/google",
  (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return res.status(503).json({
        message: "Google sign-in is not configured on this server.",
      });
    }
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: loginFailureRedirect(),
    keepSessionInfo: true,
  }),
  (req, res) => {
    res.redirect(loginSuccessRedirect());
  }
);

module.exports = router;
