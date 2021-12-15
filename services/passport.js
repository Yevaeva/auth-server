import passport from "passport";
import User from "../models/user.js";
import config from "../config.js";
import pass from "passport-jwt";
import LocalStratagy from "passport-local";

const localOptions = { usernameField: "email" };
const localLogin = new LocalStratagy(localOptions, function (
  email,
  password,
  done
) {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, done);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: pass.ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

const jwtLogin = new pass.Strategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function (err, user) {
    console.log(payload, password);
    if (err) {
      return done(err, false);
    }
    if (user) {
      console.log(user);
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
