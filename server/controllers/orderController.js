const {
  Order,
  ProductOrder,
  User,
  Device,
  Rating,
} = require("../models/models");
class OrderController {
  async addOrder(req, res) {
    try {
      const { totalPrice, cartItems, inputValue, delivery, authUser } =
        req.body;

      if (!totalPrice || !cartItems || !delivery) {
        return res.json({ message: "Заполните поля" });
      }

      const order = await Order.create({
        address: inputValue,
        totalPrice,
        delivery,
        totalQty: cartItems.length,
        userId: authUser.id,
      });

      if (cartItems) {
        cartItems.forEach((i) =>
          ProductOrder.create({
            qty: i.cartQuantity,
            price: i.price,
            orderId: order.id,
            deviceId: i.id,
          })
        );

        let id;
        let inStockDev;
        let deviceUpdate;
        async function printFiles() {
          await Promise.all(
            cartItems.map(async (i) => {
              deviceUpdate = await Device.findAll({ where: { id: i.id } });
              inStockDev = deviceUpdate.map((e) => e.dataValues.inStock);

              await Device.update(
                {
                  inStock: inStockDev[0] - i.cartQuantity,
                },
                { where: { id: i.id } }
              );
            })
          );
        }
        printFiles();

        return res.status(200).json({ message: "Заказ успешно сформирован" });
      }
    } catch (err) {
      console.log(err);
      res.json({
        message: "Такое поле уже существует",
      });
    }
  }

  async getMyOrder(req, res) {
    try {
      let order;
      let orderDevice;

      const { id } = req.params;
      if (!id) {
        return res.json({
          message: "Нет id",
        });
      }
      await Promise.all(
        (order = await Order.findAll({
          where: { userId: id },
          include: [
            {
              model: ProductOrder,
              as: "productOrder",
              include: [{ model: Device, as: "device" }],
            },
          ],
        }))
      );
      res.json({ order });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Произошла ошибка",
      });
    }
  }

  async canelMyOrder(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      if (!id) {
        return res.json({
          message: "Нет id",
        });
      }
      await Order.update(
        {
          status: "Отменён",
        },
        { where: { id: id } }
      );

      res.json({ message: "Заказ успешно отменён" });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Произошла ошибка",
      });
    }
  }
  async setRatingMyOrder(req, res) {
    try {
      const { props, rating } = req.body;

      let prodRat;
      if (!props || !rating) {
        return res.json({
          message: "Ошибка",
        });
      }
      const info = await Rating.findOne({
        where: { deviceId: props.productId, userId: props.authUser },
      });
      async function printFiles() {
        const product = await Rating.findAll({
          where: { deviceId: props.productId },
        });

        prodRat = product.map((e) => {
          return e.dataValues.rate;
        });

        let sum = prodRat.reduce((a, b) => {
          return a + b;
        });
        let result = sum / prodRat.length;
        console.log(result);
        await Device.update(
          { rating: result },
          { where: { id: props.productId } }
        );
      }

      if (info === null) {
        await Rating.create({
          userId: props.authUser,
          rate: rating,
          deviceId: props.productId,
        });
        printFiles();
        return res.json({ message: "Товар успешно оценён" });
      }
      if (
        info.dataValues.deviceId === props.productId &&
        info.dataValues.userId === props.authUser
      ) {
        return res.json({ message: "Ошибка. Вы уже ставили оценку!" });
      } else {
        await Rating.create({
          userId: props.authUser,
          rate: rating,
          deviceId: props.productId,
        });
        printFiles();
        return res.json({ message: "Товар успешно оценён" });
      }
    } catch (err) {
      console.log(err);
      res.json({
        message: "Произошла ошибка",
      });
    }
  }

  async getAllOrderAdmin(req, res) {
    try {
      const order = await Order.findAll({
        include: [
          { model: User, as: "user" },
          {
            model: ProductOrder,
            as: "productOrder",
            include: [{ model: Device, as: "device" }],
          },
        ],
      });

      if (!order) {
        return res.json({
          message: "Типов нет",
        });
      }

      res.json({
        order,
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Что то пошло не так",
      });
    }
  }
  async changeStatusAdmin(req, res) {
    try {
      const { id, orderStatus } = req.body;

      // let productOrder;
      if (!id) {
        return res.json({
          message: "Нет id",
        });
      }
      await Order.update(
        {
          status: orderStatus,
        },
        { where: { id: id } }
      );

      res.json({ message: "Статус успешно изменён" });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Произошла ошибка",
      });
    }
  }
}
module.exports = new OrderController();
