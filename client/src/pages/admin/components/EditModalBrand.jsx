import React from "react";
import { useCallback, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllBrand,
  updateBrand,
} from "../../../redux/features/brand/brandSlice";

const EditModalBrand = (props) => {
  const dispatch = useDispatch();
  const [updateName, setUpdateName] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const { status } = useSelector((state) => state.brand);
  useEffect(() => {
    if (status) {
      toast(status);
    }
    dispatch(getAllBrand());
  }, []);

  const handleClickUpdate = () => {
    const id = props.brandId;
    dispatch(updateBrand({ id, updateName }));
    dispatch(getAllBrand());
    setUpdateName("");
    setModalShow(false);
  };

  const fetchPost = useCallback(async () => {
    setUpdateName(props.brandName);
  }, [props.brandName]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

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
        className="modal-cont mt-5"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Редактирование: {props ? props.brandName : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClickUpdate}>Сохранить</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditModalBrand;
