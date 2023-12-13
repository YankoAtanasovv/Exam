const app = require("express")();
const { log } = require("console");
const connectDB = require("./config/mongooseDB");
const PORT = 3000;

connectDB()
  .then(() => log("Hello! Welcome from MongoDB!"))
  .catch((err) => log("You have an error: ", err));

require("./config/express")(app);
require("./config/routes")(app);

app.listen(PORT, () => log(`Server is listening on port: ${PORT}`));
