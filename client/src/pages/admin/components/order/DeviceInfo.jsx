import * as React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
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

const DeviceInfo = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Посмотреть товар</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 280, borderRadius: "20px" }}>
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
        </Box>
      </Modal>
    </div>
  );
};
export default DeviceInfo;
