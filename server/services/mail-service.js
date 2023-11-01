const nodemailer = require("nodemailer");
const { User } = require("../models/models");

//Настройка доступа
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "ararat70773@gmail.com",
    pass: "ilrbhhxvvbfvkuth",
  },
});

const sendResetPasswordMail = async (to, link) => {
  await transporter.sendMail({
    from: "ararat70773@gmail.com",
    to,
    subject: `Сброс пароля Mshop`,
    text: "",
    html: `
      <div>
        <h1>Для сброса пароля перейдите по ссылке</h1>
        <a href="${link}">${link}</a>
      </div>
      `,
  });
};

module.exports = {
  sendResetPasswordMail,
};
