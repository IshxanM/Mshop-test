const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = (req.headers.authorization || " ").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded.id;

      next();
    } catch (err) {
      return res.json({
        message: "Нет доступа",
      });
    }
  } else {
    return res.json({
      message: "Нет доступа ",
    });
  }
};
