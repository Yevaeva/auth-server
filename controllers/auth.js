import User from "../models/user.js";
import config from "../config.js";
import jwt from "jwt-simple";

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
export const signup = function (req, res, next) {
  console.log(req);
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email or password" });
  }
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) next(err);
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }
    const user = new User({ email, password });
    user.save((err) => {
      if (err) next(err);

      res.json({ token: tokenForUser(user) });
    });
  });
};

export const signin = function (req, res, next) {
  console.log(req);
  res.send({ token: tokenForUser(req.user) });
};
