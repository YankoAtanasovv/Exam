const mongoose = require("mongoose");

// TODO: To change the DB name depend on the task!

const uriTrips = "mongodb://127.0.0.1:27017/courses";

async function connectDB() {
  await mongoose.connect(uriTrips);
}

module.exports = connectDB;
