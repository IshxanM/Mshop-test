const { Brand, Device } = require("../models/models");
class BrandController {
  async createBrand(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.json({ message: "Заполните поля" });
      }

      const brand = await Brand.create({ name });

      return res.status(200).json({ message: "Бренд успешно добавлен" });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Такое поле уже существует",
      });
    }
  }
  async getAllBrand(req, res) {
    try {
      const brand = await Brand.findAll();

      if (!brand) {
        return res.json({
          message: "Типов нет",
        });
      }
      res.json({
        brand,
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Что то пошло не так",
      });
    }
  }
  async deleteBrand(req, res) {
    try {
      const { id } = req.body;

      if (!id) {
        return res.json({
          message: "Ошибка",
        });
      }
      await Device.destroy({ where: { brandId: id } });
      await Brand.destroy({ where: { id } });

      res.json({
        message: "Бренд успешно удалён",
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Что то пошло не так",
      });
    }
  }

  async updateBrand(req, res) {
    try {
      const { id, updateName } = req.body;

      if (!id || !updateName) {
        return res.json({
          message: "Ошибка",
        });
      }
      await Brand.update({ name: updateName }, { where: { id } });

      res.json({
        message: "Бренд успешно изменён",
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Что то пошло не так",
      });
    }
  }
}
module.exports = new BrandController();
