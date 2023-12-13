const { mongoose } = require("mongoose");
const VALIDATE_IMAGE = /^https?:\/\/.+$/;

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minLength: [10, "characters required minimum with 10 length"],
    maxLength: [50, "characters required maximum with 40 length"],
  },
  type: {
    type: String,
    required: true,
    min: [2, "The type should be at least 2 characters"],
  },
  certificate: {
    type: String,
    required: [true, "Certificate is required!"],
    minLength: [10, "characters required minimum with 10 length"],
    maxLength: [50, "characters required maximum with 40 length"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    validate: {
      validator(value) {
        return VALIDATE_IMAGE.test(value);
      },
      message: "The photo image should start with http:// or https://",
    },
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: [9, "characters required minimum with 10 length"],
    maxLength: [201, "characters required maximum with 200 length"],
  },
  price: {
    type: Number,
    required: true,
    min: [0, "The price should be a positive number."],
    min: 0,
  },
 signUpList: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
