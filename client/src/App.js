import { BrowserRouter } from "react-router-dom";
import Header from "./pages/admin/Header/Header";

import AppRouter from "./components/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import { check } from "./redux/features/auth/authSlice";
import { CustomContext } from "./utils/context";
import { useContext } from "react";
import Navbar from "./components/header/Navbar";
import { useState } from "react";
import "./assets/css/index.css";
import { Container } from "@mui/material";
import AdminAppRouter from "./components/AdminAppRouter";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "./pages/footer/Footer";

function App() {
  const { getUser, authUser } = useContext(CustomContext);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(check());
    dispatch(getUser());
  }, [dispatch]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center mt-4">
          <CircularProgress disableShrink />
        </div>
      ) : (
        <>
          {authUser ? (
            authUser.role === "ADMIN" ? (
              <BrowserRouter>
                <div className="wrapper">
                  <div className="header">
                    <Header />
                  </div>
                  <div style={{ flex: " 1 1 auto" }}>
                    <Container className="main">
                      <AdminAppRouter />
                    </Container>
                  </div>
                  <div className="footer">
                    <Footer />
                  </div>
                </div>
                <ToastContainer autoClose={1000} position="bottom-right" />
              </BrowserRouter>
            ) : (
              <BrowserRouter>
                <div className="wrapper ">
                  <div className="header">
                    <Navbar />
                  </div>
                  <div className="main">
                    <Container>
                      <AppRouter />
                    </Container>
                  </div>
                  <div className="footer">
                    <Footer />
                  </div>
                </div>

                <ToastContainer autoClose={1000} position="bottom-right" />
              </BrowserRouter>
            )
          ) : (
            <BrowserRouter>
              <div className="wrapper ">
                <div className="header">
                  <Navbar />
                </div>
                <div className="main">
                  <Container>
                    <AppRouter />
                  </Container>
                </div>
                <div className="footer">
                  <Footer />
                </div>
              </div>
              <ToastContainer autoClose={1000} position="bottom-right" />
            </BrowserRouter>
          )}
        </>
      )}
    </>
  );
}

export default App;
