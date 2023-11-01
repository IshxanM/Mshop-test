const uuid = require("uuid");
const path = require("path");

const { Device, DeviceInfo, Rating, Type, Brand } = require("../models/models");

class DeviceController {
  async createDevice(req, res, next) {
    try {
      let { name, price, brandId, typeId, info, inStock } = req.body;
      const img = req.files.img;
      console.log(price);
      console.log(brandId);
      console.log(typeId);
      console.log(inStock);
      console.log(img);
      const deviceName = await Device.findOne({ where: { name } });
      if (deviceName) {
        return res.json({
          message: "Товар с таким названием уже существует",
        });
      }
      if (!img) {
        res.json({ message: "Заполните поля" });
      }
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        inStock,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res.json({ message: "Товар успешно добавлен" });
    } catch (err) {
      console.log(err);
      res.json({ message: "Произошла ошибка" });
      next();
    }
  }
  async getAllDevice(req, res) {
    try {
      let { brandId, typeId } = req.query;

      let devices;
      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({
          include: [
            { model: DeviceInfo, as: "info" },
            { model: Brand, as: "brand" },
            { model: Type, as: "type" },
          ],
        });
      }
      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({
          where: { brandId },
          include: [
            { model: DeviceInfo, as: "info" },
            { model: Brand, as: "brand" },
            { model: Type, as: "type" },
          ],
        });
      }
      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId },
          include: [
            { model: DeviceInfo, as: "info" },
            { model: Brand, as: "brand" },
            { model: Type, as: "type" },
          ],
        });
      }
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId, brandId },
          include: [
            { model: DeviceInfo, as: "info" },
            { model: Brand, as: "brand" },
            { model: Type, as: "type" },
          ],
        });
      }

      return res.json(devices);
    } catch (err) {
      console.log(err);
    }
  }
  async getOne(req, res) {
    const { id } = req.params;

    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    const deviceId = id;
    const deviceRat = await Rating.findAll({
      where: { deviceId },
    });

    return res.json({ device, deviceRat });
  }
  async deleteDevice(req, res) {
    try {
      const { id } = req.body;

      if (!id) {
        return res.json({
          message: "Ошибка",
        });
      }

      await DeviceInfo.destroy({ where: { deviceId: id } });
      await Device.destroy({
        where: { id },
      });

      res.json({
        message: "Устройство успешно удалено",
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Что то пошло не так",
      });
    }
  }
  async updateDevice(req, res, next) {
    try {
      let { name, price, brandId, typeId, info, inStock, id } = req.body;

      if (req.files === null) {
        let { img } = req.body;

        const device = await Device.update(
          {
            name,
            price,
            brandId,
            typeId,
            inStock,
            img,
          },
          { where: { id } }
        );

        if (info) {
          info = JSON.parse(info);
          info.forEach((i) =>
            DeviceInfo.create({
              title: i.title,
              description: i.description,
              deviceId: id,
            })
          );
        } else {
          return res.json({ message: "Заполните поля" });
        }
        return res.json({ message: "Товар успешно изменён" });
      } else {
        let img = req.files.img;

        if (!img) {
          res.json({ message: "Заполните поля" });
        }
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));

        const device = await Device.update(
          {
            name,
            price,
            brandId,
            typeId,
            inStock,
            img: fileName,
          },
          { where: { id } }
        );

        if (info) {
          info = JSON.parse(info);

          info.forEach((i) =>
            DeviceInfo.create({
              title: i.title,
              description: i.description,
              deviceId: id,
            })
          );
        } else {
          return res.json({ message: "Заполните поля" });
        }
        return res.json({ message: "Товар успешно изменён" });
      }
    } catch (err) {
      console.log(err);
      res.json({ message: "Произошла ошибка" });
      next();
    }
  }

  async deleteDeviceInfo(req, res) {
    try {
      const { id } = req.body;

      if (!id) {
        return res.json({
          message: "Ошибка",
        });
      }

      await DeviceInfo.destroy({ where: { id } });

      res.json({
        message: "Информация успешно удалено",
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Что то пошло не так",
      });
    }
  }
  async updateDeviceInfo(req, res, next) {
    try {
      let { title, description, id } = req.body;

      await DeviceInfo.update(
        {
          title,
          description,
        },
        { where: { id } }
      );

      return res.json({ message: "Товар успешно изменён" });
    } catch (err) {
      console.log(err);
      res.json({ message: "Произошла ошибка" });
      next();
    }
  }
}

module.exports = new DeviceController();
