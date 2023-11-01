import { React, useState } from "react";
import { useDispatch } from "react-redux";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Type from "../../pages/type/Type";
import BrandModalFilter from "../../pages/brand/BrandModalFilter";

const FilterModalBody = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="modal-content-body">
      <Button onClick={() => setModalShow(true)}>
        <TuneIcon sx={{ fontSize: 20 }} />
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
            Сортировка
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-row  justify-content-center ">
            <div className="d-flex justify-content-center">
              <Type />
            </div>
            <div className="d-flex justify-content-center">
              <BrandModalFilter />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Сохранить</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FilterModalBody;
