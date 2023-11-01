import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store";

import { Provider } from "react-redux";
import App from "./App";

import Context from "./utils/context";
import { ConfirmationDialogProvider } from "material-ui-confirmation";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Context>
    <Provider store={store}>
      <ConfirmationDialogProvider>
        <App />
      </ConfirmationDialogProvider>
    </Provider>
  </Context>
);
