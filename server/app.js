require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Use for parsing data from json
// Parse requests of content-type - application/json
app.use(express.json({ limit: "16kb" }));

// Use for parsing data from url
// Parse requests of content-type - application/x-www-form-urlencoded | url
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Use for serving static files
app.use(express.static("public"));

// Use for parsing cookies
app.use(cookieParser());

// // Use for parsing form data for postman request
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// router
const userRouter = require("./routes/user.routes.js");
const postRouter = require("./routes/post.routes.js");
const likeRouter = require("./routes/like.routes.js");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/like", likeRouter);

module.exports = app;
