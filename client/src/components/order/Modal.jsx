import { React, useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CustomContext } from "../../utils/context";
import Rating from "@mui/material/Rating";
import { setRatingMyOrder } from "../../redux/features/order/orderSlice";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,

  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal(props) {
  const [rating, setRating] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!props) {
      toast("Произошла ошибка");
    }
    dispatch(setRatingMyOrder({ props, rating }));
    setModalShow(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => setModalShow(true)}>
        Оценить товар
      </Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Оценить товар
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <Rating
              size="large"
              defaultChecked={rating}
              onChange={(e) => setRating(e.target.value)}
              name="simple-controlled"
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outlined" onClick={handleClick}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const ModalOrder = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { authUser } = useContext(CustomContext);
  const id = props.props;

  return (
    <div className="mt-4">
      <Button onClick={() => setModalShow(true)}>Посмотреть товар</Button>
      <div className="modal-content-body">
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Просмотр товара
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              {props.device && props.device === "undefined" ? (
                <Skeleton animation="wave" />
              ) : props.device ? (
                <CardContent>
                  <CardMedia
                    component="img"
                    height="140"
                    image={process.env.REACT_APP_API_URL + props.device.img}
                    alt="green iguana"
                  />
                  <Typography gutterBottom variant="h5" component="div">
                    {props.device.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {props.device.price} Р.
                  </Typography>
                  {props.device.inStock == 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      Нет в наличии
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      В наличии: {props.device.inStock} шт
                    </Typography>
                  )}
                </CardContent>
              ) : (
                <Skeleton animation="wave" />
              )}
            </Card>
          </Modal.Body>

          <Modal.Footer>
            <ChildModal productId={props.device.id} authUser={authUser.id} />
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default ModalOrder;
