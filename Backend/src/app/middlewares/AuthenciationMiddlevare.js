const jwt = require("jsonwebtoken");
const User = require("../models/User");

function protect(req, res, next) {
  const token = req.headers['authorization'] || req.cookies.jwt;
  if (token) {
    jwt.verify(token, "MarketSwift", async (err, decoded) => {
      if (err) {
        res.send("Please login");
      } else {
        const user = await User.findOne({ where: { id: decoded.id } });
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.send("Please login");
  }
}

function checkRole(req, res, next) {
  const role = req.cookies.role;
  if (role == 0) {
    next();
  } else {
    res.send("You are not seller");
  }
}

module.exports = {
  protect,
  checkRole,
};
