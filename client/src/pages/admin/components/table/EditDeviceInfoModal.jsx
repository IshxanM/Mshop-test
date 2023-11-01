import { React, useCallback, useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { updateDeviceInfo } from "../../../../redux/features/device/deviceSlice";
import { CustomContext } from "../../../../utils/context";
const EditDeviceInfoModal = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { status } = useSelector((state) => state.device);
  const { getAllDevice } = useContext(CustomContext);
  const [modalShow, setModalShow] = useState(false);

  const fetchPost = useCallback(async () => {
    setTitle(props.info.title);
    setDescription(props.info.description);
  }, [props.info.title, props.info.description]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleClickUpdate = () => {
    const id = props.info.id;
    dispatch(updateDeviceInfo({ id, title, description }));
    setModalShow(false);
    dispatch(getAllDevice());
    toast(status);
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
      >
        <Form
          className="col-lg-12"
          onSubmit={(e) => {
            handleClickUpdate();

            e.preventDefault();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Редактирование: {props ? props.info.title : ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={handleClickUpdate}>Сохранить</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EditDeviceInfoModal;
