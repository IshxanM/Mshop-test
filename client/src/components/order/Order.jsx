import { React, useContext, useCallback, useState, useEffect } from "react";
import { CustomContext } from "../../utils/context";
import { useDispatch, useSelector } from "react-redux";
import { useConfirmationDialog } from "material-ui-confirmation";
import Button from "@material-ui/core/Button";
import Pagination from "react-bootstrap/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import OrderProductModalUser from "./OrderProductModalUser";
import { canelMyOrder } from "../../redux/features/order/orderSlice";
import "./index.css";
const Order = () => {
  const dispatch = useDispatch();
  const { getConfirmation } = useConfirmationDialog();
  const [page, setPage] = useState(1);
  const { getUser, authUser, getMyOrder, myOrder } = useContext(CustomContext);
  const { status } = useSelector((state) => state.auth);
  const userId = authUser.id;

  const handleClick = (id) => {
    dispatch(canelMyOrder(id));
    dispatch(getMyOrder(userId));
  };

  useEffect(() => {
    dispatch(getMyOrder(userId));
  }, [dispatch, userId]);

  return (
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
            <th>Другое</th>
          </tr>
        </thead>
        <tbody>
          {myOrder.order
            ? myOrder.order
                .filter((item, idx) => {
                  return page == 1
                    ? idx < 3
                    : idx < page * 3 && idx > page * 3 - 3 - 1;
                })
                .map((order) => (
                  <tr key={order.id} className="table-tr">
                    <td data-label="Номер заказа">{order.id}</td>
                    <td data-label="Дата создания">{order.createdAt}</td>
                    <td data-label="Вид доставки">{order.delivery}</td>
                    <td data-label="Статус">{order.status}</td>
                    <td data-label="Общая сумма">{order.totalPrice} руб.</td>
                    <td data-label="Товары">
                      <OrderProductModalUser product={order.productOrder} />
                    </td>
                    {order.status === "Новый" ? (
                      <td data-label="Другое">
                        <Button
                          onClick={() => {
                            getConfirmation({
                              body: `Вы действительно хотите отменить заказ ?`,
                              onAccept: () => {
                                handleClick(order.id);
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
                          variant="contained"
                        >
                          Отменить
                        </Button>
                      </td>
                    ) : null}
                  </tr>
                ))
            : null}
        </tbody>
      </table>
      <Pagination className="mt-5 pagin-center">
        {new Array(Math.ceil((myOrder.order ? myOrder.order.length : 0) / 3))
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
export default Order;
