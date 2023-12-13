const { search } = require("../controllers/homeController");
const Course = require("../models/Course");

//?Last three posts -home page
// exports.lastThree = () => Electronic.find().sort({ _id: -1 }).limit(3);

//? Create
exports.create = async (courseData) => {
  const newCourse = await Course.create(courseData);
  return newCourse;
};

//? Catalog render
exports.getAll = () => Course.find().populate("owner"); //?  populate за да вземem owner.username

//? Delete
exports.delete = (courseId) => Course.findByIdAndDelete(courseId);

//? Edit
exports.edit = (courseId, courseData) =>
  Course.updateOne(
    { _id: courseId },
    { $set: courseData },
    { runValidators: true }
  ).populate("owner");

//? Details render
exports.getOne = (courseId) => Course.findById(courseId).populate("owner"); //? populate to take owner.username

// //? Buy
// exports.buy = (courseId, userId) =>
//   Electronic.findByIdAndUpdate(courseId, {
//     $push: { buyingList: userId },
//   }).populate("owner");

// //? Search
// exports.searchGames = (search, type) =>
//   Electronic.find({
//     name: { $regex: search, $options: "i" },
//     type: { $regex: type },
//   });
