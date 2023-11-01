import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import { useConfirmationDialog } from "material-ui-confirmation";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ModalOrder from "./Modal";
const OrderProductModalUser = ({ product }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const { getConfirmation } = useConfirmationDialog();

  return (
    <div className="modal-content-body">
      <Button
        color="succes"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        Посмотреть товары
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
            Подробнее о заказе
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {product ? (
            product.length === 0 ? (
              <p>Товаров нет</p>
            ) : (
              <table className="table_adaptive">
                <thead>
                  <tr>
                    <th>Колл-во</th>
                    <th>Сумма</th>
                    <th>Подробнее</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item) => (
                    <tr key={item.id}>
                      <td data-label="Колл-во">{item.qty}</td>
                      <td data-label="Сумма">{item.price} руб.</td>
                      <td data-label="Подробнее">
                        <ModalOrder device={item.device} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderProductModalUser;
