const mongoose = require("mongoose");

const connectDb = (url) => {
  mongoose.connect(url);
  mongoose.connection.on("connected", () => {
    console.log("connected to mongo db");
  });
  mongoose.connection.on("error", (err) => {
    console.log("error to mongo db", err);
  });
  mongoose.connection.on("disconnected", () =>
    console.log("DataBase disconnected")
  );
};
module.exports = connectDb;
