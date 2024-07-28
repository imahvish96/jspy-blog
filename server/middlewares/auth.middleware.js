const User = require("../models/user.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies.accessToken;
    if (!token) {
      throw new ApiError(401, "Unauthorized, no token");
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded?.id).select(
      "-password --refreshToken"
    );

    if (!user) {
      throw new ApiError(404, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Unauthorized, invalid token");
  }
});

module.exports = { verifyJWT };
