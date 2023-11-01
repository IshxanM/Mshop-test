import React, { useEffect } from "react";
import DeviceTable from "./components/table/DeviceTable";

const Device = () => {
  return (
    <div className="page__content">
      <h1 className="page__name">Список устройств</h1>
      <hr />

      <div className="getType__body">
        <DeviceTable />
      </div>
    </div>
  );
};

export default Device;
