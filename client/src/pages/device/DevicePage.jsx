import { React, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOneDevice } from "../../redux/features/device/deviceSlice";
import { addToCart } from "../../redux/features/cart/cartSlice";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Rating from "@mui/material/Rating";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import "./index.css";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getOneDevice(id).then((data) => setDevice(data));
  }, []);

  const handleToCart = (device) => {
    if (device.device.inStock === 0) {
      return toast("Невозможо добавить в корзину");
    }
    dispatch(addToCart(device.device));
  };

  return (
    <div>
      <hr />
      {device ? (
        device.device ? (
          <div className="device_page_body device">
            <div className="device__img">
              <img
                src={process.env.REACT_APP_API_URL + device.device.img}
                alt=""
              />
            </div>
            <div className="device__right_info">
              <div className="device__name">{device.device.name}</div>
              <div className="device__price">{device.device.price} ₽</div>
              {device.inStock == 0 ? (
                <div className="device__price">Нет в наличии</div>
              ) : (
                <div className="device__price">
                  {" "}
                  В наличии: {device.device.inStock} шт
                </div>
              )}
              <div className="device__rating ">
                <Rating
                  name="half-rating-read"
                  value={+device.device.rating}
                  precision={0.5}
                  readOnly
                />
                {device.device.rating <= 0
                  ? ""
                  : Math.round(device.device.rating * 100) / 100}
                {/* {Math.round(device.device.rating * 100) / 100} */}
              </div>
              <Button
                onClick={() => {
                  handleToCart(device);
                }}
                variant="contained"
                endIcon={<AddShoppingCartIcon />}
              >
                В корзину
              </Button>
            </div>
          </div>
        ) : (
          <CircularProgress />
        )
      ) : (
        ""
      )}
      <hr />
      <div>
        <h1 className="d-flex justify-content-center mb-4">Характеристики</h1>
        <div className="characteristic__body">
          <Table>
            <tbody>
              {device ? (
                device.device ? (
                  device.device.info.map((info) => (
                    <tr key={info.id}>
                      <td>{info.title}</td>
                      <td>{info.description}</td>
                    </tr>
                  ))
                ) : null
              ) : (
                <CircularProgress />
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
