const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../models/models");
const { sendResetPasswordMail } = require("../services/mail-service");
const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, role, name, phone } = req.body;

      if (!email || !password) {
        return res.json({ message: "Заполните поля" });
      }

      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return res.json({
          message: "Пользователь с таким Email уже существует",
        });
      }
      const candidatePhone = await User.findOne({ where: { phone } });
      if (candidatePhone) {
        return res.json({
          message: "Пользователь с таким телефоном уже существует",
        });
      }

      const hashPassword = await bcrypt.hash(password, 5);

      const user = await User.create({
        email,
        role,
        name,
        phone,
        password: hashPassword,
      });

      const token = generateJwt(user.id, user.email, user.role);
      return res
        .status(200)
        .json({ message: "Регистрация прошла успешно", token });
    } catch (err) {
      console.log(err);
      res.json({
        message: "что то пошло не так",
      });
    }
  }

  //Сброс пароля
  async resetPassword(req, res) {
    try {
      const { email } = req.body;
      const candidate = await User.findOne({ where: { email } });

      if (!candidate) {
        return res.json({
          message: "Пользователь не найден",
        });
      }
      const resetLink = uuidv4();

      const user = await User.update(
        {
          resetLink,
        },
        { where: { email } }
      );
      await sendResetPasswordMail(
        email,
        `${process.env.REACT_APP_API_URL_FROM_SERVER}set-new-reset-password/${resetLink}`
      );
      res.json({
        message: "Для сброса пароля перейдите по ссылке на почте",
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Ошибка",
      });
    }
  }
  //создание нового пароля
  async setNewResetPassword(req, res) {
    try {
      const resetLink = req.params.link;
      const { password } = req.body;

      const candidatePhone = await User.findOne({ where: { resetLink } });
      if (!candidatePhone) {
        return res.json({
          message: "Неверная ссылка для сброса",
        });
      }

      const hashPassword = await bcrypt.hash(password, 5);

      const user = await User.update(
        {
          password: hashPassword,
          resetLink: "",
        },
        { where: { resetLink } }
      );
      res.json({
        message: "Пароль успешно изменён",
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Ошибка",
      });
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!email || !password) {
        return res.json({ message: "Введите логин или пароль" });
      }
      if (!user) {
        return res.json({ message: "Пользователь не существует" });
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return res.json({ message: "Не правильный логин или пароль" });
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res
        .status(200)
        .json({ message: "Вы успешно вошли в систему", token });
    } catch (err) {
      console.log(err);
      res.json({
        message: "что то пошло не так",
      });
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.userId, req.userEmail, req.userRole);

    return res.json({ token });
  }
  async getUser(req, res, next) {
    const token = generateJwt(req.userId, req.userEmail, req.userRole);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const id = decoded.id;
    const user = await User.findOne({ where: { id } });

    return res.json({ user });
  }
  async updateMyinfo(req, res) {
    try {
      const { id, name, phone } = req.body;

      if (!id) {
        return res.json({
          message: "Нет id",
        });
      }
      if (!name && !phone) {
        return res.json({
          message: "Произошла ошибка",
        });
      }
      await User.update({ name, phone }, { where: { id: id } });

      res.json({ message: "Ваши данные успешно изменены" });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Произошла ошибка",
      });
    }
  }
}

module.exports = new UserController();
