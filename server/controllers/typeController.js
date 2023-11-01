const { Type, Device } = require("../models/models");
class TypeController {
  async createType(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.json({ message: "Заполните поля" });
      }

      const type = await Type.create({ name });

      return res.status(200).json({ message: "Тип успешно добавлен" });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Такое поле уже существует",
      });
    }
  }
  async getAllType(req, res) {
    try {
      const types = await Type.findAll();

      if (!types) {
        return res.json({
          message: "Типов нет",
        });
      }
      res.json({
        types,
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Что то пошло не так",
      });
    }
  }
  async deleteType(req, res) {
    try {
      const { id } = req.body;

      if (!id) {
        return res.json({
          message: "Ошибка",
        });
      }
      await Device.destroy({ where: { typeId: id } });

      await Type.destroy({ where: { id } });

      res.json({
        message: "Тип успешно удалён",
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Что то пошло не так",
      });
    }
  }
  async updateType(req, res) {
    try {
      const { id, updateName } = req.body;

      if (!id || !updateName) {
        return res.json({
          message: "Ошибка",
        });
      }
      await Type.update({ name: updateName }, { where: { id } });

      res.json({
        message: "Тип успешно изменён",
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Что то пошло не так",
      });
    }
  }
}
module.exports = new TypeController();
