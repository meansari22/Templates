require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 5500;
const connectDb = require("./connection/db.js");
const cors = require("cors");
const userRouter = require("./routes/user.route.js");
const morgan = require("morgan");
try {
  connectDb(process.env.MONGO_DB_URL);
  app.use(cors());

  app.use(morgan("dev"));
  app.use(
    morgan("combined", {
      stream: fs.createWriteStream("./logs/access.log", { flags: "a" }),
    })
  );
  app.use(express.json());
} catch (err) {
  console.log("Not able to connect", err);
}
app.get("/", (req, res) => {
  res.send('<h1>Bank API</h1><a href="/api-docs">Testing Docs</a>');
});
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("Server is running");
});
