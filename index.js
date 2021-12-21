import express from "express";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "./router.js";
import mongoose from "mongoose";
import passport from "passport";
import "./services/passport.js";
import cors from "cors";

mongoose.connect("mongodb://localhost:27017");

const app = express();
app.use(morgan("combines"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
app.use(passport.initialize());
router(app);

const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening port");
