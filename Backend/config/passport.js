import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../models/userModel.js";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth credentials in environment variables.");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in the database
        let user = await UserModel.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        } else {
          // Create a new user
          user = await UserModel.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: "Google",
            phone: profile._json.phone || null,
            profilePhoto: profile.photos[0].value,
          });
          await user.save()
          return done(null, user);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
