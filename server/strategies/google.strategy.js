const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  findOrCreateGoogleUser,
  InactiveUserError,
} = require("../modules/google-auth");

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL =
  process.env.GOOGLE_CALLBACK_URL ||
  `http://localhost:${process.env.PORT || 5001}/api/auth/google/callback`;

if (clientID && clientSecret) {
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          if (!email) {
            return done(null, false, { message: "Google account has no email." });
          }

          const user = await findOrCreateGoogleUser({
            googleId: profile.id,
            email,
            profileImageUrl: profile.photos?.[0]?.value,
          });

          return done(null, user);
        } catch (err) {
          if (err instanceof InactiveUserError) {
            return done(null, false, { message: err.message });
          }
          console.log("Google strategy error:", err);
          return done(err, null);
        }
      }
    )
  );
}

module.exports = passport;
