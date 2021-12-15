import { signin, signup } from "./controllers/auth.js";
import passport from "passport";
import "./services/passport.js";

const requirauth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

const router = function (app) {
  app.get("/", requirauth, function (req, res) {
    res.send({ hi: "there" });
  });
  app.post("/signin", requireSignin, signin);
  app.post("/signup", signup);
};

export default router;
