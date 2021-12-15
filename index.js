import express from "express";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "./router.js";
import mongoose from "mongoose";
import passport from "passport";
import "./services/passport.js";

mongoose.connect("mongodb://localhost:27017");

const app = express();
app.use(morgan("combines"));
app.use(bodyParser.json({ type: "*/*" }));
app.use(passport.initialize());
// app.use(passport.session());
router(app);

const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening port");
