import { React, useEffect, useContext } from "react";

import { DEVICE_ROUTE } from "../../utils/consts";
import { useDispatch } from "react-redux";
import Pagination from "react-bootstrap/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
// import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { CustomContext } from "../../utils/context";
import { toast } from "react-toastify";
import Star from "../../assets/img/icons/star.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
const DeviceItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    devices,
    getAllDevice,
    typeValue,
    brandValue,
    price,
    page,
    setPage,
    searchValue,
  } = useContext(CustomContext);

  useEffect(() => {
    dispatch(getAllDevice());
  }, [dispatch, brandValue, typeValue, price, page]);

  const handleToCart = (device) => {
    if (device.inStock === 0) {
      return toast("Невозможо добавить в корзину");
    }
    dispatch(addToCart(device));
  };

  return (
    <div>
      <div className="devices__body">
        {devices.data.length === 0 ? (
          <CircularProgress />
        ) : devices.data.data.count == 0 ? (
          <div>Нет товаров</div>
        ) : (
          devices.data.data.rows

            .sort((a, b) =>
              price === "desc"
                ? b.price - a.price
                : price === "asc"
                ? a.price - b.price
                : price === "a-z"
                ? a.name.localeCompare(b.name)
                : price === "z-a"
                ? b.name.localeCompare(a.name)
                : price === "5-1"
                ? b.rating - a.rating
                : ""
            )

            .filter((device) => {
              return device.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .filter((item, idx) => {
              return page == 1
                ? idx < 6
                : idx < page * 6 && idx > page * 6 - 6 - 1;
            })

            .map((device) => (
              <Card
                className="device__item"
                key={device.id}
                sx={{ maxWidth: 345 }}
              >
                <CardActionArea
                  onClick={() => {
                    navigate(DEVICE_ROUTE + "/" + device.id);
                  }}
                >
                  <CardMedia
                    className="card-img"
                    component="img"
                    height="140"
                    image={process.env.REACT_APP_API_URL + device.img}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 15 }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {device.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {device.price} Р.
                    </Typography>
                    {device.inStock == 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        Нет в наличии
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        В наличии: {device.inStock} шт
                      </Typography>
                    )}
                    <Typography
                      className="d-flex align-items-center"
                      variant="body2"
                      color="text.secondary"
                    >
                      <img className="icon-star-device" src={Star} alt="" />
                      {Math.round(device.rating * 100) / 100}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Button
                    onClick={() => {
                      handleToCart(device);
                    }}
                    size="small"
                    color="primary"
                  >
                    Добавить в корзину
                  </Button>
                </CardActions>
              </Card>
            ))
        )}
      </div>
      <Pagination className="mt-5 pagin-center">
        {new Array(Math.ceil(devices.dataLength / 6))
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

export default DeviceItem;
