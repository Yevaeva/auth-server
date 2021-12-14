import User from "../models/user.js";

export const signup = function (req, res, next) {
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

      res.json({ success: true });
    });
  });
};
