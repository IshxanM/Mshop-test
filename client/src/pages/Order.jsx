import { React, useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Ymaps from "../components/Ymaps/Ymaps";
import { CustomContext } from "../utils/context";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Product from "../components/Product/Product";
import { addOrder } from "../redux/features/order/orderSlice";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import CreditCardUi from "../components/creditCart/CreditCardUi";
import { HOME_ROUTE } from "../utils/consts";
import { clearCart } from "../redux/features/cart/cartSlice";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });
  const { status } = useSelector((state) => state.order);
  const { delivery, setDelivery, authUser, inputValue, setInputValue } =
    useContext(CustomContext);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.cartTotalAmount);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (toast) {
      toast(status);
    }
  }, [status]);

  // const handleChange = (event) => {
  //   setDelivery(event.target.value);
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleAddOrder = () => {
    try {
      dispatch(
        addOrder({ totalPrice, cartItems, inputValue, delivery, authUser })
      );
      setInputValue("");
      dispatch(clearCart());
      setTimeout(() => {
        navigate(HOME_ROUTE);
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="name_page">Оформление заказа</div>
      <div className="page_ordering ordering">
        <Form
          // onSubmit={(e) => {
          //   handleSubmit(handleAddOrder);
          //   // e.preventDefault();
          // }}
          onSubmit={handleSubmit(handleAddOrder)}
          className="order-form"
        >
          <div className="ordering_body">
            <div className="ordering_contact-info">
              <h3>1. Контактная информация</h3>
              <div className="input-contact">
                <div className="input-contact_name">
                  Имя: {authUser ? authUser.name : ""}
                  <input type="hidden" value={authUser.name} />
                </div>
                <div className="input-contact_name">
                  Email: {authUser ? authUser.email : ""}
                </div>
                <div className="input-contact_name">
                  Телефон: {authUser ? authUser.phone : ""}
                </div>
              </div>
            </div>
            <hr />
            <div className="ordering_contact-info">
              <div className="dostavka">
                <h3>2. Выберите способ доставки</h3>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Доставка
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    // value={delivery}
                    label="Доставка"
                    // onChange={handleChange}
                    {...register("delivery", {
                      required: "Выберите способ доставки",
                      onChange: (e) => {
                        setDelivery(e.target.value);
                      },
                    })}
                  >
                    <MenuItem value="Доставка">Доставка</MenuItem>
                    <MenuItem value="Самовывоз">Самовывоз</MenuItem>
                  </Select>
                  {errors.delivery ? (
                    <span className="error-msg">{errors.delivery.message}</span>
                  ) : (
                    ""
                  )}
                </FormControl>
              </div>
              <div className=""></div>
              <div className="input-delivery">
                {delivery === "Доставка" ? (
                  <div>
                    <h3>3. Укажите адрес доставки</h3>
                    <Ymaps />
                  </div>
                ) : (
                  <div>
                    <p>
                      Мы находимся по адресу Московске шоссе, д.11, корпус 1
                    </p>
                  </div>
                )}
              </div>
            </div>
            <hr />
            <div className="ordering_contact-info">
              <h3>4. Товары</h3>
              <Product />
            </div>
            <hr />
            <div className="ordering_contact-info creditCardUi">
              <CreditCardUi />
            </div>
            <hr />
            <div className="btn__order">
              <Button type="submit" variant="contained">
                Оформить заказ
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Order;
