require("dotenv").config();
const express = require("express");
//const router = require("./routes/bamboog.routes");

const app = express();

app.use(express.json());

app.get("/", () => {
    console.log("Welcome to our app")
});

//app.use("/ap1/v1/user", router);

app.use((req, res, next) => {
    const error = new Error("Not Found" + "😢😢😢😢😢😢😢");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.json({
      error: {
        message: error.message + "🔥🔥🔥🔥🔥🔥🔥🔥🔥",
      },
    });
  });
  
  module.exports = app;
