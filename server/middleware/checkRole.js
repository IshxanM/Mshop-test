const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    const token = (req.headers.authorization || " ").replace(/Bearer\s?/, "");

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (decoded.role !== role) {
          return res.json({ message: "Нет доступа" });
        }
        req.user = decoded;

        next();
      } catch (err) {
        console.log(err);
        return res.json({
          message: "Произошла ошибка",
        });
      }
    } else {
      return res.json({
        message: "НЕТ ТОКЕНА ",
      });
    }
  };
};
