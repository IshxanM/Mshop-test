import { React, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { getAllType, updateType } from "../../../redux/features/type/typeSlice";
const EditModalType = (props) => {
  const dispatch = useDispatch();
  const [updateName, setUpdateName] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const { status } = useSelector((state) => state.type);

  useEffect(() => {
    if (status) {
      toast(status);
    }
    dispatch(getAllType());
  }, []);

  const fetchPost = useCallback(async () => {
    setUpdateName(props.typeName);
  }, [props.typeName]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleClickUpdate = () => {
    const id = props.typeId;
    dispatch(updateType({ id, updateName }));
    dispatch(getAllType());
    setUpdateName("");
    setModalShow(false);
  };

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
        className="mt-5"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Редактирование: {props ? props.typeName : ""}
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

export default EditModalType;
