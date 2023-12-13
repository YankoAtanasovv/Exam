const homeController = require("../controllers/homeController")
const userController = require("../controllers/userController")
const courseController = require("../controllers/courseController")

module.exports = (app) => {
  app.use(homeController);
  app.use("/users", userController);
  app.use("/courses", courseController);

  app.get("*", (req, res) => {
    res.redirect("/404");
  });
};
