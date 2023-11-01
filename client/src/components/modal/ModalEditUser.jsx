import { updateMyinfo } from "../../redux/features/auth/authSlice";
import { useState, useCallback, useEffect, useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import { CustomContext } from "../../utils/context";
import EditIcon from "@mui/icons-material/Edit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Skeleton from "@mui/material/Skeleton";
import InputMask from "react-input-mask";

import { FormLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const ModalEditUser = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const { authUser, getUser } = useContext(CustomContext);
  const { status } = useSelector((state) => state.auth);

  const id = authUser.id;

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const fetchPost = useCallback(async () => {
    setName(authUser.name);
    setPhone(authUser.phone);
  }, [authUser.phone, authUser.name]);

  const handleClick = () => {
    if (name === "" && phone === "") {
      toast("Заполните данные");
    } else if (name === "" && phone !== "") {
      dispatch(updateMyinfo({ id, phone }));
      dispatch(getUser());
      setPhone("");
      if (status) {
        toast(status);
      }
    } else if (name !== "" && phone === "") {
      dispatch(updateMyinfo({ id, name }));
      dispatch(getUser());
      setName("");
      if (status) {
        toast(status);
      }
    } else if (name !== "" && phone !== "") {
      dispatch(updateMyinfo({ id, name, phone }));
      dispatch(getUser());
      setName("");
      setPhone("");
      if (status) {
        toast(status);
      }
    }

    setModalShow(false);
  };
  useEffect(() => {
    fetchPost();
    dispatch(getUser());
  }, [fetchPost, status]);
  // useEffect(() => {
  //   getUser();
  // }, [status, name, phone]);
  return (
    <div className="modal-content-body">
      <Button onClick={() => setModalShow(true)}>
        <EditIcon sx={{ fontSize: 20 }} />
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Редактирование информации
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {authUser ? (
              <div className="update__body">
                <FormLabel>Имя</FormLabel>

                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Имя"
                  className="mb-2"
                />

                <FormLabel>Телефон</FormLabel>
                <InputMask
                  className="form-control"
                  value={phone}
                  // onChange={(e) => setPhone(e.target.value)}
                  type="tell"
                  mask="+7 (999) 999 9999"
                  name="phone"
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/[\(\)\+\s]/g, ""))
                  }
                  id="phone"
                />
              </div>
            ) : (
              <Skeleton />
            )}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClick} variant="primary">
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditUser;
