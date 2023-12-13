const router = require("express").Router();
const { log } = require("console");
const courseService = require("../services/courseService");
const { isAuth } = require("../middlewares/authMiddleware");
const { getErrorMessage } = require("../utils/errorHelpers");

//! router

router.get("/", async (req, res) => {
  try {
    res.render("home");
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    console.log(errorMessage);

    res.render("/", { error: errorMessage });
  }
});

router.get("/404", (req, res) => {
  res.render("404");
});
module.exports = router;
