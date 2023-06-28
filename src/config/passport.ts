import { PassportStatic, DoneCallback } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../model";
import { validatePassword } from "../utils/bcrypt";
import { PostLoginForm } from "../types/form";
import { v4 as uuidv4 } from "uuid";

export default function passportStrategy(passport: PassportStatic) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passReqToCallback: true },
      async (
        req: PostLoginForm,
        username: string,
        password: string,
        done: DoneCallback
      ) => {
        try {
          const user = await UserModel.findOne({ username: username });

          if (!user) return done(null, false);
          if (!(await validatePassword(password, user.password)))
            return done(null, false);

          const isRemember = req.body.remember === "on";
          if (isRemember) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
          } else {
            req.session.cookie.expires = new Date();
          }

          await req.session.save();

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "704006099788-2ccf4tndpd2g8q17jfc2ao2jl2o7u2jb.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/oauth/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        try {
          const user = await UserModel.findOne({ googleId: profile.id });

          if (user) {
            return done(null, user);
          }
          
          const newUser = new UserModel({
            username: uuidv4(),
            password: uuidv4(),
            name: profile.displayName,
            YOB: 2002,
            googleId: profile.id,
            isAdmin: false,
          });

          await newUser.save();

          return done(null, newUser);
        } catch (e) {
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
