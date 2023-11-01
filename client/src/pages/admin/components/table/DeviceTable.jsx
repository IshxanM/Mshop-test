import { React, useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllDevice,
  deleteDevice,
} from "../../../../redux/features/device/deviceSlice";
import { CustomContext } from "../../../../utils/context";
import CircularProgress from "@mui/material/CircularProgress";
import EditModalDevice from "../EditModalDevice";
import DeviceInfoModal from "./DeviceInfoModal";
import { Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfirmationDialog } from "material-ui-confirmation";
import Pagination from "react-bootstrap/Pagination";
import "./index.css";
const DeviceTable = () => {
  const { status } = useSelector((state) => state.device);
  const { devices, getAllDevice, page, setPage } = useContext(CustomContext);

  const { getConfirmation } = useConfirmationDialog();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDevice());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllDevice());
    if (status) {
      toast(status);
    }
  }, [status]);

  const handleChange = (id) => {
    dispatch(deleteDevice({ id }));
  };

  return (
    <div>
      <div>
        {devices.data ? (
          devices.data.length === 0 ? (
            <CircularProgress />
          ) : devices.data.data.count === 0 ? (
            <h1 className="d-flex justify-content-center ">Нет устройств</h1>
          ) : (
            <div>
              <table className="table_adaptive ">
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>В наличии шт.</th>
                    <th>Цена</th>
                    <th>Тип</th>
                    <th>Бренд</th>
                    <th>Описание</th>
                    <th>Другое</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.data.data.rows

                    .filter((item, idx) => {
                      return page == 1
                        ? idx < 5
                        : idx < page * 5 && idx > page * 5 - 5 - 1;
                    })

                    .map((device) => (
                      <tr key={device.id} className="table-tr">
                        <td data-label="Название">{device.name}</td>
                        <td data-label="В наличии .шт">{device.inStock}</td>
                        <td data-label="Цена">{device.price} руб.</td>
                        <td data-label="Тип">{device.type?.name} </td>
                        <td data-label="Бренд">{device.brand?.name} </td>
                        <td data-label="Описание">
                          <DeviceInfoModal
                            info={device.info}
                            name={device.name}
                          />
                        </td>
                        <td data-label="Другое">
                          <div className="type__icon_btn justify-content-around">
                            <EditModalDevice device={device} />

                            <DeleteIcon
                              onClick={() => {
                                getConfirmation({
                                  body: `Вы действительно хотите удалить "${device.name}" ?`,
                                  onAccept: () => {
                                    handleChange(device.id);
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
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          ""
        )}
      </div>
      <Pagination className="mt-5 pagin-center">
        {new Array(Math.ceil(devices.dataLength / 5))
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

export default DeviceTable;
