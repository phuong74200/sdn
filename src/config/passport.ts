import { PassportStatic, DoneCallback } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../model";
import { validatePassword } from "../utils/bcrypt";
import { PostLoginForm } from "../types/form";

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

          const isRemember = req.body.remember === 'on';
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
