import React from "react";
import Type from "./type/Type";
import Brand from "./brand/Brand";
import DeviceItem from "./device/DeviceItem";

import FilterSelect from "../components/filterSelect/FilterSelect";
import Carusel from "../components/carusel/Carusel";
import FilterModalBody from "../components/filterSelect/FilterModalBody";
const Home = () => {
  return (
    <div>
      <main className="page">
        <section>
          <Carusel />
        </section>
        <hr />

        <section className="main__filter_body">
          <div className="filter__modal">
            <FilterModalBody />
          </div>
          <div>
            <FilterSelect />
          </div>

          <div className="type">
            <Type />
          </div>
        </section>

        <section className="content">
          <div className="brend_body">
            <div>
              <Brand />
            </div>
          </div>
          <div className="device_body">
            <div>
              <DeviceItem />
            </div>
          </div>
        </section>

        <div className="line2"></div>
      </main>
    </div>
  );
};

export default Home;
