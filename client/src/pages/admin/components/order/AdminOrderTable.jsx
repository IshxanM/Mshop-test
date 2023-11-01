import { React, useState, useEffect, useContext } from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CustomContext } from "../../../../utils/context";
import OrderUserModal from "./OrderUserModal";
import OrderProductModal from "./OrderProductModal";
import { changeStatusAdmin } from "../../../../redux/features/order/orderSlice";
import { Button } from "@material-ui/core";
import { useConfirmationDialog } from "material-ui-confirmation";
import Pagination from "react-bootstrap/Pagination";
const AdminOrderTable = () => {
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.order);

  const { getAllOrderAdmin, orderAdmin, page, setPage } =
    useContext(CustomContext);

  const { getConfirmation } = useConfirmationDialog();

  useEffect(() => {
    dispatch(getAllOrderAdmin());
    if (status) {
      toast(status);
    }
  }, [dispatch, status]);

  const handleClickConfirm = (id) => {
    const orderStatus = "Подтверждён";
    dispatch(changeStatusAdmin({ orderStatus, id }));
  };
  const handleClickCanel = (id) => {
    const orderStatus = "Отменён";
    dispatch(changeStatusAdmin({ orderStatus, id }));
  };
  return (
    <div>
      <div>
        {orderAdmin.order ? (
          orderAdmin.order.length === 0 ? (
            <h1 className="d-flex justify-content-center ">Нет заказов</h1>
          ) : (
            <div>
              <table className="table_adaptive">
                <thead>
                  <tr>
                    <th>Номер заказа</th>
                    <th>Дата создания</th>
                    <th>Вид доставки</th>
                    <th>Статус</th>
                    <th>Общая сумма</th>
                    <th>Товары</th>
                    <th>Пользователь</th>
                    <th>Другое</th>
                  </tr>
                </thead>
                <tbody>
                  {orderAdmin.order
                    .filter((item, idx) => {
                      return page == 1
                        ? idx < 3
                        : idx < page * 3 && idx > page * 3 - 3 - 1;
                    })
                    .map((order) => (
                      <tr key={order.id} className="table-tr">
                        <td data-label="Номер заказа">{order.id}</td>
                        <td data-label="Дата создания">{order.createdAt}</td>
                        <td data-label="Вид доставки">{order.delivery} </td>
                        <td data-label="Статус">{order.status}</td>
                        <td data-label="Общая сумма">
                          {order.totalPrice} руб.{" "}
                        </td>
                        <td data-label="Товары">
                          <OrderProductModal product={order.productOrder} />
                        </td>
                        <td data-label="Пользователь">
                          <OrderUserModal user={order.user} />
                        </td>
                        <td data-label="Другое">
                          {order.status === "Новый" ? (
                            <div>
                              <Button
                                onClick={() => {
                                  getConfirmation({
                                    body: `Вы действительно хотите подтвердить заказ ?`,
                                    onAccept: () => {
                                      handleClickConfirm(order.id);
                                    },
                                    onDecline: () => {},
                                    dialogProps: {
                                      onClose: true,
                                    },
                                    acceptButtonProps: {
                                      autoFocus: false,
                                      variant: "contained",
                                    },
                                    declineText: "Отмена",
                                    acceptText: "Да",
                                  });
                                }}
                                size="small"
                                variant="contained"
                              >
                                Подтвердить
                              </Button>
                              <Button
                                onClick={() => {
                                  getConfirmation({
                                    //   title: "Требуется подтвердить дей",
                                    body: `Вы действительно хотите отменить заказ ?`,
                                    onAccept: () => {
                                      handleClickCanel(order.id);
                                    },
                                    onDecline: () => {},
                                    dialogProps: {
                                      onClose: true,
                                    },
                                    acceptButtonProps: {
                                      autoFocus: false,
                                      variant: "contained",
                                    },
                                    declineText: "Отмена",
                                    acceptText: "Да",
                                  });
                                }}
                                ariant="outlined"
                              >
                                Отменить
                              </Button>
                            </div>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          ""
        )}
      </div>
      <Pagination className="mt-5 pagin-center">
        {new Array(
          Math.ceil((orderAdmin.order ? orderAdmin.order.length : 0) / 3)
        )
          .fill(null)
          .map((item, idx) => (
            <Pagination.Item
              onClick={() => {
                setPage(idx + 1);
              }}
              active={page === idx + 1}
              key={idx}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
      </Pagination>
    </div>
  );
};

export default AdminOrderTable;
