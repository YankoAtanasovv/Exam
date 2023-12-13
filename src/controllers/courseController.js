const router = require("express").Router();
const { getErrorMessage } = require("../utils/errorHelpers");
const courseService = require("../services/courseService");
const { isAuth } = require("../middlewares/authMiddleware");
const levels = require("../utils/platformHelpers");

//? rendering
router.get("/create", (req, res) => {
  res.render("courses/create");
});

//? Create
router.post("/create", async (req, res) => {
  const {
    title,
    type,
    certificate,
    image,
    description,
    price,
  } = req.body;

  try {
    await courseService.create({
      title,
      type,
      certificate,
      image,
      description,
      price,
      owner: req.user._id,
    });
    res.redirect("/courses/catalog"); //!
  } catch (err) {
    res.render("courses/create", { error: getErrorMessage(err) });
  }
});

//? Catalog page
router.get("/catalog", async (req, res) => {
  try {
    const courses = await courseService.getAll().lean();

    res.render("courses/catalog", { courses });
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    console.log(errorMessage);

    res.render("courses/catalog", { error: errorMessage });
  }
});

//? Details

router.get("/:courseId/details", async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const course = await courseService.getOne(courseId).lean();

    const isOwner = req.user?._id == course.owner._id;

    if (
      JSON.parse(JSON.stringify(course.buyingList)).includes(req.user?._id)
    ) {
      course.alreadybuyingList = true; //? Проверявам да usera съществува вече в boughtBy от модела
    }
    res.render("courses/details", { course, isOwner });
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    res.render("courses/details", { error: errorMessage });
  }
});

//? Edit course

router.get("/:courseId/edit", isAuth, async (req, res) => {
  try {
    const course = await courseService
      .getOne(req.params.courseId)
      .lean();

    res.render("courses/edit", { course });
  } catch (err) {
    const errorMessage = getErrorMessage(err);

    res.render(`courses/edit`, { error: errorMessage });
  }
});

router.post("/:courseId/edit", isAuth, async (req, res) => {
  const courseData = req.body;
  try {
    await courseService.edit(req.params.courseId, courseData);

    res.redirect(`/courses/${req.params.courseId}/details`);
  } catch (err) {
    const errorMessage = getErrorMessage(err);

    res.render(`/courses/${req.params.courseId}/edit`, {
      error: errorMessage,
      ...courseData,
    });
  }
});

// //? buy courses - donate for courses

// router.get("/:courseId/buyingList", isAuth, async (req, res) => {
//   const courseId = req.params.courseId;
//   const userId = req.user?._id;

//   try {
//     await courseService.buy(courseId, userId);

//     res.redirect(`/courses/${courseId}/details`);
//   } catch (err) {
//     const errorMessage = getErrorMessage(err);

//     res.render(`courses/edit`, { error: errorMessage });
//   }
// });

// //? Search courses -

// router.get("/search", isAuth, async (req, res) => {
//   const result = { ...req.query };

//   let courses;

//   try {
//     if (!!result.search || !!result.type) {
//       courses = await courseService
//         .searchGames(result.search, result.type)
//         .lean();
//     } else {
//       courses = await courseService.getAll().lean();
//     }
//     res.render("courses/search", { courses });
//   } catch (err) {
//     res.redirect("/404");
//   }
// });

//? Delete photo

router.get("/:courseId/delete", isAuth, async (req, res) => {
  try {
    await courseService.delete(req.params.courseId);

    res.redirect("/courses/catalog");
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    res.render(`courses/details`, { error: errorMessage });
  }
});

module.exports = router;
