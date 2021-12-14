import { signup } from "./controllers/auth.js";
const router = function (app) {
  app.post("/signup", signup);

  app.get("/", function (req, res, next) {
    res.send(["waterbottle", "phone"]);
  });
};

export default router;
