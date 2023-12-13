const jwt = require("../lib/jwt");
const { SECRET_KEY } = require("../config/config");

exports.createToken = async (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };

  const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: "2d" });

  return token;
};
