import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
  addToCart,
} from "../redux/features/cart/cartSlice";

import { checkIsAuth } from "../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE, ORDER_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
import Button from "@mui/material/Button";
const Basket = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleToCart = (device) => {
    dispatch(addToCart(device));
  };

  const handleClearCart = (device) => {
    dispatch(clearCart(device));
  };

  return (
    <div>
      <div className="page_basket-body basket">
        <h2>Корзина</h2>
        {cart.cartItems.length === 0 ? (
          <h1 className="basket-empty">Корзина пуста</h1>
        ) : (
          cart.cartItems?.map((cartItem) => (
            <div key={cartItem.id} className="basket_body">
              <div className="basket_left">
                <div className="basket_img">
                  <img
                    src={process.env.REACT_APP_API_URL + cartItem.img}
                    alt=""
                  />
                </div>
                <div className="basket_info basket-info">
                  <div className="basket-info_title">{cartItem.name}</div>
                </div>
              </div>
              <div className="basket_right">
                <div className="basket_quantity">
                  <RemoveCircleSharpIcon
                    sx={{ color: "#3f51b5", cursor: "pointer" }}
                    onClick={() => handleDecreaseCart(cartItem)}
                  />

                  <span className="cart-qty">{cartItem.cartQuantity}</span>

                  <AddCircleSharpIcon
                    sx={{ color: "#3f51b5", cursor: "pointer" }}
                    onClick={() => handleToCart(cartItem)}
                  />
                </div>
                <div className="basket_price">
                  {cartItem.price * cartItem.cartQuantity} ₽
                </div>
                <div className="basket_del">
                  <Button
                    onClick={() => handleRemoveFromCart(cartItem)}
                    variant="outlined"
                    color="error"
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
        {cart.cartItems.length === 0 ? (
          ""
        ) : (
          <div>
            <div>
              <Button
                onClick={() => handleClearCart()}
                variant="outlined"
                color="error"
              >
                Очистить корзину
              </Button>
            </div>
            <hr />
            <div className="basket_total total">
              <div className="total_left">
                {isAuth ? (
                  <Link to={ORDER_ROUTE} className="btn">
                    <Button variant="contained" color="success">
                      Оформить заказ
                    </Button>
                  </Link>
                ) : (
                  <div className="login_register_basket">
                    Для того чтобы заказать
                    <Link to={LOGIN_ROUTE}> войдите </Link> или
                    <Link to={REGISTRATION_ROUTE}> зарегистрируйтесь </Link>
                  </div>
                )}
              </div>
              <div className="total_right">
                Итого: <span>{cart.cartTotalAmount} ₽</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
