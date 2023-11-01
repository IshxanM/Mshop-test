import { React, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import { useConfirmationDialog } from "material-ui-confirmation";
import { deleteDeviceInfo } from "../../../../redux/features/device/deviceSlice";
import { CustomContext } from "../../../../utils/context";
import EditDeviceInfoModal from "./EditDeviceInfoModal";

const DeviceInfoModal = (props) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const { getConfirmation } = useConfirmationDialog();
  const { status } = useSelector((state) => state.device);
  const { devices, getAllDevice } = useContext(CustomContext);
  const [page, setPage] = useState(1);
  const handleChange = (id) => {
    dispatch(deleteDeviceInfo({ id }));
  };
  return (
    <div className="modal-content-body">
      <Button
        color="succes"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        Посмотреть описание
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
            Описание девайса: {props.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.info ? (
            props.info.length === 0 ? (
              <p>Нет описания</p>
            ) : (
              <table className="table_adaptive">
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Описание</th>
                    <th>Другое</th>
                  </tr>
                </thead>
                <tbody>
                  {props.info
                    .filter((item, idx) => {
                      return page == 1
                        ? idx < 3
                        : idx < page * 3 && idx > page * 3 - 3 - 1;
                    })
                    .map((item) => (
                      <tr key={item.id}>
                        <td data-label="Название">{item.title}</td>
                        <td data-label="Описание">{item.description}</td>
                        <td data-label="Другое">
                          <div className="type__icon_btn">
                            <EditDeviceInfoModal info={item} />
                            <IconButton
                              onClick={() => {
                                getConfirmation({
                                  body: `Вы действительно хотите удалить ${item.title}?`,
                                  onAccept: () => {
                                    handleChange(item.id);
                                  },
                                  onDecline: () => {},
                                  dialogProps: {
                                    onClose: true,
                                  },
                                  acceptButtonProps: {
                                    autoFocus: false,
                                    variant: "contained",
                                  },
                                  declineText: "Отмена",
                                  acceptText: "Да",
                                });
                              }}
                              edge="end"
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )
          ) : (
            ""
          )}
          <Pagination className="mt-5 pagin-center">
            {new Array(Math.ceil(props.info.length / 3))
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
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeviceInfoModal;
